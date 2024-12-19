"use client";

import dynamic from "next/dynamic";
import { ReactFlowProvider } from "reactflow";
import { nodeTypes } from "./NodeTypes";
import { ConnectionLine } from "./ConnectionLine";
import { Toolbar } from "./Toolbar";
import { UserProfile } from "./UserProfile";
import { useNodeEditor } from "@/lib/hooks/useNodeEditor";
import { useFlowPersistence } from "@/lib/hooks/useFlowPersistence";
import { useEffect, useMemo, useState } from "react";
import { toast, useToast } from "@/hooks/use-toast";
import { processImage } from "@/lib/nodes/processors/imageProcessor";
import ComparisonDialog from "./ComparisonDialog";

const ReactFlow = dynamic(
  () => import("reactflow").then((mod) => mod.default),
  { ssr: false }
);
const Background = dynamic(
  () => import("reactflow").then((mod) => mod.Background),
  { ssr: false }
);
const Controls = dynamic(
  () => import("reactflow").then((mod) => mod.Controls),
  { ssr: false }
);
const Panel = dynamic(() => import("reactflow").then((mod) => mod.Panel), {
  ssr: false,
});

if (typeof window !== "undefined") {
  import("reactflow/dist/style.css");
}

export function FlowEditor() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [porcessedImages, setProcessedImages] = useState<{
    inputImage: string | null;
    outputImage: string | null;
  }>({ inputImage: null, outputImage: null });

  const { toast } = useToast();

  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleAddNode,
    handleParamChange,
  } = useNodeEditor();

  const { handleSave, handleLoad, saveToLocalStorage, loadFromLocalStorage } =
    useFlowPersistence();

    const customNodeTypes = useMemo(
      () => ({
        customNode: (props: any) => ({
          ...props,
          data: {
            ...props.data,
            handleParamChange: (nodeId: string, paramName: string, value: any) =>
              handleParamChange(nodeId, paramName, value),
          },
        }),
      }),
      [handleParamChange]
    );

  // loading the data
  // todo : Finish dinner and work getting and setting the data
  useEffect(() => {
    const savedFlow = loadFromLocalStorage();
    if (savedFlow) {
      const nodesWithHandlers = savedFlow.nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          handleParamChange: (nodeId: string, paramName: string, value: any) =>
            handleParamChange(nodeId, paramName, value),
        },
      }));
      setNodes(nodesWithHandlers);
      setEdges(savedFlow.edges);
    }
  }, []);

  // Save flow on changes
  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      // Strip the function before saving
      const nodesForStorage = nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          handleParamChange: undefined,
        },
      }));
      saveToLocalStorage(nodesForStorage, edges);
    }
  }, [nodes, edges]);

  const handleProcess = async () => {
    try {
      setIsProcessing(true);

      const inputNode = nodes.find((n) => n.type === "imageInput");
      if (!inputNode) {
        throw new Error("No input node found in the worflow");
      }
      if (!inputNode.data.params.imageurl) {
        throw new Error("Please provide an input image URL");
      }

      const result = await processImage(nodes, edges);
      setProcessedImages(result);
      setShowComparison(true);
    } catch (error) {
      toast({
        title: "Processing Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during processing",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full h-screen bg-background">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionLineComponent={ConnectionLine}
          fitView
          className="bg-muted/50"
        >
          <Background />
          <Controls />
          <Panel position="top" className="w-full flex justify-center p-2">
            <Toolbar
              onAddNode={handleAddNode}
              onProcess={handleProcess}
              onSave={() => handleSave(nodes, edges)}
              onLoad={() =>
                handleLoad((nodes, edges) => {
                  setNodes(nodes);
                  setEdges(edges);
                })
              }
              isProcessing={isProcessing}
            />
          </Panel>
        </ReactFlow>
        <UserProfile />
        <ComparisonDialog
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
          inputImage={porcessedImages.inputImage}
          outputImage={porcessedImages.outputImage}
        />
      </ReactFlowProvider>
    </div>
  );
}
