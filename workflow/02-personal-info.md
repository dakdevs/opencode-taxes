# Step 2: Enter Personal Information

**Time estimate:** 15 minutes

## Overview

Fill out `taxpayer-profile.yaml` with your personal information. This file is the foundation for your tax return.

## Open the File

Edit the file at the root of the project:
```
taxpayer-profile.yaml
```

## Required Information

### Filing Status

Choose one:
- `single` - Unmarried, or divorced/separated
- `married_joint` - Married, filing together
- `married_separate` - Married, filing separately
- `head_of_household` - Unmarried with qualifying dependent
- `qualifying_surviving_spouse` - Spouse died in 2023 or 2024

### Primary Taxpayer

```yaml
taxpayer:
  first_name: "John"
  middle_initial: "A"
  last_name: "Smith"
  ssn: "123-45-6789"
  date_of_birth: "1985-03-15"
  occupation: "Software Engineer"
  phone: "555-123-4567"
  email: "john@example.com"
```

### Spouse (if applicable)

Fill out the spouse section if:
- Filing status is `married_joint`, OR
- Filing status is `married_separate`

### Address

```yaml
address:
  street: "123 Main Street"
  apartment: "Apt 4B"  # Leave blank if none
  city: "San Francisco"
  state: "CA"
  zip: "94102"
```

### Dependents

Add each dependent:
```yaml
dependents:
  - first_name: "Jane"
    last_name: "Smith"
    ssn: "987-65-4321"
    relationship: "daughter"
    date_of_birth: "2015-06-20"
    months_lived_with_you: 12
    qualifies_for_ctc: true
```

### Bank Information (for refund)

```yaml
bank_info:
  routing_number: "021000021"
  account_number: "123456789"
  account_type: "checking"
```

### Prior Year Information

From your 2024 tax return:
```yaml
prior_year:
  agi_2024: 75000
  total_tax_2024: 8500
  itemized_2024: false
```

## Validation Checklist

- [ ] Filing status selected
- [ ] Primary taxpayer SSN correct (9 digits)
- [ ] Date of birth in YYYY-MM-DD format
- [ ] Address complete with 2-letter state code
- [ ] Each dependent has SSN and relationship
- [ ] Bank routing number is 9 digits
- [ ] Prior year AGI entered

## Common Questions

**Q: What's my 2024 AGI?**
Look at your 2024 Form 1040, Line 11.

**Q: What if I don't know my spouse's info?**
You'll need it for married filing jointly. Check their W-2 or last year's return.

**Q: Do I need bank info?**
Only for direct deposit refund. Otherwise, you'll get a paper check.

## Privacy Reminder

⚠️ This file contains sensitive information. Do NOT commit to a public repo.

## When You're Done

Move to [Step 3: Process Income](./03-income.md)

Or tell OpenCode:
```
I've filled out taxpayer-profile.yaml. Help me process my income documents.
```

---

## State Reference

### Expert Sub-Agent

**Sub-Agent:** `profile-validator`

This sub-agent handles:
- Determining optimal filing status
- Verifying dependent eligibility
- Validating profile completeness
- Checking field formats

### Filing Status Decision Tree

```
Married on Dec 31? 
  YES → File jointly? 
         YES → MARRIED FILING JOINTLY
         NO  → MARRIED FILING SEPARATELY
  NO  → Spouse died in 2023/2024 with dependent child?
         YES → QUALIFYING SURVIVING SPOUSE
         NO  → Have dependent + paid >50% home costs?
                YES → HEAD OF HOUSEHOLD  
                NO  → SINGLE
```

### Dependent Tests (Qualifying Child)

ALL must be true:
1. **Relationship**: Child, stepchild, foster, sibling, or their descendant
2. **Age**: Under 19, OR under 24 if full-time student, OR any age if disabled
3. **Residency**: Lived with you > 6 months
4. **Support**: Child didn't provide > 50% of own support
5. **Joint Return**: Child didn't file joint return (except to claim refund)

### Head of Household Requirements

Must meet ALL:
1. Unmarried (or "considered unmarried") on Dec 31
2. Paid > 50% of home upkeep costs
3. Qualifying person lived with you > half the year

**"Considered Unmarried" if:**
- Lived apart from spouse last 6 months of year
- Paid > 50% of home costs
- Home was main home of your child for > half year
- You can claim child as dependent

### SSN vs ITIN

| Identifier | Who Gets It | Credit Eligibility |
|------------|-------------|-------------------|
| SSN | U.S. citizens, permanent residents, work-authorized aliens | CTC, EIC, ACTC |
| ITIN | Others needing to file taxes | Credit for Other Dependents only |

Children need SSN (not ITIN) for Child Tax Credit.
