import { PDFDocumentProxy } from 'pdfjs-dist';

export async function extractTextFromPage(pdf: PDFDocumentProxy, pageNumber: number): Promise<string> {
  const page = await pdf.getPage(pageNumber);
  const textContent = await page.getTextContent();
  
  return textContent.items
    .map((item: any) => item.str)
    .join(' ')
    .trim();
}