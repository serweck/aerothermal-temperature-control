# Changelog

Todas las versiones notables de este proyecto se documentan aquí.
El formato sigue [Keep a Changelog](https://keepachangelog.com/) y
[SemVer](https://semver.org/lang/es/).

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
