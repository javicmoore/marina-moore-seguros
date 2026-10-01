import { ArrowRight } from "lucide-react";
import Button from "../Button/Button.jsx";
import {
  comparisonScenario,
  simulatorHref,
  simulatorTeaserCopy as copy,
} from "../../config/retirementSimulator.js";
import { projectRetirement, formatCurrency } from "../RetirementSimulator/projection.js";
import "./SimulatorTeaser.css";

// Mismos escenarios que la tabla de /ppr, para que las cifras coincidan.
const scenarios = comparisonScenario.startAges.map((startAge) => ({
  startAge,
  total: projectRetirement({
    currentAge: startAge,
    retirementAge: comparisonScenario.retirementAge,
    monthlyContribution: comparisonScenario.monthlyContribution,
    annualRate: comparisonScenario.annualRate,
  }).total,
}));
const maxTotal = Math.max(...scenarios.map((s) => s.total));

const millionsFormatter = new Intl.NumberFormat("es-MX", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const toMillions = (value) => millionsFormatter.format(value / 1_000_000);

// Teaser de Home que invita al simulador de /ppr. No calcula nada en vivo:
// solo muestra el efecto de empezar antes y lleva directo a /ppr#simulador.
function SimulatorTeaser() {
  return (
    <section className="section simulator-teaser" aria-labelledby="simulator-teaser-title">
      <div className="container simulator-teaser__grid">
        <div className="simulator-teaser__copy">
          <span className="eyebrow simulator-teaser__eyebrow">{copy.eyebrow}</span>
          <h2 id="simulator-teaser-title" className="simulator-teaser__title">
            {copy.title}
          </h2>
          <p className="simulator-teaser__text">{copy.text}</p>
        </div>

        <div className="simulator-teaser__visual">
          <p className="simulator-teaser__contribution">
            Con una aportación de
            <strong>{formatCurrency(comparisonScenario.monthlyContribution)} MXN / mes</strong>
          </p>
          <ul className="teaser-chart">
            {scenarios.map((s, index) => (
              <li
                key={s.startAge}
                className={`teaser-chart__col ${index === 0 ? "teaser-chart__col--lead" : ""}`}
              >
                <span className="teaser-chart__value">
                  <span aria-hidden="true">${toMillions(s.total)} M</span>
                  {/* Lectores de pantalla oyen la fila completa en orden. */}
                  <span className="visually-hidden">
                    Empezando a los {s.startAge} años: {toMillions(s.total)} millones de pesos
                    aproximadamente
                  </span>
                </span>
                <span
                  className="teaser-chart__bar"
                  style={{ "--ratio": s.total / maxTotal }}
                  aria-hidden="true"
                />
                <span className="teaser-chart__label" aria-hidden="true">
                  {s.startAge} años
                </span>
              </li>
            ))}
          </ul>
          <p className="simulator-teaser__note">
            Monto aproximado a los {comparisonScenario.retirementAge} años con un rendimiento
            anual estimado de {comparisonScenario.annualRate}%. Proyección ilustrativa, no
            garantizada.
          </p>
        </div>

        <div className="simulator-teaser__action">
          <Button to={simulatorHref} variant="primary" icon={ArrowRight}>
            {copy.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default SimulatorTeaser;
