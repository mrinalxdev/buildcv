"use client";

import { Node, Edge } from "reactflow";
import { useEffect } from "react";

const STORAGE_KEY = "opencv-flow-state";

export function useFlowPersistence() {
  const handleSave = (nodes: Node[], edges: Edge[]) => {
    const flow = { nodes, edges };
    const json = JSON.stringify(flow);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "opencv-flow.json";
    link.click();
  };

  const handleLoad = (callback: (nodes: Node[], edges: Edge[]) => void) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
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

  const saveToLocalStorage = (nodes: Node[], edges: Edge[]) => {
    const flow = { nodes, edges };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flow));
  };

  const loadFromLocalStorage = () : { nodes : Node[]; edges : Edge[]; } | null => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  }

  return {
    handleSave,
    handleLoad,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
}
