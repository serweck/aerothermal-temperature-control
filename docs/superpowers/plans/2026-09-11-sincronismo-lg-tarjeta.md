# Sincronismo LG → tarjeta — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Que la tarjeta refleje el modo real del LG cuando se cambia desde el panel de la máquina, tratando el modo `auto` como "Apagado" con el suelo en circulación continua protegida.

**Architecture:** Tres automatizaciones y un sensor plantilla en Home Assistant. La automatización A (existente) recibe una rama `auto` y el trigger de arranque; una automatización D nueva se hace dueña única del estado `auto` (apaga los termostatos y gobierna el relé con tres cortes de seguridad); una automatización C nueva escribe en el `input_select` el modo que reporta el LG. **No se toca el código de la tarjeta.**

**Tech Stack:** Home Assistant (automatizaciones YAML vía editor de UI, helper de plantilla), integración `lg_thinq`, `generic_thermostat`.

**Spec:** `docs/superpowers/specs/2026-09-11-sincronismo-lg-tarjeta-design.md`

## Global Constraints

- **El MCP de Home Assistant está en modo solo-lectura.** Sirve para verificar (`ha_get_state`, `ha_get_automation_traces`, `ha_get_history`), **nunca para escribir**. Todo cambio se aplica por la UI en Chrome (`http://192.168.14.35:8123`).
- **Orden de despliegue obligatorio: Tarea 1 → 2 → 3 → 4.** Cada paso es seguro por sí solo; alterarlo abre ventanas en las que los termostatos y la automatización D se pelean por el relé. No adelantar la Tarea 4.
- **Toda verificación se hace con la cadena de contextos**, no con la vista: `user_id` presente y `parent_id: null` = lo hizo una persona; `parent_id` apuntando al contexto anterior = lo encadenó una automatización.
- **No hay framework de tests en este proyecto.** El ciclo de prueba de cada tarea es: medir el estado actual y comprobar que la conducta deseada **todavía no se da** → aplicar → recargar → provocar el escenario → verificar por API.
- Entidades, literales exactos:
  - LG: `climate.bomba_de_calor_aire_agua_2` — `hvac_modes: ["off","cool","auto","heat"]`
  - Modo: `input_select.aerotermia_modo` — opciones `off` / `calor` / `frio`
  - Termostatos: `climate.suelo_radiante_calor` (`ac_mode: false`), `climate.suelo_radiante_frio` (`ac_mode: true`)
  - Relé: `switch.socket_garaje_aerotermia_bomba`
  - Zona: `sensor.temperatura_termostato`
  - Impulsión: `sensor.bomba_de_calor_aire_agua_temperatura_de_salida`
- **Umbrales:** condensación `impulsión < rocío + 2`; suelo caliente `impulsión > 45`; sobrecalentamiento `zona > 24`.

---

## Estructura de ficheros

| Fichero | Responsabilidad | Cómo se aplica |
|---|---|---|
| Helper de plantilla `punto_de_rocio_interior` | Punto de rocío interior máximo | UI: Ajustes → Dispositivos y servicios → Ayudantes → Plantilla → Sensor |
| Automatización `aerotermia_conmutacion_modo` (A) | Tarjeta → suelo + LG. Se modifica | UI: Ajustes → Automatizaciones → editar en YAML |
| Automatización `aerotermia_auto_circulacion` (D) | Dueña única del estado `auto`. Nueva | UI: Ajustes → Automatizaciones → crear → editar en YAML |
| Automatización `aerotermia_sincronia_lg` (C) | LG → tarjeta. Nueva | Igual que D |
| `ha-config/automations.yaml` | Documentación del repo. Se actualiza | Editor local + commit |
| `ha-config/configuration.yaml` | Documentación del repo. Se actualiza | Editor local + commit |

---

### Task 1: Sensor de punto de rocío interior

**Files:**
- Create (en HA, por UI): helper de plantilla → `sensor.punto_de_rocio_interior`
- Modify: `ha-config/configuration.yaml`

**Interfaces:**
- Consumes: los 13 pares `sensor.temperature_sensor_<NN>_<estancia>_{temperature,humidity}`
- Produces: `sensor.punto_de_rocio_interior`, en °C, `device_class: temperature`. La Tarea 3 depende de este `entity_id` exacto.

- [ ] **Step 1: Comprobar que la entidad no existe todavía**

Con `ha_get_state("sensor.punto_de_rocio_interior")`.
Esperado: `ENTITY_NOT_FOUND`. Si existe, parar: alguien la creó antes y hay que revisar su plantilla.

- [ ] **Step 2: Calcular a mano el valor esperado**

Leer con `ha_get_state` los 13 pares y aplicar Magnus a cada estancia:

```
γ  = ln(HR/100) + (17,27 · T) / (237,7 + T)
Td = (237,7 · γ) / (17,27 − γ)
```

Anotar el máximo y de qué estancia sale. Ese es el valor que la entidad debe dar.

- [ ] **Step 3: Crear el helper de plantilla por la UI**

Ajustes → Dispositivos y servicios → **Ayudantes** → Crear ayudante → **Plantilla** → **Plantilla de un sensor**.

- Nombre: `Punto de rocio interior`
- Unidad de medida: `°C`
- Clase de dispositivo: `Temperatura`
- Clase de estado: `Medida`
- Plantilla de estado:

```jinja
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

El editor muestra una vista previa del resultado: comprobar ahí mismo que sale un número y no un error.

- [ ] **Step 4: Verificar contra el cálculo a mano**

`ha_get_state("sensor.punto_de_rocio_interior")`.
Esperado: el valor del Step 2, ±0,2 °C. Si no cuadra, revisar la lista de estancias antes de seguir.

- [ ] **Step 5: Comprobar el margen respecto a la impulsión**

Leer `sensor.bomba_de_calor_aire_agua_temperatura_de_salida` y confirmar que hoy es **mayor** que rocío + 2. Con las condiciones de septiembre debe sobrar mucho margen. Si no lo hubiera, parar y avisar: el corte saltaría de inmediato y hay que revisar umbrales.

- [ ] **Step 6: Reflejarlo en el repo y commitear**

Añadir a `ha-config/configuration.yaml` el bloque `template:` del spec (sección 4.1) con un comentario que diga que en la instalación real vive como helper de UI.

```bash
git add ha-config/configuration.yaml
git commit -m "ha-config: sensor de punto de rocio interior para el corte de la circulacion en auto"
```

---

### Task 2: Automatización A — rama `auto` y trigger de arranque

**Files:**
- Modify (en HA, por UI): automatización `aerotermia_conmutacion_modo`
- Modify: `ha-config/automations.yaml`

**Interfaces:**
- Consumes: nada de tareas anteriores.
- Produces: la garantía de que, con el LG en `auto`, A **no** manda `hvac_mode: "off"` al LG. Las Tareas 3 y 4 dependen de ello.

- [ ] **Step 1: Demostrar el fallo que se va a corregir**

Con `ha_config_get_automation("automation.aerotermia_conmutacion_de_modo_suelo_lg")`, confirmar los dos defectos:
1. `triggers` tiene **un solo** elemento (falta `homeassistant / start`).
2. No hay ninguna rama que contemple `auto`: con el modo en `off`, el `default` manda `hvac_mode: "off"` al LG **sea cual sea** su estado.

- [ ] **Step 2: Sustituir el YAML de la automatización**

Ajustes → Automatizaciones → "Aerotermia - Conmutacion de modo (suelo + LG)" → menú ⋮ → **Editar en YAML**. Reemplazar por:

```yaml
alias: "Aerotermia - Conmutacion de modo (suelo + LG)"
description: ""
mode: queued
max: 10
triggers:
  - trigger: state
    entity_id: input_select.aerotermia_modo
  - trigger: homeassistant
    event: start
conditions: []
actions:
  - choose:
      - conditions:
          - condition: state
            entity_id: input_select.aerotermia_modo
            state: calor
        sequence:
          - action: climate.set_hvac_mode
            target: { entity_id: climate.suelo_radiante_frio }
            data: { hvac_mode: "off" }
          - action: climate.set_hvac_mode
            target: { entity_id: climate.suelo_radiante_calor }
            data: { hvac_mode: heat }
          - action: climate.set_hvac_mode
            target: { entity_id: climate.bomba_de_calor_aire_agua_2 }
            data: { hvac_mode: heat }
      - conditions:
          - condition: state
            entity_id: input_select.aerotermia_modo
            state: frio
        sequence:
          - action: climate.set_hvac_mode
            target: { entity_id: climate.suelo_radiante_calor }
            data: { hvac_mode: "off" }
          - action: climate.set_hvac_mode
            target: { entity_id: climate.suelo_radiante_frio }
            data: { hvac_mode: cool }
          - action: climate.set_hvac_mode
            target: { entity_id: climate.bomba_de_calor_aire_agua_2 }
            data: { hvac_mode: cool }
      # Modo apagado PERO el LG en auto: no se apaga el LG ni se toca el rele.
      # Del estado auto se encarga por completo la automatizacion D.
      - conditions:
          - condition: state
            entity_id: input_select.aerotermia_modo
            state: "off"
          - condition: state
            entity_id: climate.bomba_de_calor_aire_agua_2
            state: "auto"
        sequence:
          - action: climate.set_hvac_mode
            target:
              entity_id:
                - climate.suelo_radiante_calor
                - climate.suelo_radiante_frio
            data: { hvac_mode: "off" }
    default:
      - action: climate.set_hvac_mode
        target:
          entity_id:
            - climate.suelo_radiante_calor
            - climate.suelo_radiante_frio
        data: { hvac_mode: "off" }
      - action: climate.set_hvac_mode
        target: { entity_id: climate.bomba_de_calor_aire_agua_2 }
        data: { hvac_mode: "off" }
      - action: switch.turn_off
        target: { entity_id: switch.socket_garaje_aerotermia_bomba }
```

Guardar.

- [ ] **Step 3: Verificar que se guardó lo que se quería**

`ha_config_get_automation("automation.aerotermia_conmutacion_de_modo_suelo_lg")`.
Esperado: `triggers` con **dos** elementos, y `choose` con **tres** ramas.

- [ ] **Step 4: Probar que no rompe lo que ya funcionaba**

En la tarjeta, pulsar **Frío**, esperar 5 s y leer estados.
Esperado: `input_select` a `frio`, `suelo_radiante_frio` a `cool`, LG a `cool`, todos con `parent_id` encadenado al contexto de la tarjeta. Después pulsar **Apagado** y confirmar que LG y termostatos vuelven a `off`.

- [ ] **Step 5: Probar la rama nueva**

El orden importa, porque A solo se dispara al **cambiar** el `input_select`, y hay que llegar al instante en que el modo pasa a `off` con el LG ya en `auto`:

1. En la tarjeta, pulsar **Calor**. A pone el LG en `heat`.
2. En la entidad del LG (`climate.bomba_de_calor_aire_agua_2`), seleccionar **Auto**. Como C todavía no existe, el `input_select` se queda en `calor`.
3. En la tarjeta, pulsar **Apagado**. Ahora sí: el modo pasa a `off` con el LG en `auto`.

Esperado tras el paso 3: **el LG sigue en `auto`** y los dos termostatos en `off`.

> No sirve intentarlo al revés (LG a `auto` con el modo ya en `off` y luego mover el modo a `calor` y volver): al pasar por `calor`, A manda `hvac_mode: heat` y **saca al LG de `auto`**, con lo que al volver a `off` entra la rama por defecto y la prueba no demuestra nada.

Si el LG se apaga en el paso 3, la rama `auto` no está entrando: revisar que va **antes** del `default` en el `choose`.

- [ ] **Step 6: Dejar el LG como estaba y commitear**

Devolver el LG a `off` desde su entidad. Actualizar `ha-config/automations.yaml` con el mismo contenido.

```bash
git add ha-config/automations.yaml
git commit -m "ha-config: automatizacion A con rama auto y trigger de arranque"
```

---

### Task 3: Automatización D — dueña del estado `auto`

**Files:**
- Create (en HA, por UI): automatización `aerotermia_auto_circulacion`
- Modify: `ha-config/automations.yaml`

**Interfaces:**
- Consumes: `sensor.punto_de_rocio_interior` (Tarea 1); la rama `auto` de A (Tarea 2).
- Produces: mientras el LG esté en `auto`, los dos termostatos quedan en `off` y `switch.socket_garaje_aerotermia_bomba` lo gobierna **solo** esta automatización.

- [ ] **Step 1: Comprobar que hoy nadie gobierna el relé en `auto`**

Confirmar con `ha_search` que no existe ninguna automatización con `auto` en sus condiciones sobre `climate.bomba_de_calor_aire_agua_2`.
Esperado: ninguna. Es el hueco que rellena esta tarea.

- [ ] **Step 2: Crear la automatización**

Ajustes → Automatizaciones → Crear automatización → Crear nueva automatización → ⋮ → Editar en YAML:

```yaml
alias: "Aerotermia - Auto: circulacion del suelo con corte de seguridad"
description: >-
  Mientras el LG esta en auto, HA no puede saber si calienta o enfria (el
  equipo no expone hvac_action), asi que ningun termostato manda y el suelo
  circula de forma continua, con tres cortes de seguridad.
mode: single
max_exceeded: silent
triggers:
  - trigger: state
    entity_id: climate.bomba_de_calor_aire_agua_2
  - trigger: state
    entity_id:
      - sensor.bomba_de_calor_aire_agua_temperatura_de_salida
      - sensor.temperatura_termostato
      - sensor.punto_de_rocio_interior
  - trigger: time_pattern
    minutes: "/5"
conditions:
  - condition: state
    entity_id: climate.bomba_de_calor_aire_agua_2
    state: "auto"
actions:
  - action: climate.set_hvac_mode
    target:
      entity_id:
        - climate.suelo_radiante_calor
        - climate.suelo_radiante_frio
    data: { hvac_mode: "off" }
  - choose:
      - conditions:
          - condition: template
            value_template: >-
              {% set salida = states('sensor.bomba_de_calor_aire_agua_temperatura_de_salida') | float(-999) %}
              {% set rocio  = states('sensor.punto_de_rocio_interior') | float(999) %}
              {% set zona   = states('sensor.temperatura_termostato') | float(-999) %}
              {{ salida < rocio + 2 or salida > 45 or zona > 24 }}
        sequence:
          - action: switch.turn_off
            target: { entity_id: switch.socket_garaje_aerotermia_bomba }
    default:
      - action: switch.turn_on
        target: { entity_id: switch.socket_garaje_aerotermia_bomba }
```

Guardar con el nombre propuesto.

- [ ] **Step 3: Verificar que no hace nada mientras el LG no esté en `auto`**

Con el LG en `off`, esperar 6 minutos (para que pase al menos un `time_pattern`) y leer `switch.socket_garaje_aerotermia_bomba` y las trazas.
Esperado: el relé **no cambia**, y las trazas muestran ejecuciones que paran en la condición. Si el relé se enciende con el LG apagado, la condición no está filtrando: parar.

- [ ] **Step 4: Probar el camino de circulación**

Poner el LG en `auto` desde su entidad. Esperar 15 s.
Esperado: ambos termostatos a `off`, y `switch.socket_garaje_aerotermia_bomba` a **`on`** con `parent_id` encadenado al contexto de la automatización. Comprobar en la traza qué rama del `choose` se tomó y que fue la `default`.

- [ ] **Step 5: Probar el corte**

Sin tocar la instalación: leer los tres valores y comprobar en la traza que la plantilla evaluó `false`. Después, verificar el corte de forma segura cambiando **temporalmente** el umbral de zona de `24` a un valor por debajo de la temperatura actual (p. ej. `20`), guardar, esperar a la siguiente evaluación.
Esperado: el relé pasa a `off`.
**Restaurar el umbral a `24` y guardar.** Confirmar que el relé vuelve a `on`.

- [ ] **Step 6: Dejar el LG como estaba y commitear**

Devolver el LG a `off` y confirmar que el relé queda en `off` (lo apaga la rama `default` de A). Añadir la automatización a `ha-config/automations.yaml`.

```bash
git add ha-config/automations.yaml
git commit -m "ha-config: automatizacion D, circulacion en auto con corte por punto de rocio"
```

---

### Task 4: Automatización C — el LG manda

**Files:**
- Create (en HA, por UI): automatización `aerotermia_sincronia_lg`
- Modify: `ha-config/automations.yaml`, `README.md`

**Interfaces:**
- Consumes: las Tareas 2 y 3 completas. **No empezar esta tarea si alguna de las dos ha quedado a medias.**
- Produces: `input_select.aerotermia_modo` pasa a reflejar el estado del LG.

- [ ] **Step 1: Demostrar el fallo original, con datos**

Poner el LG en `cool` desde su entidad, esperar 10 s y leer los dos estados.
Esperado (y ésta es la conducta que se va a corregir): LG en `cool`, `input_select.aerotermia_modo` en `off`. Anotar ambos `last_changed`.

- [ ] **Step 2: Crear la automatización**

Ajustes → Automatizaciones → Crear → ⋮ → Editar en YAML:

```yaml
alias: "Aerotermia - Sincronia: el LG manda"
description: >-
  Si el modo del LG cambia desde su propio panel, la tarjeta lo refleja.
  El modo auto se refleja como off: no hay equivalente en la tarjeta y HA
  no puede saber si la maquina calienta o enfria.
mode: queued
max: 10
triggers:
  - trigger: state
    entity_id: climate.bomba_de_calor_aire_agua_2
    to:
      - heat
      - cool
      - auto
      - "off"
conditions: []
actions:
  - action: input_select.select_option
    target: { entity_id: input_select.aerotermia_modo }
    data:
      option: >-
        {% set m = states('climate.bomba_de_calor_aire_agua_2') %}
        {{ 'calor' if m == 'heat' else 'frio' if m == 'cool' else 'off' }}
```

El `to:` explícito deja fuera `unavailable` y `unknown` a propósito: un corte de la nube de LG no debe vaciar la tarjeta.

- [ ] **Step 3: Verificar el caso `cool`**

Poner el LG en `off` y luego en `cool` desde su entidad. Esperar 10 s.
Esperado: `input_select.aerotermia_modo` a `frio` con `parent_id` encadenado al contexto del cambio del LG; `suelo_radiante_frio` a `cool`; `suelo_radiante_calor` a `off`.

- [ ] **Step 4: Verificar que no hay bucle**

Listar trazas de las tres automatizaciones con `ha_get_automation_traces`.
Esperado: como mucho **dos** ejecuciones encadenadas por cambio (C escribe el modo, A reenvía al LG el modo que ya tiene y ahí muere). Si se ven cadenas más largas o ejecuciones repetidas, parar y revisar.

- [ ] **Step 5: Verificar el caso `auto`, que es el delicado**

Poner el LG en `auto` desde su entidad. Esperar 20 s.
Esperado, las cuatro cosas a la vez:
1. `input_select.aerotermia_modo` a `off` (la tarjeta se ve Apagada)
2. ambos termostatos a `off`
3. `switch.socket_garaje_aerotermia_bomba` a `on`
4. **el LG sigue en `auto`**

El punto 4 es la verificación de D5. Si el LG se apaga solo, la guarda de la Tarea 2 no está funcionando: **deshabilitar C inmediatamente** y volver a la Tarea 2.

- [ ] **Step 6: La prueba que sostiene todo el diseño**

Pedir al usuario que cambie el modo **en el panel físico de la aerotermia**. Leer el estado del LG y su contexto.
Esperado: cambia con `user_id: null` y `parent_id: null` — llegó del equipo, no de HA. Y la tarjeta lo sigue.
Si el estado **no** cambia, `lg_thinq` no propaga los cambios del panel: el sincronismo seguirá siendo útil desde HA, pero no cubre el caso original. Anotarlo y avisar.

- [ ] **Step 7: Dejar todo como estaba, documentar y commitear**

Devolver el LG a `off`. Actualizar `ha-config/automations.yaml` y añadir al `README.md` el diagrama de la sincronía en ambos sentidos y la nota de que `auto` se refleja como Apagado.

```bash
git add ha-config/automations.yaml README.md
git commit -m "ha-config: automatizacion C, sincronia LG -> tarjeta"
```

---

## Pendiente, fuera del alcance de este plan

- **En `auto` no se puede apagar la máquina desde la tarjeta** (spec, sección 7). Exige tocar el código de la tarjeta y sacar versión.
- **`min_cycle_duration` de la bomba**: los `generic_thermostat` son helpers de UI y no lo tienen. Independiente de este plan, mismo relé.
- **Umbrales 24 °C y 45 °C**: propuestos, sin validar contra la instalación a lo largo de un ciclo estacional completo.
