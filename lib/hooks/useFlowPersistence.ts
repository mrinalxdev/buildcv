'use client';

import { Node, Edge } from 'reactflow';

export function useFlowPersistence() {
  const handleSave = (nodes: Node[], edges: Edge[]) => {
    const flow = { nodes, edges };
    const json = JSON.stringify(flow);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'opencv-flow.json';
    link.click();
  };

  const handleLoad = (
    callback: (nodes: Node[], edges: Edge[]) => void
  ) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const flow = JSON.parse(e.target?.result as string);
        callback(flow.nodes, flow.edges);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return {
    handleSave,
    handleLoad,
  };
}