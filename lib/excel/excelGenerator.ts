import * as XLSX from 'xlsx';
import { ProcessedData } from '../types';

export function generateExcel(data: ProcessedData[]): Blob {
  // Transform the data into a flat structure for Excel
  const flatData = data.map(item => ({
    'File Name': item.fileName,
    'File Type': item.type,
    'File Size (KB)': (item.size / 1024).toFixed(2),
    'Processed Date': new Date(item.processedAt).toLocaleString(),
    'Name': item.structuredData.name || '',
    'Email': item.structuredData.email || '',
    'Phone': item.structuredData.phone || '',
    'Date': item.structuredData.date || '',
    'Address': item.structuredData.address || '',
  }));

  const worksheet = XLSX.utils.json_to_sheet(flatData, {
    header: [
      'File Name',
      'File Type',
      'File Size (KB)',
      'Processed Date',
      'Name',
      'Email',
      'Phone',
      'Date',
      'Address',
    ],
  });

  // Add column widths
  const colWidths = [
    { wch: 20 }, // File Name
    { wch: 15 }, // File Type
    { wch: 15 }, // File Size
    { wch: 20 }, // Processed Date
    { wch: 25 }, // Name
    { wch: 30 }, // Email
    { wch: 15 }, // Phone
    { wch: 15 }, // Date
    { wch: 40 }, // Address
  ];
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Extracted Data');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
}