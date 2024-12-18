'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface PreviewProps {
  processing: boolean;
  preview: string | null;
}

export function Preview({ processing, preview }: PreviewProps) {
  return (
    <Card className="absolute right-4 bottom-4 w-[300px]">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {processing ? (
          <div className="flex items-center justify-center h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto rounded-md"
          />
        ) : (
          <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
            Process an image to see preview
          </div>
        )}
      </CardContent>
    </Card>
  );
}