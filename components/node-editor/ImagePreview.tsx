'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';

interface ImagePreviewProps {
  url: string;
}

export function ImagePreview({ url }: ImagePreviewProps) {
  const [error, setError] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={error ? 'text-destructive' : ''}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogTitle>
          Here is your inputted image !!
        </DialogTitle>
        <img
          src={url}
          alt="Preview"
          className="w-full h-auto rounded-md"
          onError={() => setError(true)}
          onLoad={() => setError(false)}
        />
      </DialogContent>
    </Dialog>
  );
}