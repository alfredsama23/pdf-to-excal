import { ExtractedData } from '../types';
import { pdfLib } from '../config/pdf';
import { extractTextFromPage } from '../utils/pdfUtils';

export async function extractPDFContent(file: File): Promise<ExtractedData> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfLib.getDocument({ data: arrayBuffer }).promise;
    
    const numPages = pdf.numPages;
    const pageTexts = await Promise.all(
      Array.from({ length: numPages }, (_, i) => 
        extractTextFromPage(pdf, i + 1)
      )
    );
    
    const fullText = pageTexts.join('\n').trim();
    
    if (!fullText) {
      throw new Error('No text content found in PDF');
    }

    return {
      text: fullText,
      metadata: {
        pageCount: numPages,
        title: await pdf.getMetadata().catch(() => ({})).then(meta => meta?.info?.Title || null),
      },
    };
  } catch (error) {
    throw new Error(`Failed to extract PDF content: ${error.message}`);
  }
}