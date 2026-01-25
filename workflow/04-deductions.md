# Step 4: Calculate Deductions

**Time estimate:** 20 minutes

## Overview

You'll either take the **standard deduction** or **itemize** your deductions—whichever is greater.

## Standard Deduction (2025)

| Filing Status | Amount |
|--------------|--------|
| Single | $15,750 |
| Married Filing Jointly | $31,500 |
| Married Filing Separately | $15,750 |
| Head of Household | $23,625 |

**Additional amounts:**
- Age 65+: Add $1,600 (MFJ) or $2,000 (Single/HOH)
- Blind: Add $1,600 (MFJ) or $2,000 (Single/HOH)

## Itemized Deductions (Schedule A)

### Medical Expenses
Only the amount exceeding **7.5% of AGI** is deductible.

```
Medical expenses:        $10,000
AGI:                    $80,000
7.5% threshold:          $6,000
Deductible amount:       $4,000
```

### Taxes (SALT)
**Limited to $40,000** ($20,000 MFS)

Includes:
- State income tax OR sales tax (not both)
- Local income tax
- Real estate tax
- Personal property tax

### Interest
- Mortgage interest (on up to $750,000 debt)
- Investment interest (up to investment income)

### Charitable Contributions
- Cash donations (up to 60% of AGI)
- Property donations (up to 30% of AGI)

## New 2025 Deductions (Schedule 1-A)

These are available **regardless** of standard vs. itemized:

| Deduction | Maximum | Income Limit |
|-----------|---------|--------------|
| No tax on tips | $25,000 | $150K ($300K MFJ) |
| No tax on overtime | $12,500 ($25K MFJ) | $150K ($300K MFJ) |
| Car loan interest | $10,000 | $100K ($200K MFJ) |
| Enhanced senior | $6,000 ($12K MFJ) | $75K ($150K MFJ) |

## Comparison Worksheet

OpenCode will calculate:

```
DEDUCTION COMPARISON
─────────────────────────────────────────
ITEMIZED DEDUCTIONS:
  Medical (over 7.5% AGI)      $  X,XXX
  State & local taxes          $ XX,XXX  (capped at $40,000)
  Mortgage interest            $  X,XXX
  Charitable contributions     $  X,XXX
  ─────────────────────────────────────
  Total Itemized               $ XX,XXX

STANDARD DEDUCTION:
  Base amount                  $ XX,XXX
  Additional (age/blind)       $  X,XXX
  ─────────────────────────────────────
  Total Standard               $ XX,XXX

SCHEDULE 1-A DEDUCTIONS:
  (Available with either method)
  Tips deduction               $  X,XXX
  Overtime deduction           $  X,XXX
  Car loan interest            $  X,XXX
  Senior deduction             $  X,XXX
  ─────────────────────────────────────
  Total Schedule 1-A           $  X,XXX

RECOMMENDATION: [Standard/Itemized]
TOTAL DEDUCTIONS:              $ XX,XXX
```

## Ask OpenCode

```
Review my deduction documents and compare standard vs. itemized deductions.
Show me which method results in lower taxes.
```

## Common Questions

**Q: Should I itemize?**
Itemize only if your itemized deductions exceed your standard deduction.

**Q: What about the SALT cap?**
State and local taxes are limited to $40,000 total, even if you paid more.

**Q: Can I deduct mortgage interest on a second home?**
Yes, the $750,000 limit applies to combined debt on main home + second home.

## When You're Done

Move to [Step 5: Claim Credits](./05-credits.md)

Or tell OpenCode:
```
Deductions are complete. Help me identify credits I qualify for.
```

---

## State Reference

### Expert Sub-Agent

**Sub-Agent:** `deduction-analyzer`

This sub-agent handles:
- Comparing standard vs. itemized deductions
- Calculating Schedule A totals
- Applying SALT cap and medical threshold
- Identifying Schedule 1-A deductions

### Standard Deduction Quick Reference (2025)

| Status | Base | Add'l (65+) | Add'l (Blind) |
|--------|------|-------------|---------------|
| Single | $15,750 | +$2,000 | +$2,000 |
| MFJ | $31,500 | +$1,600 each | +$1,600 each |
| MFS | $15,750 | +$1,600 | +$1,600 |
| HOH | $23,625 | +$2,000 | +$2,000 |

### Itemized Deduction Limits

| Deduction | Limit |
|-----------|-------|
| SALT (state/local taxes) | $40,000 ($20,000 MFS) |
| Medical | Only amount > 7.5% of AGI |
| Mortgage interest | On up to $750,000 debt |
| Charitable (cash) | Up to 60% of AGI |
| Charitable (property) | Up to 30% of AGI |

### Schedule 1-A Quick Reference (NEW 2025)

These are available whether you itemize or not:

| Deduction | Max | Income Limit |
|-----------|-----|--------------|
| No Tax on Tips | $25,000 | $150K/$300K MFJ |
| No Tax on Overtime | $12,500/$25K MFJ | $150K/$300K MFJ |
| Car Loan Interest | $10,000 | $100K/$200K MFJ |
| Enhanced Senior | $6,000/$12K MFJ | $75K/$150K MFJ |

### When to Itemize

Itemize if your total exceeds standard deduction. Common scenarios:
- Large mortgage interest + property tax
- High state income tax + property tax (even with SALT cap)
- Significant charitable contributions
- Large medical expenses (usually needs major event)
