# Step 6: Calculate Tax

**Time estimate:** 10 minutes

## Overview

Now we calculate your final tax liability, considering all income, deductions, and credits.

## Tax Calculation Flow

```
Gross Income
  - Adjustments (IRA, student loan interest, etc.)
────────────────────────────────────────────────
= Adjusted Gross Income (AGI)
  - Standard or Itemized Deduction
  - Schedule 1-A Deductions (tips, overtime, etc.)
────────────────────────────────────────────────
= Taxable Income
  × Tax Rate (from tax tables/schedules)
────────────────────────────────────────────────
= Regular Tax
  + Other Taxes (SE tax, AMT, NIIT, etc.)
────────────────────────────────────────────────
= Total Tax Before Credits
  - Nonrefundable Credits
────────────────────────────────────────────────
= Tax After Nonrefundable Credits
  - Refundable Credits
  - Tax Withheld
  - Estimated Payments
────────────────────────────────────────────────
= REFUND or AMOUNT OWED
```

## 2025 Tax Brackets

### Single

| Taxable Income | Rate |
|---------------|------|
| $0 - $11,950 | 10% |
| $11,951 - $48,475 | 12% |
| $48,476 - $103,350 | 22% |
| $103,351 - $197,300 | 24% |
| $197,301 - $250,525 | 32% |
| $250,526 - $626,350 | 35% |
| Over $626,350 | 37% |

### Married Filing Jointly

| Taxable Income | Rate |
|---------------|------|
| $0 - $23,900 | 10% |
| $23,901 - $96,950 | 12% |
| $96,951 - $206,700 | 22% |
| $206,701 - $394,600 | 24% |
| $394,601 - $501,050 | 32% |
| $501,051 - $751,600 | 35% |
| Over $751,600 | 37% |

## Additional Taxes

### Self-Employment Tax
- 15.3% on net self-employment income
- Social Security portion limited to $176,100

### Net Investment Income Tax
- 3.8% on investment income if MAGI over $200,000 (Single) or $250,000 (MFJ)

### Additional Medicare Tax
- 0.9% on wages/SE income over $200,000 (Single) or $250,000 (MFJ)

### Alternative Minimum Tax (AMT)
- Parallel tax calculation
- 26% or 28% on AMTI over exemption

## Tax Summary

OpenCode will produce:

```
TAX CALCULATION SUMMARY
═══════════════════════════════════════════════════
INCOME
  Wages                                    $ XX,XXX
  Interest                                 $    XXX
  Dividends                                $  X,XXX
  Capital gains                            $  X,XXX
  Other income                             $  X,XXX
                                          ─────────
  Total Income                             $XXX,XXX
  Adjustments                              $ (X,XXX)
                                          ─────────
  Adjusted Gross Income (AGI)              $ XX,XXX

DEDUCTIONS
  [Standard/Itemized] Deduction            $ XX,XXX
  Schedule 1-A Deductions                  $  X,XXX
                                          ─────────
  Total Deductions                         $ XX,XXX

TAXABLE INCOME                             $ XX,XXX

TAX CALCULATION
  Tax (from brackets)                      $ XX,XXX
  Self-employment tax                      $  X,XXX
  Additional Medicare tax                  $    XXX
  Net investment income tax                $    XXX
                                          ─────────
  Total Tax                                $ XX,XXX

CREDITS
  Nonrefundable credits                    $ (X,XXX)
  Tax after credits                        $ XX,XXX

PAYMENTS
  Federal tax withheld                     $ XX,XXX
  Estimated tax payments                   $  X,XXX
  Refundable credits                       $  X,XXX
                                          ─────────
  Total Payments                           $ XX,XXX

═══════════════════════════════════════════════════
REFUND / (AMOUNT OWED)                     $  X,XXX
═══════════════════════════════════════════════════
```

## Ask OpenCode

```
Calculate my complete tax liability and show me if I'm getting a refund 
or if I owe. Include all additional taxes and credits.
```

## When You're Done

Move to [Step 7: Review Return](./07-review.md)

Or tell OpenCode:
```
Show me a complete summary of my tax return for review.
```

---

## State Reference

### Expert Sub-Agent

**Sub-Agent:** `tax-calculator`

This sub-agent handles:
- Calculating tax from brackets
- Computing additional taxes (SE, NIIT, Medicare)
- Applying credits correctly
- Determining refund or amount owed

### Tax Calculation Scripts

```bash
# Federal income tax
bun scripts/tax-brackets.ts <taxable_income> <filing_status>

# Self-employment tax  
bun scripts/se-tax.ts <net_profit> <filing_status>

# Capital gains tax
bun scripts/capital-gains.ts <taxable_income> <ltcg> <filing_status>

# Credits
bun scripts/credits.ts <credit_type> <agi> <filing_status> [additional_params]
```

### Additional Tax Thresholds

| Tax | Single | MFJ | Rate |
|-----|--------|-----|------|
| Additional Medicare | $200,000 | $250,000 | 0.9% |
| Net Investment Income | $200,000 | $250,000 | 3.8% |
| AMT Exemption | $88,100 | $137,000 | 26%/28% |

### Credit Application Order

1. Foreign Tax Credit
2. Child Tax Credit
3. Credit for Other Dependents
4. Education Credits
5. Retirement Savings Credit
6. Child Care Credit
7. Energy Credits
8. *Then* refundable credits (ACTC, EIC, AOTC 40%)

### Quick Tax Estimate

For rough estimate, use effective rates:

| Taxable Income (Single) | Approximate Effective Rate |
|-------------------------|---------------------------|
| $25,000 | ~10% |
| $50,000 | ~12% |
| $75,000 | ~15% |
| $100,000 | ~17% |
| $150,000 | ~20% |
| $200,000 | ~23% |

Note: These are approximations. Use scripts for accurate calculation.
