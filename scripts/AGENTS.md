# SCRIPTS - TAX CALCULATION UTILITIES

Bun/TypeScript CLI tools for deterministic tax calculations. All output JSON.

## OVERVIEW

| Script | Purpose | Example |
|--------|---------|---------|
| `tax-brackets.ts` | Compute tax from taxable income | `bun tax-brackets.ts 75000 single` |
| `standard-deduction.ts` | Get deduction by status/age | `bun standard-deduction.ts married_joint 67` |
| `capital-gains.ts` | LTCG tax + NIIT calculation | `bun capital-gains.ts 200000 50000 single` |
| `se-tax.ts` | Self-employment tax | `bun se-tax.ts 100000 single` |
| `credits.ts` | Credit calculations (CTC, EIC, etc.) | `bun credits.ts ctc 150000 married_joint 2` |
| `generate-pdf-packet.ts` | Fill IRS PDFs from .env + output/ | `bun generate-pdf-packet.ts` |

## CONVENTIONS

### Filing Status Values
Use exactly: `single`, `married_joint`, `married_separate`, `head_of_household`, `qualifying_surviving_spouse`

### Output Format
All calculators return JSON to stdout:
```json
{"tax":9356.25,"effectiveRate":12.48,"marginalRate":0.22}
```

### Input Parsing
- Strip `$` and `,` from numbers automatically
- Args parsed from `Bun.argv.slice(2)`

### Type Pattern
```typescript
type FilingStatus = 'single' | 'married_joint' | 'married_separate' | 'head_of_household' | 'qualifying_surviving_spouse';
```

## ANTI-PATTERNS

| DO NOT | WHY |
|--------|-----|
| Import from `.env` in calculators | Only `generate-pdf-packet.ts` reads .env |
| Return non-JSON output | Agents parse JSON |
| Modify tax brackets without updating year | Hardcoded for 2025 |
| Add interactive prompts | Scripts are non-interactive CLI tools |

## DEPENDENCIES

- **Runtime**: Bun (NOT Node)
- **External**: pdftk (for PDF generation only)
- **No npm packages**: Pure Bun built-ins
