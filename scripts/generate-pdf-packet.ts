#!/usr/bin/env bun

import { readdir, readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { $ } from "bun";

const FORM_FIELD_MAPPINGS: Record<string, Record<string, string>> = {
  "1040": {
    "taxpayer.first_name": "f1-1",
    "taxpayer.last_name": "f1-2",
    "taxpayer.ssn": "f1-3",
    "spouse.first_name": "f1-4",
    "spouse.last_name": "f1-5",
    "spouse.ssn": "f1-6",
    "address.street": "f1-7",
    "address.apt": "f1-8",
    "address.city": "f1-9",
    "address.state": "f1-10",
    "address.zip": "f1-11",
    "filing_status_single": "c1-1",
    "filing_status_mfj": "c1-2",
    "filing_status_mfs": "c1-3",
    "filing_status_hoh": "c1-4",
    "filing_status_qss": "c1-5",
    "digital_assets_yes": "c1-6",
    "digital_assets_no": "c1-7",
    "income.line_1a_wages": "f1-25",
    "income.line_1b": "f1-26",
    "income.line_1c": "f1-27",
    "income.line_1d": "f1-28",
    "income.line_1e": "f1-29",
    "income.line_1f": "f1-30",
    "income.line_1g": "f1-31",
    "income.line_1h": "f1-32",
    "income.line_1i": "f1-33",
    "income.line_1z": "f1-34",
    "income.line_2a": "f1-35",
    "income.line_2b_taxable_interest": "f1-36",
    "income.line_3a": "f1-37",
    "income.line_3b_qualified_dividends": "f1-38",
    "income.line_4a": "f1-39",
    "income.line_4b": "f1-40",
    "income.line_5a": "f1-41",
    "income.line_5b": "f1-42",
    "income.line_6a": "f1-43",
    "income.line_6b": "f1-44",
    "income.line_6c": "c1-8",
    "income.line_7": "f1-45",
    "income.line_8": "f1-46",
    "income.line_9_total_income": "f1-47",
    "adjustments.line_10_adjustments": "f1-48",
    "line_11_agi": "f1-49",
    "deductions.line_12_standard_or_itemized": "f1-50",
    "deductions.line_13_qbi_deduction": "f1-51",
    "line_14_total_deductions": "f1-52",
    "line_15_taxable_income": "f1-53",
    "tax_and_credits.line_16_tax": "f1-54",
    "tax_and_credits.line_17": "f1-55",
    "tax_and_credits.line_18": "f1-56",
    "tax_and_credits.line_19_child_tax_credit": "f1-57",
    "tax_and_credits.line_20": "f1-58",
    "tax_and_credits.line_21": "f1-59",
    "tax_and_credits.line_22_total_credits": "f1-60",
    "tax_and_credits.line_23": "f1-61",
    "tax_and_credits.line_24_total_tax": "f1-62",
    "payments.line_25a_w2_withholding": "f1-63",
    "payments.line_25b": "f1-64",
    "payments.line_25c": "f1-65",
    "payments.line_25d": "f1-66",
    "payments.line_26": "f1-67",
    "payments.line_27": "f1-68",
    "payments.line_28": "f1-69",
    "payments.line_29": "f1-70",
    "payments.line_30": "f1-71",
    "payments.line_31": "f1-72",
    "payments.line_32": "f1-73",
    "payments.line_33_total_payments": "f1-74",
    "refund_or_owed.line_34_overpaid": "f1-75",
    "refund_or_owed.line_35a_refund_amount": "f1-76",
    "bank_info.routing": "f1-77",
    "bank_info.account": "f1-78",
    "bank_info.type_checking": "c1-9",
    "bank_info.type_savings": "c1-10",
    "refund_or_owed.line_36": "f1-79",
    "refund_or_owed.line_37_owed": "f1-80",
    "refund_or_owed.line_38": "f1-81",
    "signature.occupation": "f1-82",
    "signature.ip_pin": "f1-83",
    "spouse_signature.occupation": "f1-84",
    "spouse_signature.ip_pin": "f1-85",
  },
};

interface FormData {
  form: string;
  [key: string]: unknown;
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((current: unknown, key) => {
    if (current && typeof current === "object" && key in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function formatCurrency(value: unknown): string {
  if (typeof value === "number") {
    return value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
  return String(value ?? "");
}

async function loadEnvFile(envPath: string): Promise<Record<string, string>> {
  const env: Record<string, string> = {};
  
  if (!existsSync(envPath)) {
    console.error(`Error: .env file not found at ${envPath}`);
    console.error("Create .env from .env.example and fill in your sensitive data.");
    process.exit(1);
  }

  const content = await readFile(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    env[key] = value;
  }
  
  return env;
}

function resolvePlaceholders(value: unknown, env: Record<string, string>): unknown {
  if (typeof value === "string" && value.startsWith("$")) {
    const envKey = value.slice(1);
    const resolved = env[envKey];
    if (!resolved) {
      console.warn(`Warning: No value found in .env for ${value}`);
      return "";
    }
    return resolved;
  }
  return value;
}

async function loadFormJsonFiles(outputDir: string): Promise<FormData[]> {
  const forms: FormData[] = [];
  
  if (!existsSync(outputDir)) {
    console.error(`Error: Output directory not found at ${outputDir}`);
    console.error("Run /tax-prep workflow first to generate form data.");
    process.exit(1);
  }

  const files = await readdir(outputDir);
  const jsonFiles = files.filter(f => f.endsWith(".json"));
  
  if (jsonFiles.length === 0) {
    console.error("Error: No JSON form files found in output/");
    console.error("Run /tax-prep workflow first to generate form data.");
    process.exit(1);
  }

  for (const file of jsonFiles) {
    const content = await readFile(join(outputDir, file), "utf-8");
    const data = JSON.parse(content) as FormData;
    forms.push(data);
  }

  return forms;
}

async function generateFdfContent(formData: FormData, env: Record<string, string>, fieldMappings: Record<string, string>): Promise<string> {
  const fields: string[] = [];

  function processObject(obj: Record<string, unknown>, prefix = ""): void {
    for (const [key, value] of Object.entries(obj)) {
      const fullPath = prefix ? `${prefix}.${key}` : key;
      
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        processObject(value as Record<string, unknown>, fullPath);
      } else {
        const pdfField = fieldMappings[fullPath];
        if (pdfField) {
          let resolvedValue = resolvePlaceholders(value, env);
          
          if (typeof resolvedValue === "number") {
            resolvedValue = formatCurrency(resolvedValue);
          }
          
          if (fullPath.includes("filing_status")) {
            const status = formData.filing_status as string;
            const shouldCheck = 
              (fullPath === "filing_status_single" && status === "single") ||
              (fullPath === "filing_status_mfj" && status === "married_joint") ||
              (fullPath === "filing_status_mfs" && status === "married_separate") ||
              (fullPath === "filing_status_hoh" && status === "head_of_household") ||
              (fullPath === "filing_status_qss" && status === "qualifying_surviving_spouse");
            
            if (shouldCheck) {
              fields.push(`<< /T (${pdfField}) /V /Yes >>`);
            }
            continue;
          }
          
          if (fullPath.includes("_yes") || fullPath.includes("_no") || 
              fullPath.includes("type_checking") || fullPath.includes("type_savings")) {
            continue;
          }
          
          fields.push(`<< /T (${pdfField}) /V (${String(resolvedValue ?? "")}) >>`);
        }
      }
    }
  }

  if (formData.filing_status) {
    const status = formData.filing_status as string;
    const statusFieldMap: Record<string, string> = {
      single: "filing_status_single",
      married_joint: "filing_status_mfj",
      married_separate: "filing_status_mfs",
      head_of_household: "filing_status_hoh",
      qualifying_surviving_spouse: "filing_status_qss",
    };
    const fieldKey = statusFieldMap[status];
    if (fieldKey && fieldMappings[fieldKey]) {
      fields.push(`<< /T (${fieldMappings[fieldKey]}) /V /Yes >>`);
    }
  }

  processObject(formData as Record<string, unknown>);

  return `%FDF-1.2
1 0 obj
<<
/FDF
<<
/Fields [
${fields.join("\n")}
]
>>
>>
endobj
trailer
<< /Root 1 0 R >>
%%EOF`;
}

async function checkPdftkInstalled(): Promise<boolean> {
  try {
    await $`which pdftk`.quiet();
    return true;
  } catch {
    return false;
  }
}

async function fillPdfForm(blankPdfPath: string, fdfContent: string, outputPath: string): Promise<void> {
  const tempFdfPath = join("/tmp", `form-${Date.now()}.fdf`);
  
  await writeFile(tempFdfPath, fdfContent);
  
  try {
    await $`pdftk ${blankPdfPath} fill_form ${tempFdfPath} output ${outputPath} flatten`;
  } finally {
    await $`rm -f ${tempFdfPath}`.quiet();
  }
}

async function mergePdfs(pdfPaths: string[], outputPath: string): Promise<void> {
  if (pdfPaths.length === 0) {
    throw new Error("No PDFs to merge");
  }
  
  if (pdfPaths.length === 1) {
    await $`cp ${pdfPaths[0]} ${outputPath}`;
    return;
  }
  
  await $`pdftk ${pdfPaths} cat output ${outputPath}`;
}

async function main() {
  const projectRoot = process.cwd();
  const envPath = join(projectRoot, ".env");
  const outputDir = join(projectRoot, "output");
  const formsDir = join(projectRoot, "irs-forms", "blank");
  const filledDir = join(projectRoot, "output", "filled");
  
  console.log("PDF Tax Packet Generator");
  console.log("========================\n");

  const hasPdftk = await checkPdftkInstalled();
  if (!hasPdftk) {
    console.error("Error: pdftk is required but not installed.");
    console.log("\nInstall pdftk:");
    console.log("  macOS:  brew install pdftk-java");
    console.log("  Ubuntu: sudo apt-get install pdftk");
    console.log("  Windows: https://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/");
    process.exit(1);
  }

  console.log("Loading .env file (sensitive data stays local)...");
  const env = await loadEnvFile(envPath);
  
  const requiredEnvVars = ["TAXPAYER_SSN", "BANK_ROUTING_NUMBER", "BANK_ACCOUNT_NUMBER"];
  const missingVars = requiredEnvVars.filter(v => !env[v]);
  if (missingVars.length > 0) {
    console.error(`\nError: Missing required .env variables: ${missingVars.join(", ")}`);
    console.error("Fill in your .env file with sensitive data before generating PDFs.");
    process.exit(1);
  }

  console.log("Loading form data from output/...");
  const forms = await loadFormJsonFiles(outputDir);
  console.log(`Found ${forms.length} form(s) to process.\n`);

  await mkdir(filledDir, { recursive: true });

  const filledPdfs: string[] = [];
  const formOrder = ["1040", "schedule-1", "schedule-2", "schedule-3", "schedule-a", "schedule-b", 
                     "schedule-c", "schedule-d", "schedule-e", "schedule-se", "8812", "8949"];

  const sortedForms = forms.sort((a, b) => {
    const aIndex = formOrder.indexOf(a.form.toLowerCase());
    const bIndex = formOrder.indexOf(b.form.toLowerCase());
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  for (const formData of sortedForms) {
    const formName = formData.form;
    const pdfFileName = `f${formName.toLowerCase().replace(/-/g, "").replace("schedule", "1040s")}.pdf`;
    const blankPdfPath = join(formsDir, pdfFileName);
    
    if (!existsSync(blankPdfPath)) {
      console.warn(`Warning: Blank PDF not found for ${formName} (${pdfFileName}), skipping...`);
      continue;
    }

    const mappings = FORM_FIELD_MAPPINGS[formName] || FORM_FIELD_MAPPINGS["1040"] || {};
    
    console.log(`Processing ${formName}...`);
    
    const fdfContent = await generateFdfContent(formData, env, mappings);
    const outputPdfPath = join(filledDir, `${formName}-filled.pdf`);
    
    try {
      await fillPdfForm(blankPdfPath, fdfContent, outputPdfPath);
      filledPdfs.push(outputPdfPath);
      console.log(`  ✓ Generated ${formName}-filled.pdf`);
    } catch (error) {
      console.error(`  ✗ Failed to fill ${formName}: ${error}`);
    }
  }

  if (filledPdfs.length > 0) {
    console.log("\nMerging into final packet...");
    const packetPath = join(outputDir, "tax-return-packet.pdf");
    await mergePdfs(filledPdfs, packetPath);
    console.log(`\n✓ Generated: output/tax-return-packet.pdf`);
    console.log(`  Contains ${filledPdfs.length} form(s)`);
  } else {
    console.error("\nNo forms were successfully processed.");
    process.exit(1);
  }

  console.log("\n" + "=".repeat(50));
  console.log("SECURITY REMINDER");
  console.log("=".repeat(50));
  console.log("Your sensitive data (SSN, bank info) was read from .env");
  console.log("and written directly to the PDFs. The AI never saw this data.");
  console.log("\nBefore filing:");
  console.log("  1. Review output/tax-return-packet.pdf for accuracy");
  console.log("  2. Sign and date where required");
  console.log("  3. Delete output/filled/ and tax-return-packet.pdf after filing");
}

main().catch(console.error);
