# Guía de implementación — Aerothermal Temperature Control

Pasos para poner en marcha el sistema completo, en orden. Tiempo estimado: ~30 min.

> **Antes de empezar — comprueba estos entity_id en HA** (Herramientas para desarrolladores → Estados):
> - `switch.socket_garaje_aerotermia_bomba` (relé de la bomba)
> - `sensor.temperatura_termostato` (sensor de la zona)
> - `climate.bomba_de_calor_aire_agua_2` (motor LG)
>
> Si alguno difiere, edita los YAML y la config de la tarjeta antes de seguir.

---

## Fase 1 — Backend (lógica en el servidor)

### 1.1 Crear los dos termostatos + el modo maestro

Copia el bloque de `ha-config/configuration.yaml` a tu `configuration.yaml`.

> Si ya tienes una clave `climate:` o `input_select:`, **fusiona** el contenido bajo la
> existente (no dupliques la clave). Alternativa recomendada: usar *packages*.

**Comprueba la configuración**: Ajustes → Sistema → Reiniciar → *Comprobar configuración*.

Si es válida, **reinicia Home Assistant**.

### 1.2 Verificar entidades creadas

En Herramientas para desarrolladores → Estados, confirma que existen:
- `climate.suelo_radiante_calor`
- `climate.suelo_radiante_frio`
- `input_select.aerotermia_modo` (con opciones `off`, `calor`, `frio`)

### 1.3 Cargar las automatizaciones

Copia el contenido de `ha-config/automations.yaml` a tu `automations.yaml`
(o créalas por UI en modo YAML). Recarga automatizaciones:
Herramientas para desarrolladores → YAML → *Automatizaciones*.

Deben aparecer:
- **Aerotermia - Conmutacion de modo (suelo + LG)**
- **Aerotermia - Seguridad: motor apagado apaga bomba**

---

## Fase 2 — La tarjeta visual

### 2.1 Copiar el JS

Copia `dist/aerothermal-temperature-control.js` a la carpeta `config/www/` de tu HA.
(Si no existe `www`, créala y reinicia una vez.)

### 2.2 Registrar el recurso

Ajustes → Paneles → ⋮ (arriba dcha.) → **Recursos** → Añadir recurso:
- URL: `/local/aerothermal-temperature-control.js`
- Tipo: **Módulo de JavaScript**

> Si no ves "Recursos", activa el modo avanzado en tu perfil de usuario.

### 2.3 Añadir la tarjeta

Edita un dashboard → Añadir tarjeta → busca **"Aerothermal Temperature Control"**
(o pega el YAML del README). Recarga con **Ctrl+F5**.

---

## Fase 3 — Pruebas funcionales

Marca cada prueba:

- [ ] **Modo calor**: pulsa 🔥 en la tarjeta. → `input_select` pasa a `calor`,
      `suelo_radiante_frio` queda `off`, `suelo_radiante_calor` en `heat`, el LG en `heat`.
- [ ] **Modo frío**: pulsa ❄. → al revés que arriba.
- [ ] **Modo off**: pulsa ⏻. → ambos termostatos `off`, LG `off`, relé `off`.
- [ ] **Preset**: pulsa *Confort* / *Eco* / etc. → cambia el objetivo del termostato activo
      al valor configurado (distinto en calor que en frío).
- [ ] **Ajuste manual** (+/−): cambia el objetivo de la zona en pasos de 0.5 °C.
- [ ] **Objetivo de agua (LG)** (+/−): cambia `temperature` del motor LG.
- [ ] **Bomba**: con demanda (T zona por debajo del objetivo en calor), el relé
      `switch.socket_garaje_aerotermia_bomba` se enciende tras la histéresis.
- [ ] **Seguridad**: apaga el motor LG manualmente → a los 30 s la bomba y los termostatos
      se apagan y el modo pasa a `off`.

### Comprobación rápida del relé (sin esperar histéresis)

En Herramientas para desarrolladores → Servicios:
```yaml
service: climate.set_temperature
target: { entity_id: climate.suelo_radiante_calor }
data: { temperature: 30 }   # fuerza demanda de calor
```
La bomba debería encender (respetando `min_cycle_duration`). Devuelve el valor a un objetivo normal después.

---

## Ajustes finos (opcional)

| Parámetro | Dónde | Efecto |
|-----------|-------|--------|
| `cold_tolerance` / `hot_tolerance` | `configuration.yaml` | Histéresis. Subir = ciclos más largos, menos arranques. |
| `min_cycle_duration` | `configuration.yaml` | Tiempo mínimo entre conmutaciones del relé. |
| Valores `*_temp` (presets) | `configuration.yaml` | Temperaturas de cada preset por modo (requiere reinicio). |
| `for: { seconds: 30 }` | `automations.yaml` (B) | Retardo antes de cortar por motor apagado. |

---

## Problemas comunes

- **"Custom element doesn't exist"**: el recurso no está registrado o no recargaste (Ctrl+F5).
  Verifica la URL `/local/...` y el tipo *módulo*.
- **El relé "tiembla" (on/off rápido)**: sube `min_cycle_duration` y/o las tolerancias.
- **Cambiar de modo no apaga el otro termostato**: revisa que la automatización A esté
  cargada y que los `entity_id` coincidan.
- **En frío no enfría / suelo "suda"**: revisa el objetivo de agua del LG (condensación);
  no bajar de ~18 °C de impulsión salvo control de punto de rocío.

---

## Mantenimiento / futuro

- Sensor dedicado de inercia → rellena `inertia_sensor` en la tarjeta.
- Presets editables en caliente → migrar a `input_number` + automatización (ver `PROMPT.md` §2).
- Programación horaria de presets (scheduler).
