"use client";

import { NodeData, Connection } from "@/lib/types/node";
import { Red_Hat_Text } from "next/font/google";

interface ProcessingResult {
  inputImage: string | null;
  outputImage: string | null;
}

export async function processImage(
  nodes: NodeData[],
  connections: Connection[]
): Promise<ProcessingResult> {
  const processedNodes = new Set<string>();
  const nodeOutputs = new Map<string, ImageData>();

  let inputImageUrl: string | null = null;

  const inputNode = nodes.find((n) => n.type === "imageInput");
  const outputNode = nodes.find(
    (node) =>
      node.type === "output" ||
      !connections.some((edge) => edge.source === node.id)
  );

  if (!inputNode || !outputNode) {
    throw new Error("Missing input or output node");
  }

  inputImageUrl = inputNode.data.params.imageUrl;

  async function processNode(nodeId: string): Promise<ImageData | null> {
    if (processedNodes.has(nodeId)) {
      return nodeOutputs.get(nodeId) || null;
    }

    const node = nodes.find((n) => n.id === nodeId);

    if (!node) return null;

    const inputConnections = connections.filter((c) => c.target === nodeId);

    const inputs = await Promise.all(
      inputConnections.map(async (conn) => {
        return await processNode(conn.source);
      })
    );

    //todo : after LUNCH : logic for processing the nodes
    let result: ImageData | null = null;
    switch (node.type) {
      case "imageInput":
        result = await loadImageData(node.data.params.imageUrl);
        break;
      case "grayscale":
        if (inputs[0]) {
          result = await applyGrayScale(inputs[0]);
        }
        break;
      case "blur":
        if (inputs[0]) {
          // logic for applyBlur After the meet
          result = await applyBlur(inputs[0], node.data.params);
        }
        break;
      case "threshold":
        if (inputs[0]) {
          result = await applyThreshold(inputs[0], node.data.params);
        }
        break;
      
      case 'edgeDetection':
        if (inputs[0]){
          result = await applyEdgeDetection(inputs[0], node.data.params)
        }
        break;
    }

    if (result){
      processedNodes.add(nodeId);
      nodeOutputs.set(nodeId, result)
    }

    return result;
  }

  try {
    const outputImageData = await processNode(outputNode.id)
    return {
      inputImage : inputImageUrl,
      outputImage : outputImageData ? imageDataToUrl(outputImageData) : null, 
    }
  } catch (error) {
    console.error('Processing error :', error);
    return { inputImage : inputImageUrl, outputImage : null}
  }
}

function imageDataToUrl(imageData: ImageData) : string {
  const canvas = document.createElement('canvas');
  canvas.width = imageData.width;
  canvas.height = imageData.height;

  const ctx = canvas.getContext('2d');
  ctx?.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png')

}

// from here there will be all the helper function
async function loadImageData(url: string): Promise<ImageData> {
  const img = new Image();
  img.crossOrigin = "anonymouse";
  return new Promise((resolve, reject) => {
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      resolve(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };
    img.onerror = reject;
    img.src = url;
  });
}

async function applyEdgeDetection(
  imageData: ImageData,
  params: any
): Promise<ImageData> {
  const { method, threshold1, threshold2 } = params;

  const grayscaleData = await applyGrayScale(imageData);

  if (method === "Sobel") {
    const kernelX = [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ];
    const kernelY = [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ];

    const gradientX = applyConvolution(grayscaleData, kernelX);
    const gradientY = applyConvolution(grayscaleData, kernelY);

    // TODO : Logic for gradients after the meet
    const data = new Uint8ClampedArray(imageData.data);
    for (let i = 0; i < data.length; i += 4){
      const magnitude = Math.sqrt(
        gradientX.data[i] * gradientX.data[i] +
        gradientY.data[i] * gradientY.data[i]
      );
      data[i] = data[i + 1] = data[i + 2] = magnitude > threshold1 ? 255 : 0;
    }
    return new ImageData(data, imageData.width, imageData.height)
  } else {
    return applyCanny(grayscaleData, threshold1, threshold2)
  }
}

async function applyGrayScale(imageData: ImageData): Promise<ImageData> {
  const data = new Uint8ClampedArray(imageData.data);
  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = data[i + 1] = data[i + 2] = gray;
  }

  return new ImageData(data, imageData.width, imageData.height);
}

async function applyBlur(
  imageData: ImageData,
  params: any
): Promise<ImageData> {
  const { kernelSize, sigma } = params;
  //logic for gaussian kernal
  const kernel = createGaussianKernel(kernelSize, sigma);
  return applyConvolution(imageData, kernel);
}

async function applyThreshold(
  imageData: ImageData,
  params: any
): Promise<ImageData> {
  const { threshold, maxValue, type } = params;
  const data = new Uint8ClampedArray(imageData.data);

  for (let i = 0; i < data.length; i += 4) {
    const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
    let value;

    switch (type) {
      case "BINARY":
        value = gray < threshold ? 0 : maxValue;
        break;
      case "BINARY_INV":
        value = gray < threshold ? maxValue : 0;
        break;
      case "TRUNC":
        value = gray < threshold ? gray : threshold;
        break;
      case "TOZERO":
        value = gray < threshold ? 0 : gray;
        break;
      case "TOZERO_INV":
        value = gray < threshold ? gray : 0;
        break;
      default:
        value = gray < threshold ? 0 : maxValue;
    }

    data[i] = data[i + 1] = data[i + 2] = value;
  }

  return new ImageData(data, imageData.width, imageData.height);
}
// TODO : edgeDetection after the walk

function createGaussianKernel(size: number, sigma: number): number[][] {
  const kernel: number[][] = [];
  const mean = (size - 1) / 2;
  let sum = 0;

  for (let x = 0; x < size; x++) {
    kernel[x] = [];
    for (let y = 0; y < size; y++) {
      const value =
        Math.exp(
          -0.5 *
            (Math.pow((x - mean) / sigma, 2) + Math.pow((y - mean) / sigma, 2))
        ) /
        (2 * Math.PI * sigma * sigma);

      kernel[x][y] = value;
      sum += value;
    }
  }

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      kernel[x][y] /= sum;
    }
  }

  return kernel;
}

function applyConvolution(imageData: ImageData, kernel: number[][]): ImageData {
  const data = new Uint8ClampedArray(imageData.data);
  const width = imageData.width;
  const height = imageData.height;
  const kernelSize = kernel.length;
  const radius = Math.floor(kernelSize / 2);

  for (let y = radius; y < height - radius; y++) {
    for (let x = radius; x < width - radius; x++) {
      const idx = (y * width + x) * 4;
      let sumR = 0,
        sumG = 0,
        sumB = 0;

      for (let ky = 0; ky < kernelSize; ky++) {
        for (let kx = 0; kx < kernelSize; kx++) {
          const pixelIdx = ((y + ky - radius) * width + (x + kx - radius)) * 4;
          sumR += imageData.data[pixelIdx] * kernel[ky][kx];
          sumG += imageData.data[pixelIdx + 1] * kernel[ky][kx];
          sumB += imageData.data[pixelIdx + 2] * kernel[ky][kx];
        }
      }

      data[idx] = sumR;
      data[idx + 1] = sumG;
      data[idx + 2] = sumB;
    }
  }

  return new ImageData(data, width, height);
}

function applyCanny(
  imageData: ImageData,
  lowThreshold: number,
  highThreshold: number
): ImageData {
  const sobelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ];
  const sobelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ];

  const gradientX = applyConvolution(imageData, sobelX);
  const gradientY = applyConvolution(imageData, sobelY);
  const data = new Uint8ClampedArray(imageData.data);
  const width = imageData.width;
  const height = imageData.height;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      const gx = gradientX.data[idx];
      const gy = gradientY.data[idx];
      const magnitude = Math.sqrt(gx * gx + gy * gy);

      if (magnitude > highThreshold) {
        data[idx] = data[idx + 1] = data[idx + 2] = 255;
      } else if (magnitude > lowThreshold) {
        data[idx] = data[idx + 1] = data[idx + 2] = 128;
      } else {
        data[idx] = data[idx + 1] = data[idx + 2] = 0;
      }
    }
  }

  return new ImageData(data, width, height);
}
