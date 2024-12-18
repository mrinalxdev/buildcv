import { NodeType } from '@/lib/types/node';

export const nodeTypes: Record<string, NodeType> = {
  imageInput: {
    type: 'imageInput',
    label: 'Image Input',
    category: 'Input/Output',
    params: [
      {
        name: 'imageUrl',
        type: 'text',
        default: ''
      }
    ],
    inputs: [],
    outputs: ['image']
  },
  output: {
    type: 'output',
    label: 'Output',
    category: 'Input/Output',
    params: [],
    inputs: ['image'],
    outputs: []
  },
  grayscale: {
    type: 'grayscale',
    label: 'Grayscale',
    category: 'Color',
    params: [],
    inputs: ['image'],
    outputs: ['image']
  },
  blur: {
    type: 'blur',
    label: 'Gaussian Blur',
    category: 'Filter',
    params: [
      {
        name: 'kernelSize',
        type: 'number',
        default: 3,
        min: 1,
        max: 21,
        step: 2
      },
      {
        name: 'sigma',
        type: 'number',
        default: 1.0,
        min: 0.1,
        max: 10,
        step: 0.1
      }
    ],
    inputs: ['image'],
    outputs: ['image']
  },
  threshold: {
    type: 'threshold',
    label: 'Threshold',
    category: 'Binary',
    params: [
      {
        name: 'threshold',
        type: 'number',
        default: 127,
        min: 0,
        max: 255,
        step: 1
      },
      {
        name: 'maxValue',
        type: 'number',
        default: 255,
        min: 0,
        max: 255,
        step: 1
      },
      {
        name: 'type',
        type: 'select',
        options: ['BINARY', 'BINARY_INV', 'TRUNC', 'TOZERO', 'TOZERO_INV'],
        default: 'BINARY'
      }
    ],
    inputs: ['image'],
    outputs: ['image']
  },
  edgeDetection: {
    type: 'edgeDetection',
    label: 'Edge Detection',
    category: 'Feature Detection',
    params: [
      {
        name: 'method',
        type: 'select',
        options: ['Sobel', 'Canny'],
        default: 'Canny'
      },
      {
        name: 'threshold1',
        type: 'number',
        default: 100,
        min: 0,
        max: 255,
        step: 1
      },
      {
        name: 'threshold2',
        type: 'number',
        default: 200,
        min: 0,
        max: 255,
        step: 1
      }
    ],
    inputs: ['image'],
    outputs: ['image']
  }
};