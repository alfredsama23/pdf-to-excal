export interface ExtractedData {
  text: string;
  metadata: {
    [key: string]: string | number | null;
  };
}

export interface ProcessedData {
  fileName: string;
  type: string;
  size: number;
  processedAt: string;
  structuredData: {
    name?: string;
    email?: string;
    phone?: string;
    date?: string;
    address?: string;
    [key: string]: any;
  };
}

export interface GeminiResponse {
  text: string;
  structuredData: {
    [key: string]: string;
  };
}