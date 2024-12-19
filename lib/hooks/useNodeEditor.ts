import { useState, useCallback } from "react";
import {
  Node,
  Edge,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "reactflow";
import { nodeTypes } from "@/lib/nodes/nodeTypes";

export function useNodeEditor() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleParamChange = useCallback(
    (nodeId: string, paramName: string, value: any) => {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  params: { ...node.data.params, [paramName]: value },
                },
              }
            : node
        )
      );
    },
    []
  );

  const handleAddNode = useCallback(
    (type: string) => {
      const nodeConfig = nodeTypes[type];
      if (!nodeConfig) return;

      const defaultParams = nodeConfig.params.reduce((acc, param) => {
        acc[param.name] = param.default;
        return acc;
      }, {} as Record<string, any>);

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type: "customNode",
        position: {
          x: Math.random() * 500,
          y: Math.random() * 500,
        },
        data: {
          type,
          params: defaultParams,
          handleParamChange, // Pass the function reference directly
        },
      };
      setNodes((nodes) => [...nodes, newNode]);
    },
    [handleParamChange]
  ); // Add handleParamChange to dependencies

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleAddNode,
    handleParamChange,
  };
}
