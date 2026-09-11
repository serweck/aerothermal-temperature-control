# Sincronismo LG -> tarjeta, y tratamiento del modo `auto`

- **Fecha:** 2026-09-11
- **Estado:** aprobado en diseño, pendiente de plan de implementación
- **Alcance:** automatizaciones y helpers de Home Assistant. **No toca el código de la tarjeta.**

## 1. El problema

La tarjeta es un espejo de `input_select.aerotermia_modo`, y ese `input_select` solo lo escribe la
propia tarjeta. La cadena es de una sola dirección:

```
tarjeta -> input_select.aerotermia_modo -> automatización A -> climate.set_hvac_mode (LG)
```

Si el LG se enciende o se cambia de modo **desde su propio panel**, nada escribe en el
`input_select`, así que la tarjeta se queda como estaba. Observado en vivo el 11/09 a las 11:34:
`climate.bomba_de_calor_aire_agua_2` en `cool` mientras `input_select.aerotermia_modo` seguía en
`off` desde las 11:18.

La única sincronía inversa que existe hoy es la automatización B, y solo cubre el apagado: LG en
`off` o `unavailable` durante 30 s -> todo a `off`.

## 2. La restricción que condiciona el diseño

`climate.bomba_de_calor_aire_agua_2` (integración `lg_thinq`, modelo AWHP_019101_WW) declara
`supported_features: 385` = temperatura objetivo + encendido + apagado. **No expone `hvac_action`.**

Consecuencia: cuando el LG está en `auto`, Home Assistant **no puede saber si la máquina está
calentando o enfriando**. Y como el suelo lo mueve un único relé compartido por dos
`generic_thermostat` —uno con `ac_mode: false` y otro con `ac_mode: true`— en `auto` no hay forma de
decidir cuál de los dos debe mandar.

Por eso el modo `auto` **no se añade a la tarjeta**. Se refleja como "Apagado".

## 3. Decisiones tomadas

| # | Decisión | Motivo |
|---|---|---|
| D1 | El LG en `auto` se refleja en la tarjeta como `off` | No hay modo equivalente y no se puede inferir calor/frío |
| D2 | En `auto`, los dos termostatos quedan en `off` | Si no, se pelean por el relé compartido |
| D3 | En `auto`, el relé circula de forma continua | La máquina gestiona el agua; el suelo solo reparte |
| D4 | La circulación continua lleva **corte de seguridad** | Sin termostato no hay nada que vigile condensación ni sobrecalentamiento |
| D5 | La automatización A **no apaga el LG** si está en `auto` | Si no, seleccionar `auto` en el panel haría que HA apagase la máquina sola |
| D6 | La sincronía inversa **ignora `unavailable`** | Un corte de la nube de LG no debe vaciar la tarjeta; de eso ya se ocupa B a los 30 s |

## 4. Componentes

### 4.1 Sensor plantilla: punto de rocío interior

Punto de rocío **por estancia** (fórmula de Magnus), quedándose con el **máximo**: manda la
habitación peor. Trece estancias interiores; quedan fuera las dos exteriores, el balcón, el garaje y
el sótano, que no son zonas de suelo radiante.

```yaml
template:
  - sensor:
      - name: "Punto de rocio interior"
        unique_id: punto_de_rocio_interior
        unit_of_measurement: "°C"
        device_class: temperature
        state_class: measurement
        state: >
          {% set rooms = [
            '05_entrada','06_cocina','07_bano_planta_baja','08_comedor','09_salon',
            '10_despacho','11_habitacion_izquierda','12_habitacion_derecha',
            '13_habitacion_centro','14_pasillo','15_bano_invitados',
            '16_bano_principal','17_habitacion_principal'
          ] %}
          {% set ns = namespace(td = -999.0) %}
          {% for r in rooms %}
            {% set t = states('sensor.temperature_sensor_' ~ r ~ '_temperature') | float(-999) %}
            {% set h = states('sensor.temperature_sensor_' ~ r ~ '_humidity') | float(-999) %}
            {% if t > -900 and h > 0 %}
              {% set g = log(h / 100) + (17.27 * t) / (237.7 + t) %}
              {% set d = (237.7 * g) / (17.27 - g) %}
              {% if d > ns.td %}{% set ns.td = d %}{% endif %}
            {% endif %}
          {% endfor %}
          {{ ns.td | round(1) if ns.td > -900 else none }}
```

**Comprobación de magnitudes.** Con las condiciones del 11/09 (22 °C, 37 %) el rocío sale a
**6,6 °C**: el corte quedaría en 8,6 y la impulsión de frío del LG anda por 17-18 °C, así que no
salta. En agosto, con 26 °C y 60 %, el rocío sube a **17,6 °C**, el corte a 19,6, y ahí sí corta una
impulsión a 15-18 °C. Los umbrales muerden cuando tienen que morder.

### 4.2 Automatización C (nueva): el LG manda

```yaml
- id: aerotermia_sincronia_lg
  alias: "Aerotermia - Sincronia: el LG manda"
  mode: queued
  trigger:
    - platform: state
      entity_id: climate.bomba_de_calor_aire_agua_2
      to: ["heat", "cool", "auto", "off"]
  action:
    - service: input_select.select_option
      target: { entity_id: input_select.aerotermia_modo }
      data:
        option: >
          {% set m = states('climate.bomba_de_calor_aire_agua_2') %}
          {{ 'calor' if m == 'heat' else 'frio' if m == 'cool' else 'off' }}
```

`to:` explícito, sin `unavailable` ni `unknown` (D6).

### 4.3 Automatización A (modificada)

Tres cambios, ninguno en las ramas de `calor` y `frio`:

1. **Reponer el trigger de arranque** que se perdió al importarla:
   ```yaml
   - platform: homeassistant
     event: start
   ```
2. **Rama `auto` nueva**, antes de la rama por defecto: si el modo es `off` **y** el LG está en
   `auto`, apagar los dos termostatos y **no tocar el relé**, en vez de apagarlo todo.

   > **El estado `auto` tiene un solo dueño: la automatización D.** D apaga los termostatos y
   > gobierna el relé; A, en su rama `auto`, se limita a no apagar el LG y a no tocar el relé.
   >
   > Esto no es solo elegancia: hace que D sea **autosuficiente**, y eso importa al desplegar. D se
   > dispara con el cambio de estado del LG, no con el del `input_select`, así que funciona aunque C
   > todavía no exista. Si D dependiera de que A le apagase los termostatos, habría una ventana entre
   > desplegar D y desplegar C en la que los termostatos seguirían vivos peleándose con D por el relé.
   > Con D autosuficiente, el orden de despliegue **A → D → C** es seguro en cada paso.
3. **Guarda en la rama por defecto** (D5): solo manda `hvac_mode: "off"` al LG y apaga el relé si el
   LG **no** está en `auto`.

### 4.4 Automatización D (nueva): dueña del estado `auto`

```yaml
- id: aerotermia_auto_circulacion
  alias: "Aerotermia - Auto: circulacion del suelo con corte de seguridad"
  mode: single
  trigger:
    - platform: state
      entity_id: climate.bomba_de_calor_aire_agua_2
    - platform: state
      entity_id:
        - sensor.bomba_de_calor_aire_agua_temperatura_de_salida
        - sensor.temperatura_termostato
        - sensor.punto_de_rocio_interior
    - platform: time_pattern
      minutes: "/5"
  condition:
    - condition: state
      entity_id: climate.bomba_de_calor_aire_agua_2
      state: "auto"
  action:
    # En auto no manda ninguno de los dos termostatos: si no, se pelean por el rele.
    # Lo hace D y no A para que D sea autosuficiente (ver 4.3).
    - service: climate.set_hvac_mode
      target:
        entity_id:
          - climate.suelo_radiante_calor
          - climate.suelo_radiante_frio
      data: { hvac_mode: "off" }
    - choose:
        - conditions:
            - condition: template
              value_template: >
                {% set salida = states('sensor.bomba_de_calor_aire_agua_temperatura_de_salida') | float(-999) %}
                {% set rocio  = states('sensor.punto_de_rocio_interior') | float(999) %}
                {% set zona   = states('sensor.temperatura_termostato') | float(-999) %}
                {{ salida < rocio + 2 or salida > 45 or zona > 24 }}
          sequence:
            - service: switch.turn_off
              target: { entity_id: switch.socket_garaje_aerotermia_bomba }
      default:
        - service: switch.turn_on
          target: { entity_id: switch.socket_garaje_aerotermia_bomba }
```

| corte | condición | por qué |
|---|---|---|
| Condensación | `salida` < rocío + 2 °C | criterio real del suelo refrescante |
| Suelo muy caliente | `salida` > 45 °C | límite del mortero |
| Sobrecalentamiento | `temperatura_termostato` > 24 °C | no cocer la casa sin termostato |

El `time_pattern` cada 5 min es la red de seguridad: si un disparo por estado se pierde, la
siguiente pasada reevalúa.

**Comportamiento con sensores caídos**, que es donde estos centinelas se ganan el sueldo. Están
elegidos para que la ausencia de dato caiga siempre del lado seguro:

| sensor caído | centinela | efecto en `salida < rocio + 2` | resultado |
|---|---|---|---|
| `temperatura_de_salida` | `-999` | `-999 < rocío + 2` -> cierto | **corta** |
| `punto_de_rocio_interior` | `999` | `salida < 1001` -> cierto | **corta** |
| `temperatura_termostato` | `-999` | no interviene; `-999 > 24` es falso | no corta por sobrecalentamiento |

Es decir: si falta cualquiera de los dos datos que gobiernan la condensación, **se para el relé**.
Ante la duda, no circular agua fría. El corte por sobrecalentamiento es el único que enmudece si su
sensor cae, y es el menos peligroso de los tres.

### 4.5 Automatización B: sin cambios

Sigue cubriendo `unavailable`, que C ignora a propósito. Su rama de `off` queda redundante con C,
pero es inocua: ambas convergen al mismo estado.

### 4.6 Nota sobre el esquema YAML

El YAML de este documento usa el esquema clásico (`trigger:` / `service:`), que es el del
`ha-config/automations.yaml` del repo. La instalación real ya está migrada al esquema nuevo
(`triggers:` / `actions:` / `action:`), que es el que devuelve el editor de la UI y el que aparece en
el plan de implementación. Home Assistant acepta los dos; no hay diferencia de comportamiento.

## 5. Análisis de bucles

La pareja A (tarjeta -> LG) y C (LG -> tarjeta) podría realimentarse. No lo hace, y conviene dejar
escrito por qué: **cada ida y vuelta termina porque el segundo salto no cambia ningún estado**.

| escenario | cadena | termina |
|---|---|---|
| Panel -> `heat` | C escribe `calor`; A manda `heat` al LG, que ya está en `heat` | sí, sin cambio de estado |
| Panel -> `auto` | C escribe `off`; A entra en la rama `auto`, no toca el LG | sí, A no manda nada |
| Panel -> `off` | C escribe `off`; A manda `off` al LG, que ya está en `off` | sí, sin cambio de estado |
| Tarjeta -> `calor` | A manda `heat`; el LG cambia y dispara C, que escribe `calor`, que ya está | sí, sin cambio de estado |

## 6. Plan de pruebas

Cada prueba se valida con la **cadena de contextos** (`user_id` y `parent_id`), no con la vista.

1. **El panel llega a HA.** Cambiar el modo en la pantalla de la máquina. Esperado: el estado del LG
   cambia con `user_id: null` y `parent_id: null`. *Es el supuesto de todo el diseño y aún no está
   confirmado.*
2. **`heat` -> tarjeta.** Panel a calor. Esperado: `input_select` a `calor`, `suelo_radiante_calor` a
   `heat`, `suelo_radiante_frio` a `off`.
3. **`auto` -> tarjeta Apagada.** Panel a auto. Esperado: `input_select` a `off`, ambos termostatos a
   `off`, relé **encendido**, y el LG **sigue en `auto`** (verificación de D5: si se apaga, la guarda
   no funciona).
4. **El corte.** Con el LG en auto, forzar la condición de condensación. Esperado: relé a `off`.
5. **Salida de auto.** Panel de auto a `off`. Esperado: relé a `off` y todo apagado.
6. **Sin bucles.** Tras cada prueba, ninguna automatización debe encadenar más de dos ejecuciones.

## 7. Abierto

- **En `auto` no se puede apagar la máquina desde la tarjeta.** La tarjeta muestra Apagado y el
  `input_select` ya vale `off`, así que pulsar Apagado no cambia ningún estado y no dispara nada.
  Habría que ir al panel o a la entidad del LG. Resolverlo exigiría tocar el código de la tarjeta
  (que el botón de apagado llame a `climate.set_hvac_mode` sobre `water_climate` cuando el LG esté en
  `auto`) y sacar versión. **Pendiente de decidir.**
- **Umbrales 24 °C y 45 °C**: propuestos, no validados contra la instalación.
- **`min_cycle_duration` de la bomba**: los `generic_thermostat` son hoy helpers de UI y no lo
  tienen; el YAML del repo documentaba 10 min. Asunto independiente de este diseño, pero afecta al
  mismo relé.
