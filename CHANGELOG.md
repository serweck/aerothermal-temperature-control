# Changelog

Todas las versiones notables de este proyecto se documentan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/) y
[SemVer](https://semver.org/lang/es/).

## [1.4.1] - 2026-06-18

### Cambiado
- El cambio de temperatura ahora **solo se activa al agarrar la bolita (tirador)**, no en el resto
  del aro. Pulsar en cualquier otro punto del dial ya no modifica nada.

## [1.4.0] - 2026-06-18

### Añadido
- Click en la **temperatura real** del dial y en la **impulsión/inercia** del bloque LG abre el
  **histórico** (more-info) del sensor correspondiente.

### Cambiado
- El dial **solo cambia la temperatura al pulsar/arrastrar sobre el aro**, no en el centro del
  círculo (evita cambios accidentales al tocar el número).

## [1.3.0] - 2026-06-18

### Añadido
- Opción **`current_sensor`**: lee la temperatura real del dial directamente del sensor de la
  zona en vez del `current_temperature` del termostato (que puede quedarse congelado). Resuelve
  que la temperatura real no se actualizara aunque el sensor sí cambiara. Disponible en el editor.

## [1.2.3] - 2026-06-18

### Cambiado
- Punto de temperatura actual: de negro a un **tono más oscuro del acento**
  (azul oscuro en frío / naranja oscuro en calor), como el termostato nativo.

## [1.2.2] - 2026-06-18

### Cambiado
- Tirador (bola) más pequeño (r 12 → 8).
- Punto de temperatura actual ahora **negro** (antes blanco).

## [1.2.1] - 2026-06-18

### Corregido
- **No se veían el aro de color, el degradado, el tirador ni el punto de temperatura actual**
  (solo el track gris). Causa: los fragmentos SVG interpolados (aro, tirador, punto y los
  `<stop>` del degradado) se construían con el tag `html` de lit, que los crea en namespace
  HTML y no se pintan dentro del `<svg>`. Ahora usan el tag `svg` de lit (namespace correcto).

## [1.2.0] - 2026-06-18

### Cambiado
- Dial rediseñado para **igualar al termostato nativo** de HA: aro más grueso y grande,
  hueco inferior más pequeño, **degradado** de color en el aro, relleno desde el tirador,
  glow difuminado, tirador blanco con sombra y **punto de temperatura actual** sobre el aro.
- **Número estilo nativo**: entero grande + `°C` pequeño arriba + decimal con coma (`,0`).
- **Botones +/−** circulares con borde (transparentes), tamaño nativo.
- Etiqueta de modo y temperatura actual en color de acento.

## [1.1.2] - 2026-06-18

### Corregido
- **El dial no se podía arrastrar**: el overlay central (`.dial-center`) capturaba el puntero e
  impedía que llegara al aro SVG. Ahora `pointer-events: none` en el overlay (y `auto` solo en los
  botones +/−), de modo que el arrastre funciona en todo el aro.
- **Color del aro**: se aplica directo (`stroke` inline) en lugar de depender de la variable CSS
  heredada, para que el aro y el tirador se vean siempre coloreados. Tirador algo más grande.

## [1.1.1] - 2026-06-18

### Cambiado
- Color de calor a **naranja nativo** de HA (`--state-climate-heat-color`) y frío a azul nativo
  (`--state-climate-cool-color`), en lugar del rojo, para alinearse con el termostato nativo.

## [1.1.0] - 2026-06-18

### Añadido
- **Dial arrastrable**: ajusta la temperatura objetivo arrastrando sobre el aro (ratón y táctil),
  como el termostato nativo. Se confirma al soltar (`climate.set_temperature`).

### Cambiado
- Color del aro y del **botón de modo activo / presets**: **azul** en frío y **rojo** en calor
  (la variable `--accent` ahora se hereda desde `ha-card`).

## [1.0.0] - 2026-06-18

### Añadido
- Custom card LitElement + TypeScript (`src/`) con build de rollup a `dist/`.
- Editor visual (`ha-form`) para los entity_id principales.
- Dial circular (SVG) + presets (Fuera/Confort/Eco/En Casa/Dormir) + modos (off/frío/calor).
- Bloque del motor LG: objetivo de agua editable + impulsión/inercia (lectura) e indicadores.
- Backend HA: dos `generic_thermostat` (calor/frío) compartiendo relé y sensor + `input_select` de modo.
- Automatizaciones: conmutación de modo con sincronía al LG y exclusión del relé, y seguridad (motor off → bomba off).
- Documentación: `README.md`, `GUIA-IMPLEMENTACION.md`, `PROMPT.md`.
- Soporte HACS (`hacs.json`) y licencia MIT.
