# AI-Assisted Tax Preparation System

> [!CAUTION]
> **DISCLAIMER: USE AT YOUR OWN RISK**
> 
> This project is an **experimental proof-of-concept** and is provided "as is" without warranty of any kind. By using this software, you acknowledge and agree that:
> 
> - **This is NOT tax advice.** I am not a CPA, tax attorney, or financial advisor.
> - **I accept ZERO liability** for any errors, omissions, inaccuracies, or consequences resulting from use of this software.
> - **You are solely responsible** for the accuracy and legality of your tax return.
> - **AI can make mistakes.** All calculations and recommendations must be independently verified.
> - **Consult a qualified tax professional** for your specific situation.
> - **The IRS holds YOU accountable** for your tax return, not this software or its creator.
> - **Sensitive information may be shared with third parties.** Your tax documents, personal information, and other data you provide may be transmitted to AI model providers (such as Anthropic, OpenAI, or others) when using this software. We have made best efforts to keep highly sensitive details (SSN, bank account numbers) local in `.env` and out of AI processing, but **there is no guarantee** that sensitive information won't be transmitted to third-party services.
> 
> This project is for **educational and experimental purposes only**. If you choose to use any output from this system for actual tax filing, you do so entirely at your own risk.

---

Prepare your 2025 federal tax return with AI assistance using [OpenCode](https://github.com/opencode-ai/opencode).

> **Tax Year**: 2025 (returns filed in 2026)

---

## Prerequisites

### Install OpenCode

OpenCode is an AI-powered coding assistant that runs in your terminal.

**macOS/Linux:**
```bash
curl -fsSL https://opencode.ai/install | bash
```

**Or with Homebrew:**
```bash
brew install opencode-ai/tap/opencode
```

**Or with npm:**
```bash
npm install -g @opencode-ai/cli
```

**Verify installation:**
```bash
opencode --version
```

### Install Bun (for calculation scripts)

The tax calculation scripts require [Bun](https://bun.sh):

```bash
curl -fsSL https://bun.sh/install | bash
```

---

## Quick Start

### 1. Fork & Clone

Fork this repository (keep it **private** for your tax data), then:

```bash
git clone https://github.com/YOUR_USERNAME/opencode-taxes.git
cd opencode-taxes
```

### 2. Set Up Sensitive Data

Copy the environment template:

```bash
cp .env.example .env
```

Edit `.env` with your SSN, bank info, etc. **This file is never read by the AI.**

### 3. Run the Tax Prep Workflow

Start OpenCode in the project directory:

```bash
opencode
```

Then run the tax preparation command:

```
/tax-prep
```

The AI will guide you through everything:
- What documents you need and where to place them
- Collecting your personal information
- Processing your tax documents
- Calculating your tax
- Optimizing for legal deductions and credits
- Generating your final return

### 4. Generate Filing-Ready PDFs

After completing the workflow, generate your final PDF packet:

```bash
bun scripts/generate-pdf-packet.ts
```

This script:
- Reads your `.env` file locally (sensitive data never touches the AI)
- Fills in all IRS form PDFs with your data
- Merges everything into `output/tax-return-packet.pdf`

**Requires pdftk:**
```bash
# macOS
brew install pdftk-java

# Ubuntu/Debian
sudo apt-get install pdftk

# Windows
# Download from https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/
```

---

## How It Works

### Security Model

Your sensitive data is protected:

| Data Type | Where It Lives | Sent to AI? |
|-----------|----------------|-------------|
| SSN, Bank Account | `.env` file | **Never** |
| Name, Address, DOB | `taxpayer-profile.yaml` | Yes |
| Tax Documents | `user-documents/` | Yes (for processing) |

The AI uses **placeholders** like `$TAXPAYER_SSN` in generated documents. You manually replace these with real values from your `.env` file at the end.

### Specialist Agents

The system uses specialized AI agents for different tax areas:

| Agent | Expertise |
|-------|-----------|
| `@document-reader` | Extracts data from PDFs and images |
| `@income-processor` | W-2s, 1099s, K-1s |
| `@deduction-analyzer` | Standard vs itemized analysis |
| `@credit-evaluator` | Credit eligibility and calculations |
| `@tax-calculator` | Tax liability computation |
| `@self-employment-specialist` | Schedule C, SE tax, QBI |
| `@investment-specialist` | Capital gains, Schedule D |
| `@tax-strategist` | Legal tax optimization strategies |
| `@form-generator` | Final form data generation |

### Workflow Phases

1. **Setup** - Verify `.env` exists, documents uploaded
2. **Personal Info** - Name, address, filing status, dependents
3. **Document Processing** - Extract data from all tax documents
4. **Deduction Analysis** - Compare standard vs itemized
5. **Credit Evaluation** - Identify eligible credits
6. **Tax Calculation** - Compute final liability
7. **Validation** - Verify all data accuracy
8. **Tax Optimization** - Research legal strategies to reduce tax burden
9. **Form Generation** - Create filing-ready form data
10. **Summary** - Forms needed, refund/owed, next steps

### Calculation Scripts

Deterministic tax calculations are handled by Bun scripts in `scripts/`:

```bash
bun scripts/tax-brackets.ts 75000 single
bun scripts/standard-deduction.ts married_joint 67
bun scripts/credits.ts ctc 150000 married_joint 2
bun scripts/se-tax.ts 100000 single
bun scripts/capital-gains.ts 200000 50000 single
```

### PDF Generation

The final step converts JSON form data to filled IRS PDFs:

```bash
bun scripts/generate-pdf-packet.ts
```

This reads `.env` locally (your SSN, bank info) and writes directly to PDFs. **The AI never sees this sensitive data.** Output: `output/tax-return-packet.pdf`

---

## Project Structure

```
opencode-taxes/
├── .opencode/
│   ├── command/
│   │   └── tax-prep.md              # Main workflow command
│   └── agent/
│       ├── document-reader.md       # Document extraction
│       ├── income-processor.md      # Income processing
│       ├── deduction-analyzer.md    # Deduction analysis
│       ├── credit-evaluator.md      # Credit evaluation
│       ├── tax-calculator.md        # Tax computation
│       ├── tax-strategist.md        # Optimization strategies
│       ├── self-employment-specialist.md
│       ├── investment-specialist.md
│       ├── validation-checkpoint.md
│       └── form-generator.md
│
├── scripts/                         # Bun scripts
│   ├── generate-pdf-packet.ts       # Fills PDFs with .env data
│   ├── tax-brackets.ts              # Tax calculation
│   ├── standard-deduction.ts
│   ├── capital-gains.ts
│   ├── credits.ts
│   └── se-tax.ts
│
├── .env.example                     # Template for sensitive data
├── .env                             # YOUR sensitive data (git-ignored)
├── taxpayer-profile.yaml            # Your tax information
│
├── irs-pub17/                       # IRS Publication 17 reference
├── irs-forms/
│   ├── blank/                       # Blank IRS forms (PDF)
│   └── instructions/                # Form instructions (PDF)
│
├── user-documents/                  # YOUR tax documents
├── worksheets/                      # Calculation references
├── workflow/                        # Step-by-step guides
└── output/                          # Generated forms
```

---

## Manual Commands

You can invoke specialist agents directly in OpenCode:

```
@document-reader Read the W-2 in user-documents/income/w2/

@deduction-analyzer Should I itemize or take standard deduction?

@credit-evaluator What credits am I eligible for?

@tax-calculator Calculate my tax liability

@tax-strategist Find tax optimization opportunities for my situation
```

---

## What's Included

### IRS Forms (52 PDFs)

**Core**: 1040, 1040-SR, Schedules 1-3, A-E, SE

**Credits**: 8812, 2441, 8863, 8880, 5695, 8936

**Other**: 8949, 4562, 8995, 6251, 8889, 8606, 8959, 8960, 4868

### IRS Publication 17

Complete reference converted to searchable markdown covering:
- Filing requirements
- Income types
- Deductions
- Credits
- Tax computation

---

## Important Dates (Tax Year 2025)

| Date | Event |
|------|-------|
| January 27, 2026 | IRS begins accepting returns |
| April 15, 2026 | Tax return due (or extension) |
| April 15, 2026 | IRA/HSA contribution deadline for 2025 |
| October 15, 2026 | Extended return due |

---

## Security Checklist

- [ ] Keep your fork **private**
- [ ] Never commit `.env` (it's git-ignored)
- [ ] Never commit `taxpayer-profile.yaml` with real data
- [ ] Delete sensitive files when done
- [ ] Review AI-generated content before filing

---

## Document Reference (Optional Pre-Organization)

The `/tax-prep` workflow will guide you through what documents you need and where to place them. However, if you prefer to organize documents in advance, use this reference:

### Income Documents → `user-documents/income/`

| Document | What It Is | Folder |
|----------|-----------|--------|
| **W-2** | Wages from employer | `income/w2/` |
| **1099-INT** | Interest from banks | `income/1099-int/` |
| **1099-DIV** | Dividends from investments | `income/1099-div/` |
| **1099-B** | Stock/crypto sales | `income/1099-b/` |
| **1099-NEC** | Freelance/contractor income | `income/1099-nec/` |
| **1099-MISC** | Miscellaneous income | `income/1099-misc/` |
| **1099-G** | Unemployment, state refund | `income/1099-g/` |
| **1099-R** | Retirement distributions | `income/1099-r/` |
| **1099-K** | Payment apps (PayPal, Venmo) | `income/1099-k/` |
| **SSA-1099** | Social Security benefits | `income/ssa-1099/` |
| **Schedule K-1** | Partnership/S-corp/trust | `income/k1/` |

### Deduction Documents → `user-documents/deductions/`

| Document | What It Is | Folder |
|----------|-----------|--------|
| **1098** | Mortgage interest | `deductions/mortgage/` |
| **1098-E** | Student loan interest | `deductions/student-loan/` |
| **Property tax bill** | Real estate taxes | `deductions/property-tax/` |
| **Charity receipts** | Donations $250+ | `deductions/charitable/` |
| **Medical receipts** | Out-of-pocket medical | `deductions/medical/` |

### Credit Documents → `user-documents/credits/`

| Document | What It Is | Folder |
|----------|-----------|--------|
| **1098-T** | College tuition | `credits/education/` |
| **Childcare receipts** | Daycare, after-school | `credits/childcare/` |
| **1095-A** | Marketplace health insurance | `credits/healthcare/` |
| **EV purchase docs** | Electric vehicle credit | `credits/ev-purchase/` |
| **Energy improvement receipts** | Solar, insulation, etc. | `credits/energy/` |

### Retirement Documents → `user-documents/retirement/`

| Document | What It Is | Folder |
|----------|-----------|--------|
| **5498** | IRA contributions | `retirement/5498/` |
| **5498-SA** | HSA contributions | `retirement/hsa/` |
| **401(k) statement** | Employer retirement | `retirement/401k/` |

### Prior Year → `user-documents/prior-year/`

| Document | Why You Need It |
|----------|----------------|
| **2024 tax return** | AGI for e-file verification, carryover reference |
| **Capital loss carryover** | If you have losses to carry forward |

---

## Disclaimer

This system is for **educational and organizational purposes only**.

- Not tax advice - consult a professional for complex situations
- Verify all calculations against IRS publications
- You are responsible for the accuracy of your return

---

## Resources

- [OpenCode](https://github.com/opencode-ai/opencode)
- [IRS.gov](https://www.irs.gov)
- [Publication 17](https://www.irs.gov/publications/p17)
- [Where's My Refund?](https://www.irs.gov/refunds)
- [IRS Free File](https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free)
