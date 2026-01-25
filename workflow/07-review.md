# Step 7: Review Return

**Time estimate:** 20 minutes

## Overview

Before filing, carefully review your return for accuracy. Errors can delay refunds or trigger audits.

## Review Checklist

### Personal Information

- [ ] Names spelled correctly
- [ ] SSNs correct (all 9 digits)
- [ ] Address current and complete
- [ ] Filing status appropriate
- [ ] Dependent information accurate

### Income

- [ ] All W-2s included
- [ ] All 1099s included
- [ ] Interest and dividends reported
- [ ] Capital gains/losses correct
- [ ] Self-employment income complete
- [ ] Digital asset question answered correctly

### Deductions

- [ ] Chose better of standard vs. itemized
- [ ] Schedule 1-A deductions applied if eligible
- [ ] All eligible deductions claimed
- [ ] Documentation available for itemized deductions

### Credits

- [ ] Child Tax Credit calculated correctly
- [ ] Earned Income Credit (if eligible)
- [ ] Education credits claimed
- [ ] All eligible credits applied

### Math

- [ ] Income totals match source documents
- [ ] Deductions calculated correctly
- [ ] Credits don't exceed limits
- [ ] Final refund/balance due makes sense

### Signatures

- [ ] Return will be signed (or e-signed)
- [ ] Spouse signature (if MFJ)

## Common Errors to Avoid

| Error | How to Avoid |
|-------|--------------|
| Wrong SSN | Double-check against SS card |
| Math errors | Let OpenCode calculate |
| Missing income | Check for all 1099s |
| Wrong filing status | Review eligibility rules |
| Missing signatures | Sign before submitting |
| Wrong bank account | Verify routing/account numbers |

## Comparison with Last Year

Compare key figures to 2024:

| Item | 2024 | 2025 | Change |
|------|------|------|--------|
| Total Income | $ | $ | |
| AGI | $ | $ | |
| Taxable Income | $ | $ | |
| Total Tax | $ | $ | |
| Refund/(Owed) | $ | $ | |

Significant changes should have explanations (new job, investment sales, etc.).

## Red Flags to Review

The IRS may scrutinize:
- Large charitable donations relative to income
- High business expenses relative to revenue
- Claiming credits you haven't claimed before
- Significant changes from prior year

Ensure you have documentation for anything unusual.

## Ask OpenCode

```
Generate a final review of my tax return. Check for:
1. Any missing information
2. Math errors
3. Potential issues that might trigger review
4. Comparison with standard scenarios
```

## Amendments

If you discover an error after filing:
- File Form 1040-X (Amended Return)
- You have 3 years to amend
- Can e-file Form 1040-X now

## When You're Done

Move to [Step 8: File Return](./08-file.md)

Or tell OpenCode:
```
Review is complete. Help me prepare the final forms for filing.
```

---

## State Reference

### Expert Sub-Agent

**Sub-Agent:** `validation-checkpoint`

This sub-agent handles:
- Verifying document-to-return accuracy
- Cross-checking calculations
- Identifying missing information
- Flagging potential issues

### IRS Audit Red Flags

| Issue | Risk Level | What to Verify |
|-------|------------|----------------|
| Schedule C with consistent losses | High | Business legitimacy |
| Home office > 20% of expenses | Medium | Exclusive use |
| Charitable > 3% of income | Medium | Documentation |
| Round numbers everywhere | Low | Actual amounts |
| Large cash business | High | Complete reporting |
| EIC with self-employment | High | Income accuracy |

### Math Verification Checklist

```
□ W-2 Box 1 totals = Line 1a wages
□ W-2 Box 2 totals = Line 25a withholding
□ 1099-INT totals = Schedule B / Line 2b
□ 1099-DIV totals = Schedule B / Line 3b
□ AGI = Total income - Adjustments
□ Taxable income = AGI - Deductions - QBI
□ Tax = Calculated from brackets (not flat rate)
□ Credits ≤ Tax liability (for nonrefundable)
□ Refund = Payments - Tax after credits
```

### Year-Over-Year Reasonability

| Change | Normal | Investigate |
|--------|--------|-------------|
| Income | ±20% | > 50% |
| AGI | ±15% | > 40% |
| Deductions | ±10% | > 30% |
| Total tax | ±20% | > 50% |
| Refund/Owed | ±30% | Sign change |

### Common Errors to Catch

1. **Duplicate income** - Same 1099 entered twice
2. **Missing income** - Document in folder but not on return
3. **Wrong filing status** - Single when should be HOH
4. **SALT cap missing** - Full SALT without $40K cap
5. **Medical threshold** - Full medical without 7.5% reduction
6. **Credit limits** - Nonrefundable credit exceeding tax
