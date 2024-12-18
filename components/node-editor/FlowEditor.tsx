'use client';

import dynamic from 'next/dynamic';
import { ReactFlowProvider } from 'reactflow';
import { nodeTypes } from './NodeTypes';
import { ConnectionLine } from './ConnectionLine';
import { Toolbar } from './Toolbar';
import { UserProfile } from './UserProfile';
import { useNodeEditor } from '@/lib/hooks/useNodeEditor';
import { useFlowPersistence } from '@/lib/hooks/useFlowPersistence';

// Dynamically import ReactFlow components
const ReactFlow = dynamic(() => import('reactflow').then((mod) => mod.default), { ssr: false });
const Background = dynamic(() => import('reactflow').then((mod) => mod.Background), { ssr: false });
const Controls = dynamic(() => import('reactflow').then((mod) => mod.Controls), { ssr: false });
const Panel = dynamic(() => import('reactflow').then((mod) => mod.Panel), { ssr: false });

// Import styles only on client side
if (typeof window !== 'undefined') {
  import('reactflow/dist/style.css');
}

export function FlowEditor() {
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

  const { handleSave, handleLoad } = useFlowPersistence();

  const handleProcess = () => {
    console.log('Processing nodes:', nodes);
    console.log('Connections:', edges);
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
              onLoad={() => handleLoad((nodes, edges) => {
                setNodes(nodes);
                setEdges(edges);
              })}
            />
          </Panel>
        </ReactFlow>
        <UserProfile />
      </ReactFlowProvider>
    </div>
  );
}