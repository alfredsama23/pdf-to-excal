import * as pdfjsLib from 'pdfjs-dist';

// Initialize PDF.js worker using local worker
const workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

export const pdfLib = pdfjsLib;