# Step 1: Gather Documents

**Time estimate:** 30 minutes

## Overview

Before preparing your return, gather all tax documents. Most documents arrive by January 31.

## Checklist

### Income Documents

- [ ] **W-2** from each employer
- [ ] **1099-INT** for interest income ($10+)
- [ ] **1099-DIV** for dividends ($10+)
- [ ] **1099-B** for investment sales
- [ ] **1099-NEC** for freelance/contract work ($600+)
- [ ] **1099-MISC** for miscellaneous income
- [ ] **1099-G** for unemployment/state refunds
- [ ] **1099-R** for retirement distributions
- [ ] **SSA-1099** for Social Security benefits
- [ ] **1099-K** for payment app transactions
- [ ] **1099-DA** for crypto/digital asset sales (new)
- [ ] **Schedule K-1** for partnerships/S-corps/trusts

### Deduction Documents

- [ ] **Form 1098** for mortgage interest
- [ ] **Property tax statements**
- [ ] **Charitable donation receipts**
- [ ] **Medical expense records**
- [ ] **Form 1098-E** for student loan interest
- [ ] **Form 1098-T** for tuition
- [ ] **State/local tax payment records**
- [ ] **Business expense receipts** (if self-employed)

### Credit Documents

- [ ] **Childcare provider information** (name, address, EIN/SSN, amount paid)
- [ ] **Form 1095-A** for Marketplace insurance
- [ ] **Education expense receipts**
- [ ] **Energy improvement receipts**
- [ ] **EV purchase documents**

### Retirement Documents

- [ ] **Form 5498** for IRA contributions
- [ ] **401(k) statements**
- [ ] **Form 5498-SA** for HSA contributions

### Reference Documents

- [ ] **2024 tax return** (for AGI verification)
- [ ] **Capital loss carryover** documentation

## Organizing Your Documents

Place each document in the appropriate folder:

```
user-documents/
├── income/
│   ├── w2/           ← W-2 forms
│   ├── 1099-int/     ← Interest statements
│   ├── 1099-div/     ← Dividend statements
│   └── ...
├── deductions/
│   ├── mortgage/     ← Form 1098
│   ├── charitable/   ← Donation receipts
│   └── ...
└── ...
```

## Document Tips

### Naming Convention
```
[form-type]_[payer-name]_2025.pdf
```
Examples:
- `w2_acme-corp_2025.pdf`
- `1099-div_fidelity_2025.pdf`

### Missing Documents?

| If missing... | Try... |
|---------------|--------|
| W-2 | Check employer portal; contact HR |
| 1099 | Check online accounts; contact payer |
| 1098 | Check lender portal; contact lender |
| Prior year return | Request transcript from IRS |

### Accepted Formats

- PDF (preferred)
- Images (JPG, PNG)
- CSV/Excel (for transaction data)

## When You're Done

Move to [Step 2: Enter Personal Info](./02-personal-info.md)

Or tell OpenCode:
```
I've gathered my documents and placed them in user-documents/. 
Help me move to step 2.
```

---

## State Reference

### Expert Sub-Agent

**Sub-Agent:** `document-collector`

This sub-agent handles:
- Identifying which documents you need
- Checking document completeness
- Finding missing documents
- Organizing document folders

### IRS Document Deadlines

| Document | Issuer Deadline | Sincerely Due By |
|----------|-----------------|------------------|
| W-2 | January 31 | Mid-February |
| 1099-INT/DIV | January 31 | Mid-February |
| 1099-B | February 15 | Early March |
| 1099-NEC/MISC | January 31 | Mid-February |
| 1099-R | January 31 | Mid-February |
| 1098 (Mortgage) | January 31 | Mid-February |
| 1098-T (Tuition) | January 31 | Mid-February |
| Schedule K-1 | March 15 | April 1 |

### Document Retention Rules

| Document Type | Keep For |
|---------------|----------|
| Tax returns | Permanent |
| W-2s, 1099s | 3 years minimum |
| Receipts for deductions | 3 years minimum |
| Home purchase/sale records | 3 years after sale |
| Investment purchase records | 3 years after sale |
| Property records | Duration of ownership + 3 years |

### IRS Transcript Options

If missing documents, request from IRS:
- **Wage & Income Transcript**: Shows W-2s, 1099s reported to IRS
- **Tax Return Transcript**: Copy of filed return
- **Account Transcript**: Payment history
- Request at: [IRS.gov/Individuals/Get-Transcript](https://www.irs.gov/individuals/get-transcript)
