import { LitElement, html, css, TemplateResult, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from "custom-card-helpers";
import { AerothermalCardConfig, MODE_OPTION, PresetItem } from "./types";

interface HaEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
}
import { CARD_TAG, CARD_VERSION } from "./const";
import "./editor";

/* eslint-disable no-console */
console.info(
  `%c AEROTHERMAL-TEMPERATURE-CONTROL %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: #1c1c1c; font-weight: 700;"
);

// Registro en el selector de tarjetas de Lovelace
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: CARD_TAG,
  name: "Aerothermal Temperature Control",
  description: "Termostato de suelo radiante + control del motor de aerotermia (LG)",
  preview: true,
});

const DEFAULT_PRESETS: PresetItem[] = [
  { label: "Fuera", preset: "away", icon: "mdi:home-export-outline" },
  { label: "Confort", preset: "comfort", icon: "mdi:sofa" },
  { label: "Eco", preset: "eco", icon: "mdi:leaf" },
  { label: "En Casa", preset: "home", icon: "mdi:home" },
  { label: "Dormir", preset: "sleep", icon: "mdi:bed" },
];

const MODE_META: Record<string, { icon: string; label: string; option: string }> = {
  off: { icon: "mdi:power", label: "Apagado", option: MODE_OPTION.off },
  cool: { icon: "mdi:snowflake", label: "Frio", option: MODE_OPTION.cool },
  heat: { icon: "mdi:fire", label: "Calor", option: MODE_OPTION.heat },
};

// --- helpers SVG para el dial ---
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}
function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

const ARC_START = 220;
const ARC_END = 500; // hueco centrado abajo
const ARC_SWEEP = ARC_END - ARC_START;

@customElement(CARD_TAG)
export class AerothermalCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: AerothermalCardConfig;
  @state() private _dragging = false;
  @state() private _dragTemp: number | null = null;

  private _boundMove = (e: PointerEvent) => this._onPointerMove(e);
  private _boundUp = () => this._onPointerUp();

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("pointermove", this._boundMove);
    window.removeEventListener("pointerup", this._boundUp);
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement(
      "aerothermal-temperature-control-editor"
    ) as unknown as LovelaceCardEditor;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {
      name: "Aerotermia",
      mode_select: "input_select.aerotermia_modo",
      thermostat_heat: "climate.suelo_radiante_calor",
      thermostat_cool: "climate.suelo_radiante_frio",
      water_climate: "climate.bomba_de_calor_aire_agua_2",
      pump_switch: "switch.socket_garaje_aerotermia_bomba",
      inertia_sensor: "",
      show_modes: ["off", "cool", "heat"],
    };
  }

  public setConfig(config: AerothermalCardConfig): void {
    if (!config.mode_select) throw new Error("Falta 'mode_select'");
    if (!config.thermostat_heat) throw new Error("Falta 'thermostat_heat'");
    if (!config.thermostat_cool) throw new Error("Falta 'thermostat_cool'");
    if (!config.water_climate) throw new Error("Falta 'water_climate'");
    this.config = {
      show_modes: ["off", "cool", "heat"],
      presets: DEFAULT_PRESETS,
      ...config,
    };
  }

  public getCardSize(): number {
    return 5;
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    return (
      changed.has("config") ||
      changed.has("hass") ||
      changed.has("_dragging") ||
      changed.has("_dragTemp")
    );
  }

  // --- estado derivado ---
  private get modeState(): string {
    const e = this.hass.states[this.config.mode_select];
    return e ? e.state : "off";
  }
  private get isOff(): boolean {
    return this.modeState === MODE_OPTION.off;
  }
  private get activeThermostatId(): string {
    return this.modeState === MODE_OPTION.cool
      ? this.config.thermostat_cool
      : this.config.thermostat_heat;
  }
  private get activeThermostat(): HaEntity | undefined {
    return this.hass.states[this.activeThermostatId];
  }
  private get accentColor(): string {
    if (this.isOff) return "var(--disabled-text-color, #6f6f6f)";
    // Azul en frio, rojo en calor (como el termostato nativo)
    return this.modeState === MODE_OPTION.cool ? "#2196f3" : "#e53935";
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this.config) return nothing;
    const t = this.activeThermostat;
    if (!t) {
      return html`<ha-card
        ><div class="warn">
          Entidad no encontrada: ${this.activeThermostatId}
        </div></ha-card
      >`;
    }

    const min = Number(t.attributes.min_temp ?? 12);
    const max = Number(t.attributes.max_temp ?? 30);
    const target = Number(t.attributes.temperature ?? min);
    const liveTarget = this._dragTemp != null ? this._dragTemp : target;
    const current = t.attributes.current_temperature;
    const action = (t.attributes.hvac_action as string) ?? "idle";
    const presetMode = t.attributes.preset_mode as string | undefined;

    const frac = Math.min(1, Math.max(0, (liveTarget - min) / (max - min)));
    const valueAngle = ARC_START + frac * ARC_SWEEP;
    const handle = polarToCartesian(100, 100, 80, valueAngle);

    const actionLabel = this.isOff
      ? "Apagado"
      : action === "heating"
      ? "Calentando"
      : action === "cooling"
      ? "Enfriando"
      : this.modeState === MODE_OPTION.cool
      ? "Frio"
      : "Calor";

    return html`
      <ha-card style="--accent:${this.accentColor}">
        <div class="header">
          <span class="title">${this.config.name ?? "Aerotermia"}</span>
        </div>

        <!-- DIAL -->
        <div class="dial-wrap">
          <svg
            viewBox="0 0 200 200"
            class="dial ${this.isOff ? "off" : ""}"
            @pointerdown=${this._onPointerDown}
          >
            <path class="track" d=${arcPath(100, 100, 80, ARC_START, ARC_END)} />
            ${this.isOff
              ? nothing
              : html`<path
                  class="value"
                  d=${arcPath(100, 100, 80, ARC_START, valueAngle)}
                />`}
            ${this.isOff
              ? nothing
              : html`<circle class="handle" cx=${handle.x} cy=${handle.y} r="9" />`}
          </svg>
          <div class="dial-center">
            <div class="preset-name">${actionLabel}</div>
            <div class="target">
              ${this.isOff ? "--" : liveTarget.toFixed(1)}<span class="unit">°C</span>
            </div>
            ${current != null
              ? html`<div class="current">
                  <ha-icon icon="mdi:thermometer"></ha-icon> ${current} °C
                </div>`
              : nothing}
            <div class="adjust">
              <button
                class="round"
                ?disabled=${this.isOff}
                @click=${() => this._stepThermostat(-1)}
              >
                <ha-icon icon="mdi:minus"></ha-icon>
              </button>
              <button
                class="round"
                ?disabled=${this.isOff}
                @click=${() => this._stepThermostat(1)}
              >
                <ha-icon icon="mdi:plus"></ha-icon>
              </button>
            </div>
          </div>
        </div>

        ${this._renderWaterBlock()} ${this._renderPresets(presetMode)}
        ${this._renderModes()}
      </ha-card>
    `;
  }

  private _renderWaterBlock(): TemplateResult {
    const lg = this.hass.states[this.config.water_climate];
    if (!lg) {
      return html`<div class="warn small">
        Climate LG no encontrado: ${this.config.water_climate}
      </div>`;
    }
    const wTarget = lg.attributes.temperature;
    const inertia =
      this.config.inertia_sensor && this.hass.states[this.config.inertia_sensor]
        ? this.hass.states[this.config.inertia_sensor].state
        : lg.attributes.current_temperature;
    const lgAction = (lg.attributes.hvac_action as string) ?? lg.state;
    const lgActive = lgAction === "heating" || lgAction === "cooling";
    const pump = this.config.pump_switch
      ? this.hass.states[this.config.pump_switch]
      : undefined;
    const pumpOn = pump?.state === "on";

    return html`
      <div class="section">
        <div class="section-title">
          <ha-icon icon="mdi:heat-pump"></ha-icon> Motor / Impulsion (LG)
        </div>
        <div class="row">
          <span class="label">Objetivo agua</span>
          <div class="row-right">
            <button class="round sm" @click=${() => this._stepWater(-1)}>
              <ha-icon icon="mdi:minus"></ha-icon>
            </button>
            <span class="value-num">${wTarget != null ? wTarget : "--"} °C</span>
            <button class="round sm" @click=${() => this._stepWater(1)}>
              <ha-icon icon="mdi:plus"></ha-icon>
            </button>
          </div>
        </div>
        <div class="row">
          <span class="label">Impulsion / inercia</span>
          <div class="row-right">
            <span class="value-num">${inertia != null ? inertia : "--"} °C</span>
            <span class="chip ${lgActive ? "on" : ""}">
              <ha-icon icon="mdi:heat-pump-outline"></ha-icon>
              ${lgActive ? "activo" : "reposo"}
            </span>
          </div>
        </div>
        ${pump
          ? html`<div class="row">
              <span class="label">Bomba suelo</span>
              <span class="chip ${pumpOn ? "on" : ""}">
                <ha-icon icon="mdi:pump"></ha-icon>
                ${pumpOn ? "en marcha" : "parada"}
              </span>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderPresets(active?: string): TemplateResult {
    const presets = this.config.presets ?? DEFAULT_PRESETS;
    return html`
      <div class="presets">
        ${presets.map(
          (p) => html`
            <button
              class="preset ${active === p.preset ? "active" : ""}"
              ?disabled=${this.isOff}
              title=${p.label}
              @click=${() => this._setPreset(p.preset)}
            >
              ${p.icon ? html`<ha-icon icon=${p.icon}></ha-icon>` : nothing}
              <span>${p.label}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  private _renderModes(): TemplateResult {
    const modes = this.config.show_modes ?? ["off", "cool", "heat"];
    return html`
      <div class="modes">
        ${modes.map((m) => {
          const meta = MODE_META[m];
          if (!meta) return nothing;
          const isActive = this.modeState === meta.option;
          return html`
            <button
              class="mode ${isActive ? "active" : ""}"
              title=${meta.label}
              @click=${() => this._setMode(meta.option)}
            >
              <ha-icon icon=${meta.icon}></ha-icon>
            </button>
          `;
        })}
      </div>
    `;
  }

  // --- acciones ---
  private _step(entityId: string, dir: number): void {
    const e = this.hass.states[entityId];
    if (!e) return;
    const step = Number(e.attributes.target_temp_step ?? 0.5);
    const cur = Number(e.attributes.temperature ?? e.attributes.min_temp ?? 20);
    const min = Number(e.attributes.min_temp ?? -Infinity);
    const max = Number(e.attributes.max_temp ?? Infinity);
    const next = Math.min(max, Math.max(min, cur + dir * step));
    this.hass.callService("climate", "set_temperature", {
      entity_id: entityId,
      temperature: Number(next.toFixed(1)),
    });
  }
  private _stepThermostat(dir: number): void {
    if (this.isOff) return;
    this._step(this.activeThermostatId, dir);
  }
  private _stepWater(dir: number): void {
    this._step(this.config.water_climate, dir);
  }
  private _setPreset(preset: string): void {
    if (this.isOff) return;
    this.hass.callService("climate", "set_preset_mode", {
      entity_id: this.activeThermostatId,
      preset_mode: preset,
    });
  }
  private _setMode(option: string): void {
    this.hass.callService("input_select", "select_option", {
      entity_id: this.config.mode_select,
      option,
    });
  }

  // --- arrastre del dial ---
  private _onPointerDown(e: PointerEvent): void {
    if (this.isOff) return;
    e.preventDefault();
    this._dragging = true;
    this._updateFromPointer(e);
    window.addEventListener("pointermove", this._boundMove);
    window.addEventListener("pointerup", this._boundUp);
  }
  private _onPointerMove(e: PointerEvent): void {
    if (this._dragging) this._updateFromPointer(e);
  }
  private _onPointerUp(): void {
    if (!this._dragging) return;
    this._dragging = false;
    window.removeEventListener("pointermove", this._boundMove);
    window.removeEventListener("pointerup", this._boundUp);
    if (this._dragTemp != null) {
      this.hass.callService("climate", "set_temperature", {
        entity_id: this.activeThermostatId,
        temperature: this._dragTemp,
      });
    }
    this._dragTemp = null;
  }
  private _updateFromPointer(e: PointerEvent): void {
    const svg = this.renderRoot.querySelector("svg.dial") as SVGElement | null;
    const t = this.activeThermostat;
    if (!svg || !t) return;
    const rect = svg.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90; // 0 = arriba, horario
    if (angle < 0) angle += 360;

    let frac: number;
    if (angle >= ARC_START && angle <= 360) {
      frac = (angle - ARC_START) / ARC_SWEEP;
    } else if (angle >= 0 && angle <= 140) {
      frac = (angle + 360 - ARC_START) / ARC_SWEEP;
    } else {
      // zona muerta inferior: fijar al extremo mas cercano
      frac = angle - 140 < ARC_START - angle ? 1 : 0;
    }
    frac = Math.min(1, Math.max(0, frac));

    const min = Number(t.attributes.min_temp ?? 12);
    const max = Number(t.attributes.max_temp ?? 30);
    const step = Number(t.attributes.target_temp_step ?? 0.5);
    let temp = min + frac * (max - min);
    temp = Math.min(max, Math.max(min, Math.round(temp / step) * step));
    this._dragTemp = Number(temp.toFixed(2));
  }

  static styles = css`
    ha-card {
      padding: 12px 12px 16px;
      color: var(--primary-text-color);
    }
    .header {
      text-align: center;
      padding: 4px 0 0;
    }
    .title {
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .warn {
      padding: 16px;
      color: var(--error-color, #db4437);
    }
    .warn.small {
      padding: 6px 12px;
      font-size: 0.85em;
    }

    /* DIAL */
    .dial-wrap {
      position: relative;
      width: 100%;
      max-width: 260px;
      margin: 0 auto;
      aspect-ratio: 1 / 1;
    }
    .dial {
      width: 100%;
      height: 100%;
      touch-action: none;
      cursor: pointer;
    }
    .dial.off {
      cursor: default;
    }
    .track {
      fill: none;
      stroke: var(--divider-color, #3a3a3a);
      stroke-width: 12;
      stroke-linecap: round;
    }
    .value {
      fill: none;
      stroke: var(--accent);
      stroke-width: 12;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }
    .handle {
      fill: #fff;
      stroke: var(--accent);
      stroke-width: 3;
      cursor: grab;
    }
    .dial-center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2px;
    }
    .preset-name {
      font-size: 0.95rem;
      color: var(--accent);
      font-weight: 600;
    }
    .target {
      font-size: 2.8rem;
      font-weight: 300;
      line-height: 1;
    }
    .target .unit {
      font-size: 1.1rem;
      vertical-align: super;
      margin-left: 2px;
    }
    .current {
      font-size: 0.9rem;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .current ha-icon {
      --mdc-icon-size: 16px;
    }
    .adjust {
      display: flex;
      gap: 24px;
      margin-top: 8px;
    }
    button.round {
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      background: var(--secondary-background-color, #2a2a2a);
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button.round.sm {
      width: 30px;
      height: 30px;
    }
    button.round:disabled {
      opacity: 0.35;
      cursor: default;
    }

    /* SECCION LG */
    .section {
      margin-top: 10px;
      border-top: 1px solid var(--divider-color, #3a3a3a);
      padding-top: 10px;
    }
    .section-title {
      font-size: 0.8rem;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
    }
    .label {
      font-size: 0.9rem;
    }
    .row-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .value-num {
      min-width: 56px;
      text-align: center;
      font-variant-numeric: tabular-nums;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.78rem;
      padding: 2px 8px;
      border-radius: 12px;
      background: var(--secondary-background-color, #2a2a2a);
      color: var(--secondary-text-color);
    }
    .chip ha-icon {
      --mdc-icon-size: 15px;
    }
    .chip.on {
      background: var(--accent);
      color: #fff;
    }

    /* PRESETS */
    .presets {
      display: flex;
      gap: 6px;
      margin-top: 12px;
      flex-wrap: wrap;
    }
    .preset {
      flex: 1 1 0;
      min-width: 56px;
      border: 1px solid var(--divider-color, #3a3a3a);
      border-radius: 10px;
      background: transparent;
      color: var(--primary-text-color);
      padding: 6px 4px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      font-size: 0.72rem;
    }
    .preset ha-icon {
      --mdc-icon-size: 20px;
    }
    .preset.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
    }
    .preset:disabled {
      opacity: 0.35;
      cursor: default;
    }

    /* MODOS */
    .modes {
      display: flex;
      gap: 6px;
      margin-top: 10px;
      background: var(--secondary-background-color, #2a2a2a);
      border-radius: 14px;
      padding: 4px;
    }
    .mode {
      flex: 1;
      border: none;
      background: transparent;
      color: var(--secondary-text-color);
      padding: 8px;
      border-radius: 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mode.active {
      background: var(--accent);
      color: #fff;
    }
  `;
}

// Tipado del registro global usado por HACS / hui-card-picker
declare global {
  interface HTMLElementTagNameMap {
    "aerothermal-temperature-control": AerothermalCard;
  }
}
export type { LovelaceCardConfig };
