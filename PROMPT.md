# Prompt — Tarjeta Lovelace "Aerotermia" (control suelo radiante + impulsión)

> Documento-prompt para generar una **custom card LitElement** de Home Assistant + la
> **configuración backend** (generic_thermostat, helpers, automatizaciones) que la soporta.

---

## 1. Contexto del sistema

Instalación de aerotermia con depósito de inercia y suelo radiante:

- **Generación (motor)**: bomba de calor aire-agua LG ThinQ → entidad `climate.bomba_de_calor_aire_agua_2`.
  Controla la **temperatura de impulsión de agua** hacia el depósito de inercia y el **modo**
  (auto / calor / frío / off). El modo **auto solo existe a este nivel (motor)**, no en el termostato del suelo.
  Su `current_temperature` se usa **de momento** como temperatura del depósito de inercia
  (en el futuro habrá un sensor dedicado).
- **Demanda**: bomba de impulsión que mueve el agua del depósito a los circuitos de suelo radiante.
  Relé domótico: `switch.socket_garaje_aerotermia_bomba`.
- **Sensor de control de la zona** (`target_sensor`): `sensor.temperatura_termostato`.

Objetivo: una tarjeta única que (a) actúe como **termostato del suelo radiante** (enciende la bomba
según objetivo de la zona) con presets editables, y (b) muestre/controle el **LG** (objetivo de agua +
impulsión/inercia real), con un **modo compartido** (off / calor / frío) entre el termostato y el motor.

---

## 2. Backend en Home Assistant (la lógica vive aquí, NO en la tarjeta)

Requisito clave: debe funcionar **aunque no haya ninguna pestaña de HA abierta**. Toda la inteligencia
(valores de preset por modo, conmutación calor/frío, sincronía de modo, seguridad) se implementa con
`generic_thermostat` + `input_number`/`input_select` + automatizaciones. La tarjeta no decide nada.

### 2.1 Dos generic_thermostat con presets nativos, compartiendo relé y sensor

`generic_thermostat` fija `ac_mode` en YAML y **no se puede cambiar en runtime**, así que se crean dos
(uno calienta, otro enfría) que comparten el mismo relé y sensor. Los **presets se configuran aquí**
(nativos). Cambiarlos requiere editar el YAML + reiniciar HA; la tarjeta solo los *selecciona*.

```yaml
climate:
  # ─────────── CALOR (invierno) ───────────
  - platform: generic_thermostat
    name: Suelo Radiante Calor
    unique_id: suelo_radiante_calor
    heater: switch.socket_garaje_aerotermia_bomba
    target_sensor: sensor.temperatura_termostato
    ac_mode: false            # calentar: enciende bomba cuando T < objetivo
    min_temp: 12
    max_temp: 26
    target_temp: 21           # arranque por defecto
    cold_tolerance: 0.3
    hot_tolerance: 0.3
    min_cycle_duration: { minutes: 10 }   # protege la bomba de ciclos cortos
    precision: 0.5
    away_temp: 16             # Fuera
    comfort_temp: 21.5        # Confort
    eco_temp: 19.5            # Eco
    home_temp: 20             # En Casa
    sleep_temp: 17          # Dormir

  # ─────────── FRÍO (verano) ───────────
  - platform: generic_thermostat
    name: Suelo Radiante Frio
    unique_id: suelo_radiante_frio
    heater: switch.socket_garaje_aerotermia_bomba
    target_sensor: sensor.temperatura_termostato
    ac_mode: true             # enfriar: enciende bomba cuando T > objetivo
    min_temp: 20
    max_temp: 30
    target_temp: 25           # arranque por defecto
    cold_tolerance: 0.3
    hot_tolerance: 0.3
    min_cycle_duration: { minutes: 10 }
    precision: 0.5
    away_temp: 28             # Fuera
    comfort_temp: 22        # Confort
    eco_temp: 25              # Eco
    home_temp: 22             # En Casa
    sleep_temp: 24            # Dormir
```

Mapeo presets visibles ↔ HA: Fuera→`away`, Confort→`comfort`, Eco→`eco`, En Casa→`home`, Dormir→`sleep`.

### 2.2 Helper de modo maestro

```yaml
input_select:
  aerotermia_modo:
    name: Modo Aerotermia (suelo)
    options: [off, calor, frio]       # SIN auto (auto solo en el motor LG)
```

### 2.3 Automatizaciones (servidor)

**A) Conmutación de modo + sincronía con el LG + exclusión del relé.**
Trigger: cambia `input_select.aerotermia_modo`.
- `calor` → `suelo_radiante_frio` a `hvac_mode: off`; `suelo_radiante_calor` a `heat`; LG → `heat`.
- `frio`  → `suelo_radiante_calor` a `hvac_mode: off`; `suelo_radiante_frio` a `cool`; LG → `cool`.
- `off`   → ambos termostatos `off`; bomba `off`; LG `off`; **bloquear** que la bomba arranque.
Solo UNO de los dos termostatos controla el relé en cada momento.

**B) Seguridad: si el motor está apagado/fallo, la bomba se apaga.**
Trigger: `climate.bomba_de_calor_aire_agua_2` pasa a `off`/`unavailable`.
Acción: `switch.turn_off` de `switch.socket_garaje_aerotermia_bomba` y termostatos a `off`
(no tiene sentido mover agua sin generación).

**Decisión backend confirmada**: dos generic_thermostat con presets nativos + input_select de modo + automatizaciones.

---

## 3. La tarjeta (custom card LitElement)

### 3.1 Stack
- LitElement + TypeScript, build (rollup/vite), estilo y estructura como `pool-timer-card`.
- Recurso Lovelace (`/local/...js`) + editor visual (`getConfigElement`, `getStubConfig`).
- Sin lógica de negocio: lee estados y llama servicios / cambia input_select / input_number.

### 3.2 Layout (basado en `componente-actual.png`)
Mantener estética de la tarjeta thermostat nativa (dial circular, número grande, +/−, fila de modos)
pero ampliada:

```
┌─────────────────────────────────────────┐
│            Aerotermia              ⋮      │
│            ◜  dial circular  ◝           │
│              Confort (preset)             │
│                21 °C        <- objetivo zona (termostato activo)
│             🌡 20.5 °C      <- temperatura real de la zona
│              ( − )  ( + )                 │
│  ── Motor / Impulsión (LG) ────────────── │
│   Objetivo agua: 45°C  ( − )( + )         │
│   Impulsión / inercia: 42°C  [🔥 activo]  │
│  Presets: [Fuera][Confort][Eco][Casa][Dormir]   (editables)
│  Modos:   [⏻ off][❄ frío][🔥 calor]      │
└─────────────────────────────────────────┘
```

### 3.3 Comportamiento
- **Dial / +/−principal**: `climate.set_temperature` sobre el termostato **activo** (resuelto por
  `input_select.aerotermia_modo`). Ojo: al ajustar manualmente puede divergir del preset (mostrar que
  está "modificado" si difiere del valor del preset actual).
- **Fila de modos (off / frío / calor)** — *sin auto*: escribe `input_select.aerotermia_modo`. El backend
  propaga al LG y conmuta termostatos. Resaltar el activo según el estado del input_select.
- **Presets**: `climate.set_preset_mode` sobre el termostato activo (away/comfort/eco/home/sleep).
  Resaltar el preset activo según `preset_mode` del termostato activo.
- **Valores de preset**: configurados como presets nativos en el YAML (sección 2.1). Editarlos requiere
  YAML + reinicio; la tarjeta solo los selecciona. (Si en el futuro se quisieran editar en caliente,
  migrar a input_number + automatización.)
- **Bloque LG**:
  - Mostrar `temperature` (objetivo de agua) y `current_temperature` (impulsión/inercia real) de
    `climate.bomba_de_calor_aire_agua_2`.
  - `+/−` sobre el objetivo de agua → `climate.set_temperature` sobre el LG.
  - El **modo del LG no tiene control propio**: cambia a la par con el modo maestro (lo hace el backend).
  - Indicador de actividad (`hvac_action`/compresor) si está disponible.
- **Indicador de bomba**: estado de `switch.socket_garaje_aerotermia_bomba` y/o `hvac_action` del
  termostato activo (heating / cooling / idle).
- **Feedback de color del dial**: naranja = heating, azul = cooling, gris = idle/off.

### 3.4 Config schema de la tarjeta (YAML)
```yaml
type: custom:aerothermal-temperature-control
name: Aerotermia
mode_select: input_select.aerotermia_modo
thermostat_heat: climate.suelo_radiante_calor
thermostat_cool: climate.suelo_radiante_frio
water_climate: climate.bomba_de_calor_aire_agua_2
pump_switch: switch.socket_garaje_aerotermia_bomba
inertia_sensor: ""   # vacío -> usa current_temperature del LG (futuro: sensor dedicado)
presets:               # etiqueta visible -> preset nativo HA
  - { label: Fuera,   preset: away }
  - { label: Confort, preset: comfort }
  - { label: Eco,     preset: eco }
  - { label: En Casa, preset: home }
  - { label: Dormir,  preset: sleep }
show_modes: [off, cool, heat]   # sin auto
```

### 3.5 Estados a leer
- `climate.suelo_radiante_calor` / `..._frio`: `temperature`, `current_temperature`, `hvac_mode`,
  `hvac_action`, `min_temp`, `max_temp`, `target_temp_step`.
- `climate.bomba_de_calor_aire_agua_2`: `temperature`, `current_temperature`, `hvac_mode`, `hvac_action`.
- `input_select.aerotermia_modo`: para resaltar el modo activo.
- `preset_mode` del termostato activo: para resaltar el preset activo.
- `switch.socket_garaje_aerotermia_bomba`: estado de la bomba.

---

## 4. Reglas de negocio confirmadas
- **Modo auto**: eliminado del termostato del suelo; queda solo a nivel del motor LG.
- **Presets**: presets nativos por termostato, distintos en calor y frío (config en YAML, sección 2.1).
- **Seguridad**: si el motor LG está `off`/fallo → la bomba se apaga y no puede arrancar.
- **Modo off**: apaga termostatos + LG + bomba e impide que la bomba funcione.
- **Inercia**: por ahora `current_temperature` del LG; preparar `inertia_sensor` para sensor futuro.

---

## 5. Extras / nice-to-have
- Aviso si el relé conmuta demasiado (más allá de `min_cycle_duration`).
- Indicar "objetivo modificado" cuando el ajuste manual difiere del preset.
- Soporte de tema HA (variables CSS) y modo claro/oscuro.
- (Futuro) programación horaria de presets — dejar enganche, fuera de alcance inicial.

---

## 6. Entregables esperados
1. Código de la custom card (LitElement + TS) con build y editor visual.
2. `README.md`: instalación (recurso Lovelace) + ejemplo de config.
3. Snippet `configuration.yaml`: dos generic_thermostat (con presets) + input_select de modo.
4. Automatizaciones A y B (conmutar modo/sincronía con LG, seguridad).
5. Ejemplo de tarjeta funcionando con los entity_id reales.
