# PROJECT KNOWLEDGE BASE

**Generated:** 2026-01-05
**Branch:** 2025-tax-year

## OVERVIEW

AI-assisted 2025 federal tax preparation system using OpenCode. Bun/TypeScript calculation scripts + PDF generation + IRS reference docs.

## STRUCTURE

```
taxes/
├── .opencode/           # OpenCode agents + commands (AI workflow)
│   ├── agent/           # 15 specialist agents (@income-processor, etc.)
│   └── command/         # /tax-prep workflow command
├── scripts/             # Bun CLI calculation tools (see scripts/AGENTS.md)
├── irs-forms/           # 52 IRS PDFs (blank/ + instructions/)
├── irs-pub17/           # IRS Publication 17 as searchable markdown
├── user-documents/      # User tax document uploads (income/, deductions/, credits/)
├── worksheets/          # Tax calculation reference tables
├── workflow/            # 8-step tax prep guides (01-gather → 08-file)
├── output/              # Generated form data + final PDF
├── taxpayer-profile.yaml  # Central data schema
└── .env                 # Sensitive data (SSN, bank) - NEVER committed
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Start tax prep | Run `/tax-prep` in OpenCode | Orchestrates entire workflow |
| Calculate tax | `scripts/tax-brackets.ts` | `bun scripts/tax-brackets.ts 75000 single` |
| Generate final PDF | `scripts/generate-pdf-packet.ts` | Requires pdftk installed |
| Tax rules reference | `irs-pub17/` | Searchable markdown chapters |
| Form instructions | `irs-forms/instructions/` | PDF per form |
| User data | `taxpayer-profile.yaml` | YAML with $ENV placeholders |
| Workflow guides | `workflow/0X-*.md` | Step-by-step for each phase |

## CONVENTIONS

### Security Model (CRITICAL)
- **Sensitive data** (SSN, bank): ONLY in `.env`, NEVER in AI context
- **Placeholders**: `$TAXPAYER_SSN`, `$BANK_ROUTING_NUMBER` in profile/forms
- **Resolution**: `generate-pdf-packet.ts` reads `.env` locally, fills PDFs
- `.env` is git-ignored; `taxpayer-profile.yaml` should also be git-ignored with real data

### Filing Statuses (use exact strings)
- `single`, `married_joint`, `married_separate`, `head_of_household`, `qualifying_surviving_spouse`

### Script Output
All calculation scripts output JSON to stdout:
```bash
bun scripts/tax-brackets.ts 75000 single
# {"tax":9356.25,"effectiveRate":12.48,"marginalRate":0.22}
```

### OpenCode Agents
Invoke with `@agent-name` in OpenCode:
- `@document-reader` - Extract data from PDFs
- `@income-processor` - Process W-2s, 1099s, K-1s
- `@deduction-analyzer` - Standard vs itemized analysis
- `@credit-evaluator` - Credit eligibility
- `@tax-calculator` - Compute liability
- `@tax-strategist` - Legal optimization
- `@form-generator` - Generate form JSON

## ANTI-PATTERNS

| DO NOT | WHY |
|--------|-----|
| Read `.env` in AI agents | Sensitive data exposure |
| Hardcode SSN/bank numbers | Use placeholders only |
| Commit `taxpayer-profile.yaml` with real data | Contains PII |
| Skip validation phase | Tax errors are costly |
| Modify `irs-pub17/` content | Reference material - read only |

## COMMANDS

```bash
# Tax calculations
bun scripts/tax-brackets.ts <income> <status>
bun scripts/standard-deduction.ts <status> [age] [is_blind]
bun scripts/capital-gains.ts <income> <ltcg> <status> [magi]
bun scripts/se-tax.ts <net_profit> <status> [wages]
bun scripts/credits.ts <type> <agi> <status> [args...]

# PDF generation (requires pdftk)
bun scripts/generate-pdf-packet.ts

# OpenCode workflow
opencode  # then run /tax-prep
```

## 2025 TAX YEAR CHANGES

- Standard deduction: $15,750 (single), $31,500 (MFJ), $23,625 (HoH)
- SALT cap increased to $40,000 ($20,000 MFS)
- New deductions: tips ($25k), overtime ($12.5k), car loan interest ($10k)
- 401k limit: $23,500 ($31k if 50+, $37,750 if 60-63)
- Filing deadline: April 15, 2026

## NOTES

- **pdftk required**: `brew install pdftk-java` on macOS
- **Bun required**: Scripts use Bun runtime, not Node
- **No tests**: Personal tool - verify calculations manually against IRS pub
- **Tax Year 2025 only**: Brackets/limits hardcoded for 2025
