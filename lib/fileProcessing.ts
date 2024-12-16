import { ProcessedData } from './types';
import { extractWithGemini } from './extractors/geminiExtractor';
import { readFileAsBlob } from './utils/fileUtils';

export { generateExcel } from './excel/excelGenerator';

export async function processFile(file: File): Promise<ProcessedData> {
  try {
    const blob = await readFileAsBlob(file);
    const { structuredData } = await extractWithGemini(blob, file.type);

    return {
      fileName: file.name,
      type: file.type,
      size: file.size,
      processedAt: new Date().toISOString(),
      structuredData,
    };
  } catch (error) {
    throw new Error(\`Error processing file: \${error.message}\`);
  }
}