const SS_WAGE_BASE_2025 = 176100;
const SS_RATE = 0.124;
const MEDICARE_RATE = 0.029;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
const ADDITIONAL_MEDICARE_THRESHOLD_MFJ = 250000;

type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household' | 'qualifying_surviving_spouse';

function calculate(netProfit: number, filingStatus: FilingStatus, wagesSubjectToSS = 0) {
  if (netProfit < 400) return { seBase: 0, ssTax: 0, medicareTax: 0, additionalMedicare: 0, totalSETax: 0, seDeduction: 0 };

  const seBase = netProfit * 0.9235;
  
  const ssWageRoom = Math.max(0, SS_WAGE_BASE_2025 - wagesSubjectToSS);
  const ssBase = Math.min(seBase, ssWageRoom);
  const ssTax = ssBase * SS_RATE;
  
  const medicareTax = seBase * MEDICARE_RATE;
  
  const threshold = filingStatus === 'married_joint' || filingStatus === 'qualifying_surviving_spouse'
    ? ADDITIONAL_MEDICARE_THRESHOLD_MFJ
    : ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;
  const additionalMedicareBase = Math.max(0, seBase - threshold);
  const additionalMedicare = additionalMedicareBase * ADDITIONAL_MEDICARE_RATE;
  
  const totalSETax = ssTax + medicareTax + additionalMedicare;
  const seDeduction = totalSETax * 0.5;

  return {
    seBase: Math.round(seBase * 100) / 100,
    ssTax: Math.round(ssTax * 100) / 100,
    medicareTax: Math.round(medicareTax * 100) / 100,
    additionalMedicare: Math.round(additionalMedicare * 100) / 100,
    totalSETax: Math.round(totalSETax * 100) / 100,
    seDeduction: Math.round(seDeduction * 100) / 100,
  };
}

const [profit, status, wages] = Bun.argv.slice(2);
if (profit && status) {
  const result = calculate(
    parseFloat(profit.replace(/[$,]/g, '')),
    status as FilingStatus,
    wages ? parseFloat(wages.replace(/[$,]/g, '')) : 0
  );
  console.log(JSON.stringify(result));
}
