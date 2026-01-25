type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household' | 'qualifying_surviving_spouse';

const LTCG_THRESHOLDS_2025: Record<FilingStatus, { zeroMax: number; fifteenMax: number }> = {
  single: { zeroMax: 48350, fifteenMax: 533400 },
  married_joint: { zeroMax: 96700, fifteenMax: 600050 },
  married_separate: { zeroMax: 48350, fifteenMax: 300025 },
  head_of_household: { zeroMax: 64750, fifteenMax: 566700 },
  qualifying_surviving_spouse: { zeroMax: 96700, fifteenMax: 600050 },
};

const NIIT_THRESHOLDS: Record<FilingStatus, number> = {
  single: 200000,
  married_joint: 250000,
  married_separate: 125000,
  head_of_household: 200000,
  qualifying_surviving_spouse: 250000,
};

function calculate(taxableIncome: number, ltcg: number, filingStatus: FilingStatus, magi?: number) {
  const t = LTCG_THRESHOLDS_2025[filingStatus];
  const ordinaryIncome = taxableIncome - ltcg;

  let remaining = ltcg;
  const atZero = Math.min(remaining, Math.max(0, t.zeroMax - ordinaryIncome));
  remaining -= atZero;
  const atFifteen = Math.min(remaining, Math.max(0, t.fifteenMax - Math.max(ordinaryIncome, t.zeroMax)));
  remaining -= atFifteen;
  const atTwenty = remaining;

  const ltcgTax = atFifteen * 0.15 + atTwenty * 0.20;

  const effectiveMagi = magi ?? taxableIncome;
  const niitThreshold = NIIT_THRESHOLDS[filingStatus];
  const niit = effectiveMagi > niitThreshold 
    ? Math.min(ltcg, effectiveMagi - niitThreshold) * 0.038 
    : 0;

  return {
    atZero, atFifteen, atTwenty,
    ltcgTax: Math.round(ltcgTax * 100) / 100,
    niit: Math.round(niit * 100) / 100,
    total: Math.round((ltcgTax + niit) * 100) / 100,
  };
}

const [income, gains, status, magi] = Bun.argv.slice(2);
if (income && gains && status) {
  const result = calculate(
    parseFloat(income.replace(/[$,]/g, '')),
    parseFloat(gains.replace(/[$,]/g, '')),
    status as FilingStatus,
    magi ? parseFloat(magi.replace(/[$,]/g, '')) : undefined
  );
  console.log(JSON.stringify(result));
}
