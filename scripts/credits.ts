type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household' | 'qualifying_surviving_spouse';

const CTC_PHASEOUT: Record<FilingStatus, number> = {
  single: 200000,
  married_joint: 400000,
  married_separate: 200000,
  head_of_household: 200000,
  qualifying_surviving_spouse: 400000,
};

const EIC_2025: Record<number, { maxCredit: number; singleLimit: number; mfjLimit: number }> = {
  0: { maxCredit: 632, singleLimit: 18591, mfjLimit: 25511 },
  1: { maxCredit: 4213, singleLimit: 49084, mfjLimit: 56004 },
  2: { maxCredit: 6960, singleLimit: 55768, mfjLimit: 62688 },
  3: { maxCredit: 7830, singleLimit: 59899, mfjLimit: 66819 },
};

const EDUCATION_PHASEOUT = {
  aotc: { single: { start: 80000, end: 90000 }, mfj: { start: 160000, end: 180000 } },
  llc: { single: { start: 80000, end: 90000 }, mfj: { start: 160000, end: 180000 } },
};

const SAVER_CREDIT_2025: Record<FilingStatus, { fifty: number; twenty: number; ten: number }> = {
  single: { fifty: 23000, twenty: 25000, ten: 38250 },
  married_joint: { fifty: 46000, twenty: 50000, ten: 76500 },
  married_separate: { fifty: 23000, twenty: 25000, ten: 38250 },
  head_of_household: { fifty: 34500, twenty: 37500, ten: 57375 },
  qualifying_surviving_spouse: { fifty: 46000, twenty: 50000, ten: 76500 },
};

function childTaxCredit(agi: number, filingStatus: FilingStatus, qualifyingChildren: number) {
  const threshold = CTC_PHASEOUT[filingStatus];
  const maxCredit = qualifyingChildren * 2000;
  const reduction = Math.max(0, Math.floor((agi - threshold) / 1000)) * 50;
  const credit = Math.max(0, maxCredit - reduction);
  const refundable = Math.min(credit, qualifyingChildren * 1700);
  return { credit, refundable, nonrefundable: credit - refundable };
}

function eic(agi: number, filingStatus: FilingStatus, qualifyingChildren: number, earnedIncome: number) {
  const children = Math.min(qualifyingChildren, 3);
  const limits = EIC_2025[children];
  const isMfj = filingStatus === 'married_joint';
  const limit = isMfj ? limits.mfjLimit : limits.singleLimit;
  
  if (agi > limit || earnedIncome > limit || filingStatus === 'married_separate') return 0;
  return limits.maxCredit;
}

function educationCredit(agi: number, filingStatus: FilingStatus, type: 'aotc' | 'llc', expenses: number) {
  const isMfj = filingStatus === 'married_joint';
  const phaseout = EDUCATION_PHASEOUT[type][isMfj ? 'mfj' : 'single'];
  
  if (agi >= phaseout.end) return { credit: 0, refundable: 0 };
  
  let maxCredit = type === 'aotc' 
    ? Math.min(2500, expenses * 1 + Math.max(0, expenses - 2000) * 0.25)
    : Math.min(2000, expenses * 0.20);

  if (agi > phaseout.start) {
    const reduction = (agi - phaseout.start) / (phaseout.end - phaseout.start);
    maxCredit = maxCredit * (1 - reduction);
  }

  const credit = Math.round(maxCredit * 100) / 100;
  const refundable = type === 'aotc' ? Math.round(credit * 0.4 * 100) / 100 : 0;
  return { credit, refundable };
}

function saverCredit(agi: number, filingStatus: FilingStatus, contributions: number) {
  const limits = SAVER_CREDIT_2025[filingStatus];
  const eligible = Math.min(contributions, 2000);
  
  let rate = 0;
  if (agi <= limits.fifty) rate = 0.50;
  else if (agi <= limits.twenty) rate = 0.20;
  else if (agi <= limits.ten) rate = 0.10;
  
  return Math.round(eligible * rate * 100) / 100;
}

const [cmd, ...args] = Bun.argv.slice(2);
if (cmd === 'ctc') {
  const [agi, status, children] = args;
  console.log(JSON.stringify(childTaxCredit(parseFloat(agi), status as FilingStatus, parseInt(children))));
} else if (cmd === 'eic') {
  const [agi, status, children, earned] = args;
  console.log(JSON.stringify({ credit: eic(parseFloat(agi), status as FilingStatus, parseInt(children), parseFloat(earned)) }));
} else if (cmd === 'education') {
  const [agi, status, type, expenses] = args;
  console.log(JSON.stringify(educationCredit(parseFloat(agi), status as FilingStatus, type as 'aotc' | 'llc', parseFloat(expenses))));
} else if (cmd === 'saver') {
  const [agi, status, contributions] = args;
  console.log(JSON.stringify({ credit: saverCredit(parseFloat(agi), status as FilingStatus, parseFloat(contributions)) }));
}
