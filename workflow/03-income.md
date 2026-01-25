# Step 3: Process Income

**Time estimate:** 30 minutes

## Overview

OpenCode will extract income information from your documents and calculate your total income.

## Income Categories

### Wages and Salaries (W-2)

From your W-2 forms, we need:
- Box 1: Wages, tips, other compensation
- Box 2: Federal income tax withheld
- Box 12: Retirement contributions, HSA, etc.
- Box 17: State income tax withheld

**Tell OpenCode:**
```
Read my W-2s in user-documents/income/w2/ and extract the income information.
```

### Interest Income (1099-INT)

From Form 1099-INT:
- Box 1: Interest income
- Box 3: Interest on U.S. Savings Bonds
- Box 8: Tax-exempt interest

### Dividend Income (1099-DIV)

From Form 1099-DIV:
- Box 1a: Total ordinary dividends
- Box 1b: Qualified dividends (lower tax rate)
- Box 2a: Capital gain distributions

### Investment Sales (1099-B)

From Form 1099-B:
- Proceeds (sale price)
- Cost basis (purchase price)
- Date acquired and sold
- Short-term vs. long-term

### Self-Employment Income (1099-NEC)

From Form 1099-NEC:
- Box 1: Nonemployee compensation

This income goes on Schedule C and is subject to self-employment tax.

### Other Income

- **1099-G:** Unemployment, state refunds
- **1099-R:** Retirement distributions
- **SSA-1099:** Social Security benefits
- **1099-K:** Payment app income
- **1099-DA:** Crypto/digital assets
- **K-1:** Partnership/S-corp income

## Income Summary

After processing, you'll have:

```
INCOME SUMMARY
─────────────────────────────────
Wages (W-2)                 $ XX,XXX
Interest income             $    XXX
Dividend income             $  X,XXX
Capital gains/losses        $  X,XXX
Self-employment income      $ XX,XXX
Other income                $  X,XXX
─────────────────────────────────
TOTAL INCOME                $XXX,XXX

Federal tax withheld        $ XX,XXX
```

## Special Situations

### Multiple Jobs
All W-2s are combined for total wages.

### Investment Losses
Capital losses can offset gains. Excess losses (up to $3,000) offset ordinary income.

### Self-Employment
If you have 1099-NEC income:
- Report on Schedule C
- Deduct business expenses
- Pay self-employment tax (15.3%)

### Social Security
Benefits may be 0%, 50%, or 85% taxable depending on your total income.

### Digital Assets
Answer "Yes" to the digital asset question if you sold crypto.

## Ask OpenCode

```
Process all my income documents and show me a summary of:
1. Total income by category
2. Total federal tax withheld
3. Any capital gains or losses
```

## When You're Done

Move to [Step 4: Calculate Deductions](./04-deductions.md)

Or tell OpenCode:
```
Income is complete. Help me with deductions.
```

---

## State Reference

### Expert Sub-Agent

**Sub-Agent:** `income-processor`

This sub-agent handles:
- Extracting data from income documents
- Categorizing income types
- Calculating totals
- Identifying required schedules

### Income Type to Form 1040 Line

| Income Type | Form 1040 Line | Source Document |
|-------------|----------------|-----------------|
| Wages | 1a | W-2 Box 1 |
| Tax-exempt interest | 2a | 1099-INT Box 8 |
| Taxable interest | 2b | 1099-INT Box 1 |
| Qualified dividends | 3a | 1099-DIV Box 1b |
| Ordinary dividends | 3b | 1099-DIV Box 1a |
| IRA distributions | 4a/4b | 1099-R |
| Pensions/annuities | 5a/5b | 1099-R |
| Social Security | 6a/6b | SSA-1099 |
| Capital gains | 7 | Schedule D |
| Other income | 8 | Schedule 1 |

### Special Income Rules

**Social Security Taxability:**
- 0%, 50%, or 85% taxable based on "combined income"
- Combined = AGI + tax-exempt interest + 50% of SS benefits

**Digital Assets:**
- Must answer "Yes" to digital asset question if you sold/exchanged/received crypto
- Report on Form 8949 like capital assets
- Every crypto-to-crypto trade is taxable event

**Wash Sales:**
- Loss disallowed if buy same/similar security within 30 days
- Disallowed loss added to cost basis of new shares
- Reported on 1099-B

### Self-Employment Triggers

If self-employed (1099-NEC, side business, freelance):
- Schedule C (profit/loss)
- Schedule SE (self-employment tax)
- Form 1040-ES (estimated payments may be needed)
- Net SE income $400+ triggers SE tax
