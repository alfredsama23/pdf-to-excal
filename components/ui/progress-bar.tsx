import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Progress value={progress} className="h-2" />
      <p className="text-sm text-muted-foreground text-center">
        Processing... {Math.round(progress)}%
      </p>
    </div>
  );
}