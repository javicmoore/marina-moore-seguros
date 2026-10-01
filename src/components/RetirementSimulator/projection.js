// Cálculo del simulador de retiro: interés compuesto con capitalización
// mensual y una aportación fija al final de cada mes, reinvirtiendo los
// rendimientos. Sin inflación ni comisiones: es una proyección ilustrativa.
//
//   monto = aportación × ((1 + i)^n − 1) / i,   i = tasa anual / 12,  n = meses

export function projectRetirement({ currentAge, retirementAge, monthlyContribution, annualRate }) {
  const years = Math.max(0, retirementAge - currentAge);
  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  const projected =
    monthlyRate === 0
      ? monthlyContribution * months
      : monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  // Se redondea a pesos antes de restar para que aportado + rendimiento sume
  // exactamente el monto que se muestra.
  const total = Math.round(projected);
  const contributed = Math.round(monthlyContribution * months);

  return { years, contributed, growth: total - contributed, total };
}

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 1 });

export const formatCurrency = (value) => currencyFormatter.format(value);
export const formatNumber = (value) => numberFormatter.format(value);

// Acepta lo que escribe el usuario ("2,500", "$3000", "7.5") y devuelve un
// número, o NaN si no hay dígitos.
export function parseNumber(raw) {
  const cleaned = String(raw).replace(/[^\d.]/g, "");
  return cleaned === "" ? NaN : Number(cleaned);
}

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
