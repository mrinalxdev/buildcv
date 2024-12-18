'use client';

import { NodeData, Connection } from '@/lib/types/node';

export async function processImage(nodes: NodeData[], connections: Connection[], startNodeId: string): Promise<ImageData | null> {
  const processedNodes = new Set<string>();
  const nodeOutputs = new Map<string, ImageData>();

  async function processNode(nodeId: string): Promise<ImageData | null> {
    if (processedNodes.has(nodeId)) {
      return nodeOutputs.get(nodeId) || null;
    }

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return null;

    // Get input connections for this node
    const inputConnections = connections.filter(c => c.target === nodeId);
    
    // Process all input nodes first
    const inputs = await Promise.all(
      inputConnections.map(async conn => {
        return await processNode(conn.source);
      })
    );

    // Process current node based on its type
    let result: ImageData | null = null;
    
    switch (node.type) {
      case 'imageInput':
        // Handle image input
        result = await loadImageData(node.data.params.imageUrl);
        break;
        
      case 'grayscale':
        if (inputs[0]) {
          result = await applyGrayscale(inputs[0]);
        }
        break;
        
      case 'blur':
        if (inputs[0]) {
          result = await applyBlur(inputs[0], node.data.params);
        }
        break;
        
      case 'threshold':
        if (inputs[0]) {
          result = await applyThreshold(inputs[0], node.data.params);
        }
        break;
    }

    if (result) {
      processedNodes.add(nodeId);
      nodeOutputs.set(nodeId, result);
    }

    return result;
  }

  return processNode(startNodeId);
}

// Helper functions for image processing
async function loadImageData(url: string): Promise<ImageData> {
  const img = new Image();
  img.src = url;
  await img.decode();
  
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

async function applyGrayscale(imageData: ImageData): Promise<ImageData> {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }
  return imageData;
}

async function applyBlur(imageData: ImageData, params: any): Promise<ImageData> {
  // Implement Gaussian blur
  // This is a simplified version - you'd want to implement a proper Gaussian blur
  return imageData; // Placeholder
}

async function applyThreshold(imageData: ImageData, params: any): Promise<ImageData> {
  const data = imageData.data;
  const threshold = params.threshold;
  const maxValue = params.maxValue;
  
  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    const value = gray < threshold ? 0 : maxValue;
    data[i] = data[i + 1] = data[i + 2] = value;
  }
  
  return imageData;
}