// =============================================================================
// retirementSimulator.js
// -----------------------------------------------------------------------------
// Valores base, límites y textos del simulador ilustrativo de la página /ppr.
// Es el único archivo que hay que tocar para cambiar la aportación de
// ejemplo, la tasa estimada, los escenarios del comparativo o el disclaimer.
// La fórmula vive en components/RetirementSimulator/projection.js.
// =============================================================================

// Ancla de la sección en /ppr. El teaser de Home enlaza a simulatorHref para
// aterrizar directo en el simulador.
export const simulatorAnchorId = "simulador";
export const simulatorHref = `/ppr#${simulatorAnchorId}`;

// Valores con los que arranca el simulador. La tasa es anual y en porcentaje.
export const simulatorDefaults = {
  currentAge: 30,
  monthlyContribution: 2000,
  retirementAge: 65,
  annualRate: 7,
};

// Rango y paso de cada control (slider + campo editable).
export const simulatorLimits = {
  currentAge: { min: 18, max: 70, step: 1 },
  monthlyContribution: { min: 500, max: 50000, step: 100 },
  retirementAge: { min: 50, max: 75, step: 1 },
  annualRate: { min: 1, max: 12, step: 0.5 },
};

// Tabla comparativa: misma aportación, distinta edad de inicio. Los montos se
// calculan con la misma fórmula que el simulador, así siempre coinciden.
export const comparisonScenario = {
  monthlyContribution: 2000,
  annualRate: 7,
  retirementAge: 65,
  startAges: [25, 35, 45],
};

export const simulatorCopy = {
  eyebrow: "Proyección ilustrativa",
  title: "¿Qué tanto pueden crecer $2,000 al mes para tus vacaciones más largas?",
  description:
    "Con solo $2,000 mensuales, empieza a construir el retiro que te mereces y descubre el poder de empezar hoy.",
  controlsTitle: "Haz tu propia proyección",
  controlsText: "Ajusta los valores y observa cómo cambia el resultado.",
  comparisonTitle: "Empezar hoy hace la diferencia",
  comparisonText:
    "La misma aportación de $2,000 al mes hasta los 65 años, empezando a distintas edades.",
  message: "Empezar antes puede marcar una diferencia de millones.",
  disclaimer:
    "Esta simulación es ilustrativa y no representa una garantía de rendimiento. Los resultados pueden variar según el producto contratado, el plazo, las condiciones del mercado y el perfil del cliente.",
};

// Teaser de Home: invita al simulador. Las cifras se calculan con
// comparisonScenario, así que siempre coinciden con la tabla de /ppr.
export const simulatorTeaserCopy = {
  eyebrow: "Herramienta interactiva",
  title: "¿Qué pueden hacer $2,000 al mes por tu retiro?",
  text: "Descubre cómo el tiempo puede multiplicar una aportación constante.",
  cta: "Simula tu retiro",
};
