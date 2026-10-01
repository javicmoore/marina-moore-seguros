import { useState } from "react";
import { Info } from "lucide-react";
import SectionHeading from "../SectionHeading/SectionHeading.jsx";
import {
  simulatorDefaults,
  simulatorLimits,
  comparisonScenario,
  simulatorCopy as copy,
  simulatorAnchorId,
} from "../../config/retirementSimulator.js";
import { projectRetirement, formatCurrency, formatNumber, parseNumber, clamp } from "./projection.js";
import "./RetirementSimulator.css";

// Controles del simulador. `chars` dimensiona el campo editable para el valor
// más largo posible; `valueText` es lo que anuncia un lector de pantalla al
// mover el slider.
const fields = [
  {
    key: "currentAge",
    label: "Edad actual",
    suffix: "años",
    chars: 2,
    inputMode: "numeric",
    valueText: (v) => `${v} años`,
  },
  {
    key: "monthlyContribution",
    label: "Aportación mensual",
    prefix: "$",
    suffix: "MXN",
    chars: 6,
    inputMode: "numeric",
    valueText: (v) => `${formatCurrency(v)} al mes`,
  },
  {
    key: "retirementAge",
    label: "Edad de retiro",
    suffix: "años",
    chars: 2,
    inputMode: "numeric",
    valueText: (v) => `${v} años`,
  },
  {
    key: "annualRate",
    label: "Rendimiento anual estimado",
    suffix: "%",
    chars: 3,
    inputMode: "decimal",
    valueText: (v) => `${formatNumber(v)} por ciento`,
  },
];

// Escenarios del comparativo: se calculan una sola vez al cargar el módulo.
const scenarios = comparisonScenario.startAges.map((startAge) => ({
  startAge,
  ...projectRetirement({
    currentAge: startAge,
    retirementAge: comparisonScenario.retirementAge,
    monthlyContribution: comparisonScenario.monthlyContribution,
    annualRate: comparisonScenario.annualRate,
  }),
}));
const maxScenarioTotal = Math.max(...scenarios.map((s) => s.total));
const earliest = scenarios[0];
const latest = scenarios[scenarios.length - 1];

// Slider + campo editable sincronizados. Mientras el campo tiene el foco se
// muestra lo que el usuario escribe (`draft`); cada valor válido se aplica en
// tiempo real y al salir del campo se ajusta al rango permitido.
function SimulatorField({ field, value, onChange }) {
  const { key, label, prefix, suffix, chars, inputMode, valueText } = field;
  const { min, max, step } = simulatorLimits[key];
  const [draft, setDraft] = useState(null);
  const labelId = `sim-${key}-label`;
  const inputId = `sim-${key}-input`;
  const fill = ((clamp(value, min, max) - min) / (max - min)) * 100;

  const handleTyping = (event) => {
    setDraft(event.target.value);
    const parsed = parseNumber(event.target.value);
    if (parsed >= min && parsed <= max) onChange(parsed);
  };

  const handleBlur = () => {
    const parsed = parseNumber(draft);
    if (!Number.isNaN(parsed)) onChange(clamp(parsed, min, max));
    setDraft(null);
  };

  return (
    <div className="sim-field">
      <div className="sim-field__header">
        <label id={labelId} htmlFor={inputId} className="sim-field__label">
          {label}
        </label>
        <div className="sim-field__value" style={{ "--chars": chars }}>
          {prefix && <span aria-hidden="true">{prefix}</span>}
          <input
            id={inputId}
            className="sim-field__input"
            type="text"
            inputMode={inputMode}
            autoComplete="off"
            value={draft ?? formatNumber(value)}
            onFocus={() => setDraft(String(value))}
            onChange={handleTyping}
            onBlur={handleBlur}
            onKeyDown={(event) => event.key === "Enter" && event.currentTarget.blur()}
          />
          {suffix && <span className="sim-field__unit">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        className="sim-field__range"
        aria-labelledby={labelId}
        aria-valuetext={valueText(value)}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{ "--fill": `${fill}%` }}
      />
      <div className="sim-field__scale" aria-hidden="true">
        <span>{prefix ? formatCurrency(min) : formatNumber(min)}</span>
        <span>{prefix ? formatCurrency(max) : formatNumber(max)}</span>
      </div>
    </div>
  );
}

// Barra aportado / crecimiento. La escala la da `scale` (monto que equivale
// al 100 % del ancho) para que varias barras sean comparables entre sí.
function CompositionBar({ contributed, growth, scale = contributed + growth }) {
  return (
    <div className="sim-bar" aria-hidden="true">
      <span
        className="sim-bar__segment sim-bar__segment--contributed"
        style={{ width: `${(contributed / scale) * 100}%` }}
      />
      <span
        className="sim-bar__segment sim-bar__segment--growth"
        style={{ width: `${(growth / scale) * 100}%` }}
      />
    </div>
  );
}

function RetirementSimulator() {
  const [values, setValues] = useState(simulatorDefaults);
  const result = projectRetirement(values);
  const hasHorizon = result.years > 0;
  const amountText = formatCurrency(result.total);

  const updateValue = (key) => (next) => setValues((prev) => ({ ...prev, [key]: next }));

  return (
    // tabIndex -1: ScrollToTop le pasa el foco al llegar por /ppr#simulador.
    <section id={simulatorAnchorId} tabIndex={-1} className="section section--alt retirement-sim">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          className="retirement-sim__heading"
        />

        {/* 1. Simulador ------------------------------------------------- */}
        <div className="retirement-sim__simulator">
          <div className="sim-controls" role="group" aria-labelledby="sim-controls-title">
            <h3 id="sim-controls-title" className="sim-controls__title">
              {copy.controlsTitle}
            </h3>
            <p className="sim-controls__text">{copy.controlsText}</p>
            <div className="sim-controls__fields">
              {fields.map((field) => (
                <SimulatorField
                  key={field.key}
                  field={field}
                  value={values[field.key]}
                  onChange={updateValue(field.key)}
                />
              ))}
            </div>
          </div>

          <div className="sim-results">
            <span className="eyebrow sim-results__eyebrow">Monto proyectado al retiro</span>
            <p className="sim-results__amount" style={{ "--chars": amountText.length }}>
              {amountText}
            </p>
            {hasHorizon ? (
              <>
                <p className="sim-results__caption">
                  MXN a los {values.retirementAge} años, con un rendimiento anual estimado de{" "}
                  {formatNumber(values.annualRate)}%.
                </p>
                <CompositionBar contributed={result.contributed} growth={result.growth} />
              </>
            ) : (
              <p className="sim-results__caption sim-results__caption--notice">
                Elige una edad de retiro mayor a tu edad actual para ver la proyección.
              </p>
            )}
            <dl className="sim-results__stats">
              <div className="sim-stat">
                <dt>
                  <span className="sim-swatch sim-swatch--contributed" aria-hidden="true" />
                  Total aportado
                </dt>
                <dd>{formatCurrency(result.contributed)}</dd>
              </div>
              <div className="sim-stat">
                <dt>
                  <span className="sim-swatch sim-swatch--growth" aria-hidden="true" />
                  Rendimiento generado
                </dt>
                <dd>{formatCurrency(result.growth)}</dd>
              </div>
              <div className="sim-stat">
                <dt>Años de inversión</dt>
                <dd>{result.years}</dd>
              </div>
            </dl>
            {/* Resumen para lectores de pantalla al cambiar cualquier valor. */}
            <p className="visually-hidden" aria-live="polite" aria-atomic="true">
              {hasHorizon
                ? `Monto proyectado al retiro: ${amountText}. Total aportado: ${formatCurrency(result.contributed)}. Rendimiento generado: ${formatCurrency(result.growth)}. ${result.years} años de inversión.`
                : "Elige una edad de retiro mayor a tu edad actual para ver la proyección."}
            </p>
          </div>
        </div>

        {/* 2. Comparativo ----------------------------------------------- */}
        <div className="sim-comparison">
          <div className="sim-comparison__header">
            <h3 className="sim-comparison__title">{copy.comparisonTitle}</h3>
            <p className="sim-comparison__text">{copy.comparisonText}</p>
          </div>

          {/* Gráfica: los mismos datos están en la tabla de abajo, por eso
              se oculta a lectores de pantalla. */}
          <div className="sim-chart" aria-hidden="true">
            <div className="sim-legend">
              <span>
                <span className="sim-swatch sim-swatch--contributed" />
                Total aportado
              </span>
              <span>
                <span className="sim-swatch sim-swatch--growth" />
                Crecimiento estimado
              </span>
            </div>
            {scenarios.map((s) => (
              <div className="sim-chart__row" key={s.startAge}>
                <div className="sim-chart__labels">
                  <span className="sim-chart__label">
                    Desde los {s.startAge} años
                    <span className="sim-chart__years">{s.years} años invirtiendo</span>
                  </span>
                  <span className="sim-chart__value">{formatCurrency(s.total)}</span>
                </div>
                <CompositionBar
                  contributed={s.contributed}
                  growth={s.growth}
                  scale={maxScenarioTotal}
                />
              </div>
            ))}
          </div>

          {/* Los roles explícitos conservan la semántica de tabla en móvil, donde
              las filas se muestran como tarjetas (display: block). */}
          <table className="sim-table" role="table">
            <caption className="visually-hidden">
              Comparativo con {formatCurrency(comparisonScenario.monthlyContribution)} al mes hasta
              los {comparisonScenario.retirementAge} años y rendimiento anual estimado de{" "}
              {comparisonScenario.annualRate}%
            </caption>
            <thead role="rowgroup">
              <tr role="row">
                <th scope="col" role="columnheader">Edad de inicio</th>
                <th scope="col" role="columnheader">Años invirtiendo</th>
                <th scope="col" role="columnheader">Total aportado</th>
                <th scope="col" role="columnheader">Crecimiento estimado</th>
                <th scope="col" role="columnheader">Monto proyectado</th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {scenarios.map((s) => (
                <tr role="row" key={s.startAge}>
                  <th scope="row" role="rowheader">
                    Desde los {s.startAge} años
                  </th>
                  <td role="cell" data-label="Años invirtiendo">{s.years}</td>
                  <td role="cell" data-label="Total aportado">{formatCurrency(s.contributed)}</td>
                  <td role="cell" data-label="Crecimiento estimado">{formatCurrency(s.growth)}</td>
                  <td role="cell" data-label="Monto proyectado" className="sim-table__total">
                    {formatCurrency(s.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3. Mensaje + disclaimer -------------------------------------- */}
        <div className="sim-closing">
          <p className="sim-closing__message">{copy.message}</p>
          <p className="sim-closing__detail">
            Empezar a los {earliest.startAge} en lugar de a los {latest.startAge} representa una
            diferencia estimada de <strong>{formatCurrency(earliest.total - latest.total)}</strong>{" "}
            al retiro.
          </p>
          <p className="sim-closing__disclaimer">
            <Info size={16} strokeWidth={1.8} aria-hidden="true" />
            <span>{copy.disclaimer}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RetirementSimulator;
