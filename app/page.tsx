'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropZone } from '@/components/ui/drop-zone';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Card } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import { processFile, generateExcel, type ProcessedData } from '@/lib/fileProcessing';
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [files, setFiles] = useState<ProcessedData[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFilesDrop = async (droppedFiles: File[]) => {
    setProcessing(true);
    setProgress(0);
    
    try {
      const processedFiles: ProcessedData[] = [];
      
      for (let i = 0; i < droppedFiles.length; i++) {
        const file = droppedFiles[i];
        const processedData = await processFile(file);
        processedFiles.push(processedData);
        setProgress(((i + 1) / droppedFiles.length) * 100);
      }
      
      setFiles(processedFiles);
      toast({
        title: "Success",
        description: `Processed ${droppedFiles.length} files successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process files",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (files.length === 0) return;
    
    const blob = generateExcel(files);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'processed-files.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">File to Excel Converter</h1>
          <p className="text-muted-foreground">
            Upload your files and convert them into a structured Excel format
          </p>
        </div>

        <DropZone
          onFilesDrop={handleFilesDrop}
          disabled={processing}
          className="bg-card"
        />

        {processing && (
          <ProgressBar progress={progress} className="mt-4" />
        )}

        {files.length > 0 && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Processed Files</h2>
                <Button onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel
                </Button>
              </div>
              
              <div className="divide-y">
                {files.map((file, index) => (
                  <div key={index} className="py-3 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{file.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB • {file.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}