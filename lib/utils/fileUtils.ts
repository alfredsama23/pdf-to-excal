export async function readFileAsBlob(file: File): Promise<Blob> {
  // For text files, we want to process the text content directly
  if (file.type.startsWith('text/')) {
    const text = await file.text();
    return new Blob([text], { type: 'text/plain' });
  }
  
  // For other files (PDF, images), return the blob directly
  return file;
}

export async function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}