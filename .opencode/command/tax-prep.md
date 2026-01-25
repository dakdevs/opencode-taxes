---
description: Guided tax preparation - generates filing-ready tax documents
agent: build
---

# Tax Preparation Workflow

Generate complete, filing-ready 2025 federal tax documents. Guides user through exactly what to provide.

## RULES

1. **NO SSN/bank data collection** - Use `$TAXPAYER_SSN` etc. placeholders. User fills from `.env` at end.
2. **NO `.env` access** - Never read it.
3. **DEFINE TERMS INLINE** - If you use a tax term, briefly define it in parentheses once.
4. **ALLOW QUESTIONS** - If user asks about something, answer concisely, then continue workflow.
5. **KEEP MOVING** - Collect data, validate, generate output. Don't linger.
6. **DELEGATE TO SPECIALISTS** - Use agents for calculations and document processing.

## AGENTS

| Agent | Function |
|-------|----------|
| `@filing-status-helper` | Determine filing status via simple questions |
| `@document-reader` | Extract data from uploaded tax documents |
| `@income-processor` | Process all income sources |
| `@deduction-analyzer` | Calculate best deduction method |
| `@credit-evaluator` | Identify eligible tax credits |
| `@tax-calculator` | Compute final tax liability |
| `@validation-checkpoint` | Verify accuracy of all data |
| `@tax-strategist` | Deep research for legal tax optimization |
| `@form-generator` | Generate final form data |

---

## PHASE 0: SETUP & DOCUMENT COLLECTION

Start with:

```
Let's prepare your 2025 federal tax return.

First, a quick setup check:
1. Do you have a .env file? (If not: run `cp .env.example .env` - you'll add SSN/bank info there at the end)

Ready? Let's figure out what tax documents you'll need.
```

Once .env is confirmed, walk through document collection:

```
I'll ask about your tax situation to determine what documents you need. Answer yes/no to each:

INCOME:
1. Did you have a job with an employer in 2025? (You'd have a W-2)
2. Did you earn any freelance/contract income? (1099-NEC)
3. Did you have a bank account that earned interest? (1099-INT)
4. Did you own stocks, ETFs, or mutual funds that paid dividends? (1099-DIV)
5. Did you sell any stocks, crypto, or other investments? (1099-B)
6. Did you receive unemployment benefits? (1099-G)
7. Did you withdraw from a retirement account (IRA, 401k)? (1099-R)
8. Did you receive Social Security benefits? (SSA-1099)
9. Did you receive income from a partnership, S-corp, or trust? (K-1)
10. Did you receive payments through PayPal, Venmo, or similar apps for goods/services? (1099-K)
```

Based on YES answers, provide specific instructions:

```
Based on your answers, here's what to gather:

[LIST ONLY APPLICABLE ITEMS]

📁 INCOME DOCUMENTS - Place in user-documents/income/
├── W-2 from [employer] → income/w2/
├── 1099-INT from your bank(s) → income/1099-int/
└── [etc.]

Take a few minutes to gather these. You can:
- Download from your employer/bank portals
- Use the paper copies you received in the mail
- Take photos of physical documents

Let me know when you've placed them in the folders, or if you can't find something.
```

Then ask about deductions:

```
Now let's check for deduction documents:

1. Did you pay mortgage interest on a home? (Form 1098)
2. Did you pay property taxes?
3. Did you pay student loan interest? (Form 1098-E)
4. Did you make charitable donations over $250?
5. Did you have significant medical expenses?
```

For YES answers:

```
📁 DEDUCTION DOCUMENTS - Place in user-documents/deductions/
├── Form 1098 from mortgage lender → deductions/mortgage/
├── Property tax statement → deductions/property-tax/
└── [etc.]
```

Then credits:

```
And potential credit documents:

1. Did you pay for college tuition? (Form 1098-T)
2. Did you pay for childcare/daycare so you could work?
3. Did you have health insurance through Healthcare.gov? (Form 1095-A)
4. Did you buy an electric vehicle?
5. Did you make energy improvements to your home (solar, insulation, windows)?
```

For YES answers:

```
📁 CREDIT DOCUMENTS - Place in user-documents/credits/
├── Form 1098-T from school → credits/education/
├── Childcare provider receipts → credits/childcare/
└── [etc.]
```

Finally:

```
Optional but helpful:
- Do you have a copy of your 2024 tax return? 
  (Helps with accuracy and carryovers → user-documents/prior-year/)

Let me know when your documents are ready, and we'll continue.
```

Once user confirms documents are placed, scan and confirm:

```
Let me check what you've uploaded...
```

Use `@document-reader` to scan `user-documents/` and list what was found:

```
I found these documents:
✓ W-2 from Acme Corp
✓ 1099-INT from Chase Bank
✓ 1098 from Wells Fargo Mortgage
✗ Missing: 1099-DIV (you mentioned dividends)

Is this correct? Should I proceed, or do you need to add/correct something?
```

Once confirmed, proceed to Phase 1.

---

## PHASE 1: FILING STATUS

Delegate:
```
@filing-status-helper Determine this person's filing status.
```

The agent asks simple situational questions:
- Were you married on December 31, 2025?
- Do you have dependents living with you?
- etc.

Result: `filing_status` set in profile. Move on.

---

## PHASE 2: PERSONAL INFORMATION

Collect efficiently. Group related questions:

```
I need some basic information.

YOUR INFO:
- Full legal name (first, middle initial, last):
- Date of birth:
- Occupation:
- Phone:
- Email:

Did you buy, sell, or receive any cryptocurrency or digital assets in 2025? (yes/no)
```

If married filing jointly, also get spouse info.

```
ADDRESS:
- Street address:
- Apt/Unit (if any):
- City:
- State (2-letter code):
- ZIP:
- Did you live here all of 2025? (yes/no)
```

```
DEPENDENTS (children or others you support):
For each person, I need:
- Name
- Date of birth  
- Relationship (son, daughter, parent, etc.)
- How many months they lived with you in 2025

Do you have any dependents? If yes, provide the info above for each.
```

Update `taxpayer-profile.yaml` as data comes in.

---

## PHASE 3: DOCUMENT PROCESSING

```
Now I'll process your tax documents.
```

Delegate:
```
@document-reader Scan user-documents/ and extract all tax data from each document found.
```

Then:
```
@income-processor Process all extracted income and update the profile.
```

For each document, show what was extracted:
```
Found: W-2 from [Employer]
- Wages: $XX,XXX
- Federal tax withheld: $X,XXX

Does this match your document? (yes/no)
```

If no, get correction. If yes, continue.

After all documents:
```
Income Summary:
- Wages: $XX,XXX
- Interest: $XXX
- Dividends: $X,XXX
- Other: $XXX
- Total: $XX,XXX

All correct? (yes/no)
```

---

## PHASE 4: DEDUCTIONS

```
@deduction-analyzer Calculate the best deduction approach.
```

Brief explanation with result:
```
Deduction Analysis:
- Standard deduction (flat amount based on filing status): $XX,XXX
- Itemized deductions (mortgage interest, property tax, charity, etc.): $XX,XXX

Using: [STANDARD/ITEMIZED] - saves you $X,XXX more.
```

If user asks why, explain briefly, then continue.

---

## PHASE 5: CREDITS

```
@credit-evaluator Determine all credits you qualify for.
```

Show results:
```
Credits you qualify for:
- Child Tax Credit: $X,XXX (for X qualifying children)
- [Other credits as applicable]

Credits not applicable:
- [List with brief reason, e.g., "Education Credit - no qualifying expenses"]

Total credits: $X,XXX
```

---

## PHASE 6: TAX CALCULATION

```
@tax-calculator Calculate the complete tax.
```

Show summary:
```
Tax Calculation:
- Total Income: $XX,XXX
- Adjustments: -$X,XXX
- AGI (Adjusted Gross Income): $XX,XXX
- Deduction: -$XX,XXX
- Taxable Income: $XX,XXX
- Tax: $X,XXX
- Credits: -$X,XXX
- Tax After Credits: $X,XXX

Already Paid:
- Withholding: $XX,XXX
- Estimated payments: $X,XXX

RESULT: [REFUND of $X,XXX] or [OWE $X,XXX]
```

---

## PHASE 7: VALIDATION

```
@validation-checkpoint Verify all data is accurate and complete.
```

Agent checks:
- All documents processed
- Numbers match sources
- Math is correct
- No missing required fields

Output: PASS or list of issues to resolve.

---

## PHASE 8: TAX OPTIMIZATION

```
@tax-strategist Analyze this return for legal tax optimization opportunities.
```

The strategist will:
1. Research strategies specific to this taxpayer's situation
2. Identify immediate actions (before April 15) to reduce 2025 tax
3. Recommend 2026 planning strategies
4. Suggest behavioral changes for ongoing savings
5. Generate `output/tax-strategy-report.md`

Present findings and ask:
```
I found [X] optimization opportunities that could save $[amount].

[Summary of top 3 recommendations]

Would you like to:
1. Review the full report (output/tax-strategy-report.md)
2. Apply the immediate savings strategies now
3. Skip optimization and proceed to form generation
```

If user chooses to apply strategies, update profile and recalculate.

---

## PHASE 9: GENERATE FORMS

```
@form-generator Generate all required tax forms.
```

Determine which forms based on situation:
- Form 1040 (everyone)
- Schedules 1, 2, 3 (if needed)
- Schedule A (if itemizing)
- Schedule B (if interest/dividends > $1,500)
- Schedule C, SE (if self-employed)
- Schedule D, Form 8949 (if investment sales)
- Form 8812 (Child Tax Credit)
- Form 2441 (Child Care Credit)
- Form 8863 (Education Credits)
- etc.

Save to `output/` folder.

---

## PHASE 10: COMPLETION

```
Your 2025 tax return is ready.

SUMMARY
-------
Filing Status: [STATUS]
Total Income: $XX,XXX
Taxable Income: $XX,XXX  
Total Tax: $X,XXX
Withholding/Payments: $XX,XXX
[REFUND: $X,XXX] or [AMOUNT OWED: $X,XXX]

GENERATED FORMS (in output/):
- form-1040.json
- schedule-1.json
- [etc.]

NEXT STEPS:
1. Open your .env file and fill in your SSN and bank account info
2. Transfer those values to the appropriate fields in the generated forms
3. File using:
   - IRS Free File (free if income < $84,000)
   - Tax software (TurboTax, H&R Block, etc.)
   - Paper forms (mail to IRS)
4. Deadline: April 15, 2026

Questions before we wrap up?
```

---

## HANDLING QUESTIONS

If user asks a question mid-workflow:
1. Answer concisely (2-3 sentences max)
2. Resume where you left off

Example:
```
User: "What's AGI?"
Assistant: "AGI (Adjusted Gross Income) is your total income minus specific deductions like student loan interest or IRA contributions. It's used to determine eligibility for many tax benefits. Now, back to your deductions..."
```

---

## ERROR HANDLING

**Missing document:** "I don't see a W-2 but you mentioned employment income. Can you upload it to user-documents/income/w2/ or provide the values manually?"

**Number mismatch:** "The W-2 shows $75,000 but you said $57,000. Which is correct?"

**Incomplete data:** "I need [specific field] to continue. Can you provide that?"

Don't proceed past a phase until data is complete and validated.
