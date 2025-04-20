import { z } from "zod";

// Settings Schema Definitions
export const QualitySchema = z.enum(["high", "medium", "low"]);
export type Quality = z.infer<typeof QualitySchema>;

export const BaseSettingsSchema = z.object({
  quality: QualitySchema,
  preserveFormatting: z.boolean().default(true),
});

export const PdfToWordSettingsSchema = BaseSettingsSchema.extend({
  format: z.enum(["docx", "doc"]).optional().default("docx"),
});

export const WordToPdfSettingsSchema = BaseSettingsSchema;

export const PdfToExcelSettingsSchema = BaseSettingsSchema.extend({
  format: z.enum(["xlsx", "xls"]).optional().default("xlsx"),
  extractAllTables: z.boolean().default(true),
});

export type BaseSettings = z.infer<typeof BaseSettingsSchema>;
export type PdfToWordSettings = z.infer<typeof PdfToWordSettingsSchema>;
export type WordToPdfSettings = z.infer<typeof WordToPdfSettingsSchema>;
export type PdfToExcelSettings = z.infer<typeof PdfToExcelSettingsSchema>;

// Quality Parameter Maps
export interface QualityParams {
  ImageQuality: number;
  PdfResolution?: string;
  WordQuality?: string;
  ExcelQuality?: string;
}

export const QUALITY_PARAMS: Record<Quality, QualityParams> = {
  high: { ImageQuality: 100, PdfResolution: "2400", WordQuality: "better", ExcelQuality: "high" },
  medium: { ImageQuality: 90, PdfResolution: "1200", WordQuality: "normal", ExcelQuality: "normal" },
  low: { ImageQuality: 80, PdfResolution: "150", WordQuality: "draft", ExcelQuality: "draft" }
};

// Settings Parser
export function parseSettings<T>(
  settingsStr: FormDataEntryValue | null,
  schema: z.ZodSchema<T>
): T {
  if (!settingsStr || typeof settingsStr !== "string") {
    throw new Error("Settings are required");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(settingsStr);
  } catch (e) {
    throw new Error("Invalid settings format: must be valid JSON");
  }

  try {
    return schema.parse(parsed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues.map(issue => issue.message).join(", ");
      throw new Error(`Invalid settings: ${issues}`);
    }
    throw new Error("Settings validation failed");
  }
}

// File Validation
export function validateFile(file: FormDataEntryValue | null, acceptedTypes: readonly string[]): File {
  if (!file || !(file instanceof File)) {
    throw new Error("No file provided");
  }

  const fileType = file.type.toLowerCase();
  if (!acceptedTypes.some(type => fileType.includes(type))) {
    throw new Error(`Invalid file type. Accepted types: ${acceptedTypes.join(", ")}`);
  }

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  if (file.size > MAX_SIZE) {
    throw new Error("File size exceeds 10MB limit");
  }

  return file;
}

// API Response Helpers
export function createErrorResponse(error: unknown, status = 500) {
  return Response.json({
    error: "Conversion failed",
    details: error instanceof Error ? error.message : String(error)
  }, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json"
    }
  });
}

export const DEFAULT_FORMATS = {
  PDF: "pdf",
  WORD: "docx",
  EXCEL: "xlsx"
} as const;

export const MIME_TYPES = {
  pdf: "application/pdf",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  doc: "application/msword",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: "application/vnd.ms-excel"
} as const;

export function createFileResponse(
  buffer: ArrayBuffer,
  originalName: string,
  outputFormat: string,
  defaultFormat: string
): Response {
  const safeFormat = outputFormat || defaultFormat || "docx";
  const fileBaseName = originalName.replace(/\.[^/.]+$/, ""); // remove existing extension
  const finalFileName = `${fileBaseName}.${safeFormat}`;

  const mimeTypes: Record<string, string> = {
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    doc: "application/msword",
    pdf: "application/pdf",
    txt: "text/plain",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xls: "application/vnd.ms-excel"
  };

  const contentType = mimeTypes[safeFormat.toLowerCase()] || "application/octet-stream";
  
  // Properly encode the filename for Content-Disposition
  const encodedFilename = encodeURIComponent(finalFileName)
    .replace(/['()]/g, escape) // Escape special characters
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename*=UTF-8''${encodedFilename}`,
      "Content-Length": buffer.byteLength.toString()
    }
  });
}