export interface NodeData {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    type: any;
    params: Record<string, any>;
    preview?: string;
  };
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

export interface NodeType {
  type: string;
  label: string;
  category: string;
  params: {
    name: string;
    type: 'number' | 'select' | 'boolean' | 'text';
    options?: string[];
    default: any;
  }[];
  inputs: string[];
  outputs: string[];
}