import { LovelaceCardConfig } from "custom-card-helpers";

export interface PresetItem {
  /** Etiqueta visible en la tarjeta (ej. "Confort"). */
  label: string;
  /** preset_mode nativo del climate (ej. "comfort"). */
  preset: string;
  /** Icono opcional mdi. */
  icon?: string;
}

export interface AerothermalCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  /** input_select que actua de modo maestro (off/calor/frio). */
  mode_select: string;
  /** generic_thermostat de calor. */
  thermostat_heat: string;
  /** generic_thermostat de frio. */
  thermostat_cool: string;
  /** climate del motor LG (objetivo agua + impulsion/inercia). */
  water_climate: string;
  /** sensor de temperatura de la zona; si se define, el dial muestra su valor
   *  directamente (mas fiable que current_temperature del termostato). */
  current_sensor?: string;
  /** rele de la bomba de impulsion (opcional, solo indicador). */
  pump_switch?: string;
  /** sensor de inercia; vacio = usa current_temperature del LG. */
  inertia_sensor?: string;
  /** input_boolean que bloquea los modos automaticos: encendido, las
   *  automatizaciones no tocan los presets. Se muestra como candado. */
  lock_entity?: string;
  /** automatizaciones de los modos automaticos (horario en calor, vacaciones
   *  en calor y frio). En calor y frio, el desplegable del motor muestra un
   *  interruptor que las enciende o apaga todas a la vez. */
  auto_mode_automations?: string[];
  /** presets visibles. */
  presets?: PresetItem[];
  /** modos visibles: subconjunto de off|cool|heat. */
  show_modes?: string[];
}

/** Valores del input_select.aerotermia_modo. */
export const MODE_OPTION = {
  off: "off",
  cool: "frio",
  heat: "calor",
  /** El motor LG decide calor o frio por su cuenta. El suelo no lo gobierna
   *  ningun termostato: circula de forma continua con cortes de seguridad,
   *  porque el LG no expone hvac_action y HA no puede saber el sentido. */
  auto: "auto",
} as const;
