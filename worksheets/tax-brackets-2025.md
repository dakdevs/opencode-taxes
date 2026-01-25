# 2025 Federal Income Tax Brackets

## Tax Rates by Filing Status

### Single Filers

| Taxable Income | Tax Rate | Tax Calculation |
|----------------|----------|-----------------|
| $0 - $11,925 | 10% | 10% of taxable income |
| $11,926 - $48,475 | 12% | $1,192.50 + 12% of amount over $11,925 |
| $48,476 - $103,350 | 22% | $5,578.50 + 22% of amount over $48,475 |
| $103,351 - $197,300 | 24% | $17,651.00 + 24% of amount over $103,350 |
| $197,301 - $250,525 | 32% | $40,199.00 + 32% of amount over $197,300 |
| $250,526 - $626,350 | 35% | $57,231.00 + 35% of amount over $250,525 |
| Over $626,350 | 37% | $188,769.75 + 37% of amount over $626,350 |

### Married Filing Jointly / Qualifying Surviving Spouse

| Taxable Income | Tax Rate | Tax Calculation |
|----------------|----------|-----------------|
| $0 - $23,850 | 10% | 10% of taxable income |
| $23,851 - $96,950 | 12% | $2,385.00 + 12% of amount over $23,850 |
| $96,951 - $206,700 | 22% | $11,157.00 + 22% of amount over $96,950 |
| $206,701 - $394,600 | 24% | $35,302.00 + 24% of amount over $206,700 |
| $394,601 - $501,050 | 32% | $80,398.00 + 32% of amount over $394,600 |
| $501,051 - $751,600 | 35% | $114,462.00 + 35% of amount over $501,050 |
| Over $751,600 | 37% | $202,154.50 + 37% of amount over $751,600 |

### Married Filing Separately

| Taxable Income | Tax Rate | Tax Calculation |
|----------------|----------|-----------------|
| $0 - $11,925 | 10% | 10% of taxable income |
| $11,926 - $48,475 | 12% | $1,192.50 + 12% of amount over $11,925 |
| $48,476 - $103,350 | 22% | $5,578.50 + 22% of amount over $48,475 |
| $103,351 - $197,300 | 24% | $17,651.00 + 24% of amount over $103,350 |
| $197,301 - $250,525 | 32% | $40,199.00 + 32% of amount over $197,300 |
| $250,526 - $375,800 | 35% | $57,231.00 + 35% of amount over $250,525 |
| Over $375,800 | 37% | $101,077.25 + 37% of amount over $375,800 |

### Head of Household

| Taxable Income | Tax Rate | Tax Calculation |
|----------------|----------|-----------------|
| $0 - $17,000 | 10% | 10% of taxable income |
| $17,001 - $64,850 | 12% | $1,700.00 + 12% of amount over $17,000 |
| $64,851 - $103,350 | 22% | $7,442.00 + 22% of amount over $64,850 |
| $103,351 - $197,300 | 24% | $15,912.00 + 24% of amount over $103,350 |
| $197,301 - $250,500 | 32% | $38,460.00 + 32% of amount over $197,300 |
| $250,501 - $626,350 | 35% | $55,484.00 + 35% of amount over $250,500 |
| Over $626,350 | 37% | $187,031.50 + 37% of amount over $626,350 |

---

## Tax Calculation Formula

```
function calculateTax(taxableIncome, filingStatus) {
  // Get brackets for filing status
  const brackets = BRACKETS[filingStatus];
  
  let tax = 0;
  let remainingIncome = taxableIncome;
  
  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;
    
    const taxableAtRate = Math.min(remainingIncome, bracket.max - bracket.min);
    tax += taxableAtRate * bracket.rate;
    remainingIncome -= taxableAtRate;
  }
  
  return tax;
}
```

## Additional Medicare Tax

If wages exceed threshold, additional 0.9% Medicare tax applies:

| Filing Status | Threshold |
|---------------|-----------|
| Single | $200,000 |
| Married Filing Jointly | $250,000 |
| Married Filing Separately | $125,000 |
| Head of Household | $200,000 |

## Net Investment Income Tax (NIIT)

3.8% tax on lesser of:
- Net investment income, OR
- MAGI exceeding threshold

| Filing Status | MAGI Threshold |
|---------------|----------------|
| Single | $200,000 |
| Married Filing Jointly | $250,000 |
| Married Filing Separately | $125,000 |
| Head of Household | $200,000 |
