# Step 5: Claim Credits

**Time estimate:** 15 minutes

## Overview

Tax credits directly reduce your tax liability—much more valuable than deductions.

## Credit Eligibility Check

### Child Tax Credit

**Requirements:**
- Child under 17 at end of 2025
- Child has valid SSN
- You claim child as dependent
- MAGI under $400,000 (MFJ) or $200,000 (other)

**Amount:** $2,000 per qualifying child

### Additional Child Tax Credit (Refundable)

If Child Tax Credit exceeds your tax liability:
- Up to $1,700 per child is refundable
- Based on earned income over $2,500

### Credit for Other Dependents

**For dependents who don't qualify for Child Tax Credit:**
- Age 17 or older
- No valid SSN (has ITIN)
- Qualifying relatives

**Amount:** $500 per dependent

### Earned Income Credit (Refundable)

| Children | Maximum Credit | Income Limit (Single) |
|----------|---------------|----------------------|
| 3+ | $7,830 | $59,899 |
| 2 | $6,960 | $55,768 |
| 1 | $4,213 | $49,084 |
| 0 | $632 | $18,591 |

*Add ~$6,900 to limits for MFJ*

### Child and Dependent Care Credit

**If you paid for childcare to work:**
- Up to $3,000 expenses (1 child) or $6,000 (2+ children)
- Credit is 20-35% of expenses based on income

### Education Credits

**American Opportunity Credit:**
- Up to $2,500 per student
- First 4 years of college
- 40% refundable ($1,000)

**Lifetime Learning Credit:**
- Up to $2,000 per return
- Any year, any course

### Saver's Credit

**For retirement contributions:**
- Up to 50% of first $2,000 contributed
- Income limits apply (max credit $1,000)

### Energy Credits

**Residential Clean Energy (solar, etc.):** 30% of cost
**Home Improvements (insulation, etc.):** 30%, up to $3,200/year

### Clean Vehicle Credit

**New EV:** Up to $7,500
**Used EV:** Up to $4,000

### Premium Tax Credit

If you had Marketplace health insurance:
- Reconcile advance payments
- May get additional credit or owe repayment

## Credits Summary

OpenCode will calculate:

```
CREDITS SUMMARY
─────────────────────────────────────────
NONREFUNDABLE CREDITS:
  Child Tax Credit                $ X,XXX
  Credit for Other Dependents     $   XXX
  Child Care Credit               $   XXX
  Lifetime Learning Credit        $   XXX
  Saver's Credit                  $   XXX
  Energy Credits                  $ X,XXX
  ─────────────────────────────────────
  Total Nonrefundable             $ X,XXX

REFUNDABLE CREDITS:
  Additional Child Tax Credit     $ X,XXX
  Earned Income Credit            $ X,XXX
  American Opportunity (40%)      $   XXX
  Premium Tax Credit              $ X,XXX
  ─────────────────────────────────────
  Total Refundable                $ X,XXX

TOTAL CREDITS:                    $ X,XXX
```

## Ask OpenCode

```
Based on my profile and income, what tax credits do I qualify for?
Calculate the amounts for each credit.
```

## When You're Done

Move to [Step 6: Calculate Tax](./06-calculate-tax.md)

Or tell OpenCode:
```
Credits are identified. Calculate my final tax liability.
```

---

## State Reference

### Expert Sub-Agent

**Sub-Agent:** `credit-evaluator`

This sub-agent handles:
- Determining credit eligibility
- Calculating credit amounts
- Checking income phase-outs
- Identifying required forms

### Credit Quick Reference

| Credit | Max Amount | Refundable? | Form |
|--------|------------|-------------|------|
| Child Tax Credit | $2,000/child | Partial ($1,700) | 8812 |
| Other Dependents | $500/dependent | No | 8812 |
| Earned Income | $632-$7,830 | Yes | Sch EIC |
| Child Care | $600-$2,100 | No | 2441 |
| AOTC (education) | $2,500/student | 40% ($1,000) | 8863 |
| Lifetime Learning | $2,000/return | No | 8863 |
| Saver's Credit | Up to $1,000 | No | 8880 |
| Clean Vehicle | $7,500 new/$4,000 used | No | 8936 |
| Residential Energy | 30% of cost | No | 5695 |

### Child Tax Credit Requirements

ALL must be true:
1. Child under 17 on Dec 31, 2025
2. Child has valid SSN (not ITIN)
3. You claim child as dependent
4. Child is U.S. citizen/national/resident
5. MAGI under $200K (Single) or $400K (MFJ)

### EIC Requirements

Must meet ALL:
1. Have earned income
2. Investment income ≤ $11,600
3. Not filing MFS
4. Valid SSN for you (and spouse if MFJ)
5. Not qualifying child of another person
6. Age 25-64 if no qualifying children

### Credit vs. Deduction Impact

**$1,000 Credit** = $1,000 less tax (dollar-for-dollar)
**$1,000 Deduction** = $220-$370 less tax (depends on bracket)

Credits are much more valuable than deductions!
