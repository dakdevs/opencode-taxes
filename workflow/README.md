# Tax Preparation Workflow

Follow these guides in order to prepare your 2025 tax return with OpenCode.

## Prerequisites

Before starting:
1. Fork/clone this repository
2. Have your tax documents ready
3. Set aside 1-2 hours for initial setup

## Workflow Steps

| Step | Guide | Expert Agent | Time Est. | Description |
|------|-------|--------------|-----------|-------------|
| 1 | [Gather Documents](./01-gather-documents.md) | `@document-collector` | 30 min | Collect and organize your tax documents |
| 2 | [Enter Personal Info](./02-personal-info.md) | `@profile-validator` | 15 min | Fill out taxpayer-profile.yaml |
| 3 | [Process Income](./03-income.md) | `@income-processor` | 30 min | Extract income from documents |
| 4 | [Calculate Deductions](./04-deductions.md) | `@deduction-analyzer` | 20 min | Determine standard vs. itemized |
| 5 | [Claim Credits](./05-credits.md) | `@credit-evaluator` | 15 min | Identify eligible credits |
| 6 | [Calculate Tax](./06-calculate-tax.md) | `@tax-calculator` | 10 min | Compute your tax liability |
| 7 | [Review Return](./07-review.md) | `@validation-checkpoint` | 20 min | Verify accuracy |
| 8 | [File Return](./08-file.md) | `@filing-assistant` | 15 min | Submit your return |

## Quick Start

Open OpenCode and say:

```
Help me prepare my 2025 tax return. I've placed my documents in the 
user-documents folder and filled out taxpayer-profile.yaml.
```

OpenCode will guide you through each step.

## Expert Agents

Each workflow step has a dedicated expert sub-agent that the core workflow automatically invokes:

| Step | Sub-Agent | Expertise |
|------|-----------|-----------|
| 1 | `document-collector` | Document gathering, completeness verification |
| 2 | `profile-validator` | Filing status rules, dependent eligibility |
| 3 | `income-processor` | Income extraction and categorization |
| 4 | `deduction-analyzer` | Standard vs. itemized analysis |
| 5 | `credit-evaluator` | Credit eligibility and phase-outs |
| 6 | `tax-calculator` | Tax computation with all adjustments |
| 7 | `validation-checkpoint` | Accuracy verification, error detection |
| 8 | `filing-assistant` | Filing options and payment methods |

These sub-agents are invoked automatically by the `/tax-prep` workflow. Each contains comprehensive IRS rules, edge cases, and domain-specific guidance.

## Important Dates

| Deadline | Date | Notes |
|----------|------|-------|
| Filing deadline | April 15, 2026 | Regular deadline |
| Extension deadline | October 15, 2026 | Must file Form 4868 by April 15 |
| ACTC/EIC refunds | Mid-February 2026 | Earliest refund date |
