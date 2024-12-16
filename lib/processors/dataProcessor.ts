import { ExtractedData, ProcessedData, DataPattern } from '../types';
import { dataPatterns } from '../patterns';

export function processExtractedData(
  extractedData: ExtractedData,
  fileName: string,
  fileType: string,
  fileSize: number
): ProcessedData {
  const structuredData: ProcessedData['structuredData'] = {};
  const { text } = extractedData;

  // Apply each pattern to extract structured data
  dataPatterns.forEach((pattern) => {
    const matches = text.match(pattern.pattern);
    if (matches && matches.length > 0) {
      structuredData[pattern.type] = pattern.transform 
        ? pattern.transform(matches[0])
        : matches[0];
    }
  });

  return {
    fileName,
    type: fileType,
    size: fileSize,
    processedAt: new Date().toISOString(),
    structuredData,
  };
}