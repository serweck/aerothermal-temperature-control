import { LitElement, html, css, TemplateResult, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, fireEvent, LovelaceCardEditor } from "custom-card-helpers";
import { AerothermalCardConfig } from "./types";
import { EDITOR_TAG } from "./const";

const SCHEMA = [
  { name: "name", selector: { text: {} } },
  {
    name: "mode_select",
    required: true,
    selector: { entity: { domain: "input_select" } },
  },
  {
    name: "thermostat_heat",
    required: true,
    selector: { entity: { domain: "climate" } },
  },
  {
    name: "thermostat_cool",
    required: true,
    selector: { entity: { domain: "climate" } },
  },
  {
    name: "water_climate",
    required: true,
    selector: { entity: { domain: "climate" } },
  },
  { name: "pump_switch", selector: { entity: { domain: "switch" } } },
  { name: "inertia_sensor", selector: { entity: { domain: "sensor" } } },
];

const LABELS: Record<string, string> = {
  name: "Nombre",
  mode_select: "input_select de modo (off/calor/frio)",
  thermostat_heat: "Termostato CALOR (generic_thermostat)",
  thermostat_cool: "Termostato FRIO (generic_thermostat)",
  water_climate: "Climate del motor LG",
  pump_switch: "Rele de la bomba (opcional)",
  inertia_sensor: "Sensor de inercia (opcional)",
};

@customElement(EDITOR_TAG)
export class AerothermalCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: AerothermalCardConfig;

  public setConfig(config: AerothermalCardConfig): void {
    this._config = config;
  }

  private _computeLabel = (schema: { name: string }): string =>
    LABELS[schema.name] ?? schema.name;

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) {
      return nothing;
    }
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p class="hint">
        Los <b>presets</b> y <b>show_modes</b> se configuran en YAML (ver README).
      </p>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value as AerothermalCardConfig;
    fireEvent(this, "config-changed", { config });
  }

  static styles = css`
    .hint {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      margin-top: 8px;
    }
  `;
}
