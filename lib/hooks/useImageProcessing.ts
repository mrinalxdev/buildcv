'use client';

import { useState } from 'react';
import { Node, Edge } from 'reactflow';
import { processImage } from '@/lib/nodes/processors/imageProcessor';

export function useImageProcessing() {
  const [processing, setProcessing] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const processFlow = async (nodes: Node[], edges: Edge[]) => {
    setProcessing(true);
    try {
      // Find output node
      const outputNode = nodes.find(node => 
        node.data.type === 'output' || 
        !edges.some(edge => edge.source === node.id)
      );

      if (!outputNode) {
        throw new Error('No output node found');
      }

      const result = await processImage(
        nodes as any,
        edges as any,
        outputNode.id
      );

      if (result) {
        // Convert ImageData to base64 for preview
        const canvas = document.createElement('canvas');
        canvas.width = result.width;
        canvas.height = result.height;
        const ctx = canvas.getContext('2d')!;
        ctx.putImageData(result, 0, 0);
        setPreview(canvas.toDataURL());
      }
    } catch (error) {
      console.error('Processing error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return {
    processing,
    preview,
    processFlow,
  };
}