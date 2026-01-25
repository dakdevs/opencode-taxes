# User Documents

Place your tax documents in the appropriate folders below. OpenCode will read these documents to help prepare your tax return.

## Folder Structure

### 📁 income/
Documents showing money you received during 2025.

| Folder | What to Put Here | You'll Receive From |
|--------|------------------|---------------------|
| `w2/` | W-2 forms | Your employer(s) |
| `1099-int/` | Interest income statements | Banks, credit unions |
| `1099-div/` | Dividend statements | Brokerages, mutual funds |
| `1099-b/` | Stock/investment sales | Brokerages |
| `1099-nec/` | Freelance/contractor income | Clients who paid you $600+ |
| `1099-misc/` | Other miscellaneous income | Various payers |
| `1099-g/` | Government payments | State (tax refunds, unemployment) |
| `1099-r/` | Retirement distributions | IRA/401k custodians, pensions |
| `1099-ssa/` | Social Security benefits | Social Security Administration |
| `1099-k/` | Payment app/card income | PayPal, Venmo, Square, etc. |
| `1099-da/` | Digital asset sales | Crypto exchanges (new for 2025) |
| `k1/` | Partnership/S-corp/trust income | Business entities you own |
| `other/` | Any other income documentation | Various |

### 📁 deductions/
Documents for expenses that may reduce your taxable income.

| Folder | What to Put Here | You'll Receive From |
|--------|------------------|---------------------|
| `mortgage/` | Form 1098 (mortgage interest) | Your mortgage lender |
| `property-tax/` | Property tax statements | County/local government |
| `charitable/` | Donation receipts, acknowledgment letters | Charities |
| `medical/` | Medical expense receipts, EOBs | Healthcare providers, insurance |
| `student-loan/` | Form 1098-E (student loan interest) | Loan servicers |
| `tuition/` | Form 1098-T (tuition paid) | Educational institutions |
| `state-local-tax/` | State/local tax payment records | State tax authority |
| `business-expenses/` | Business expense receipts | Your records (if self-employed) |

### 📁 credits/
Documents for tax credits you may be able to claim.

| Folder | What to Put Here | Notes |
|--------|------------------|-------|
| `childcare/` | Childcare provider info, receipts | Provider's name, address, EIN/SSN |
| `education/` | Education expense documentation | For education credits |
| `energy/` | Energy improvement receipts | Solar, insulation, windows, etc. |
| `ev-purchase/` | Electric vehicle purchase documents | For clean vehicle credit |
| `healthcare/` | Form 1095-A (Marketplace insurance) | If you had Marketplace coverage |

### 📁 retirement/
Documents related to retirement account contributions.

| Folder | What to Put Here | You'll Receive From |
|--------|------------------|---------------------|
| `5498/` | IRA contribution statements | IRA custodian |
| `401k/` | 401k/403b contribution records | Your employer |
| `hsa/` | Form 5498-SA (HSA contributions) | HSA administrator |

### 📁 prior-year/
Reference documents from previous years.

| Folder | What to Put Here | Why It's Needed |
|--------|------------------|-----------------|
| `2024-return/` | Your 2024 tax return | Reference for AGI, carryovers |
| `carryovers/` | Capital loss carryover statements | If you have losses to carry forward |

---

## Document Formats

**Accepted formats:**
- PDF (preferred)
- Images (JPG, PNG)
- CSV/Excel (for transaction data)

**Naming convention (recommended):**
```
[form-type]_[payer-name]_2025.[ext]
```

Examples:
- `w2_acme-corp_2025.pdf`
- `1099-div_fidelity_2025.pdf`
- `1098_chase-mortgage_2025.pdf`

---

## Privacy & Security

⚠️ **IMPORTANT:** These documents contain sensitive personal information.

- **DO NOT** commit this folder to a public repository
- Add `user-documents/` to your `.gitignore`
- Keep your local copy secure
- Delete documents after filing if desired

---

## What If I'm Missing Documents?

| Document | Deadline to Receive | What to Do If Missing |
|----------|--------------------|-----------------------|
| W-2 | January 31 | Contact employer; use last pay stub |
| 1099s | January 31 | Contact payer; check online accounts |
| 1098s | January 31 | Contact lender/institution |
| 1095-A | January 31 | Check Healthcare.gov account |

If you don't receive a document by mid-February, you can:
1. Contact the payer directly
2. Use your own records to report income
3. Request a Wage and Income Transcript from IRS (shows what was reported)

---

## Next Steps

After placing your documents:

1. Fill out `taxpayer-profile.yaml` in the project root
2. Run `opencode` and follow the workflow guides in `/workflow`
3. Review generated forms in `/output`
