type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household' | 'qualifying_surviving_spouse';

const BASE_2025: Record<FilingStatus, number> = {
  single: 15000,
  married_joint: 30000,
  married_separate: 15000,
  head_of_household: 22500,
  qualifying_surviving_spouse: 30000,
};

const ADDITIONAL_2025: Record<FilingStatus, number> = {
  single: 1950,
  married_joint: 1550,
  married_separate: 1550,
  head_of_household: 1950,
  qualifying_surviving_spouse: 1550,
};

function calculate(filingStatus: FilingStatus, age = 0, isBlind = false) {
  const base = BASE_2025[filingStatus];
  const additional = ADDITIONAL_2025[filingStatus];
  const extras = (age >= 65 ? 1 : 0) + (isBlind ? 1 : 0);

  return { base, additional: additional * extras, total: base + additional * extras };
}

const [status, age, blind] = Bun.argv.slice(2);
if (status) {
  const result = calculate(status as FilingStatus, age ? parseInt(age) : 0, blind === 'true');
  console.log(JSON.stringify(result));
}
