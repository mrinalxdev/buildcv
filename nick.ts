// I am building a opencv building using node-interface editor using shadcn and nextjs
// here is the project architecture
// app > workflow(folder), layout.tsx, page.tsx
// components > node-editor > ConnectionLine.tsx, FlowEditor.tsx, ImagePreview.tsx, Node.tsx, NodeTypes.ts, Preview.tsx, Toolbar.tsx, UserProfile
// hooks > use-toast.ts
// lib > hooks > useFlowPresistence.ts, useImageProcessing.ts, useNodeEditor.ts
// lib > nodes > prcossors> imageProcessor.ts
// lib > nodes > nodeTypes.ts
// lib > types > node.ts

// app/page.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800 overflow-y-hidden">
//       <header className="container mx-auto px-4 py-6 border-b shadow-md rounded-xl">
//         <nav className="flex justify-between items-center">
//           <div className="text-2xl font-bold">
//             <span className="text-slate-900">BuildCV</span>
//           </div>
//           <div>
//             <Link href="/about" className="px-3">
//               About
//             </Link>
//             <Link href="/demo" className="px-3">
//               Demo
//             </Link>
//             <Link href="/Contact" className="px-3">
//               Contact
//             </Link>
//           </div>
//           <Button className="transition-colors duration-300" variant="outline">
//             Github
//           </Button>
//         </nav>
//       </header>

//       <main className="container mx-auto px-4 py-20">
//         <div className="text-center mb-20">
//           <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
//             Build Custom <br />
//             <span className="">OpenCV Algorithms</span>
//           </h1>
//           <p className="text-lg  md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
//             Build and export algorithms in JSON and Python Code.
//           </p>
//           <Link href={"/workflow"}>
//             <Button>Get Started</Button>
//           </Link>

//           <Button variant="outline" className="ml-4 px-4 py-3">
//             Documentation
//           </Button>
//         </div>
//         <div className="relative">
//           {/* Gradient shadow */}
//           <div className="absolute -bottom-4 -right-4 left-4 top-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg blur-xl"></div>

//           {/* Image container */}
//           <div className="relative">
//             <Image
//               src="/hero3.png"
//               width={1200}
//               height={675}
//               alt="Hero Image"
//               className="rounded-lg shadow-lg w-full h-auto transition-transform duration-300 hover:scale-[1.02]"
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// app/workflows/page.tsx
{
  /*  
    import { FlowEditor } from "@/components/node-editor/FlowEditor";
    
    const Page = () => {
        return <FlowEditor />
    }
     
    export default Page;
    */
}

// components/node-editor/ConnectionLine.tsx
{
  /* 

    'use client';
    
    import { ConnectionLineComponentProps } from 'reactflow';
    
    export function ConnectionLine({
      fromX,
      fromY,
      fromPosition,
      toX,
      toY,
      toPosition,
    }: ConnectionLineComponentProps) {
      const deltaX = toX - fromX;
      const deltaY = toY - fromY;
      const controlPointX = fromX + deltaX * 0.5;
    
      const path = `M${fromX},${fromY} C${controlPointX},${fromY} ${controlPointX},${toY} ${toX},${toY}`;
    
      return (
        <g>
          <path
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            className="animated-path"
            d={path}
          />
          <path
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={4}
            strokeOpacity={0.1}
            d={path}
          />
        </g>
      );
    }
    */
}

//component/node-editor/ComparisonDialog.tsx
// import { Dialog, DialogContent } from "@radix-ui/react-dialog";
// import { DialogHeader, DialogTitle } from "../ui/dialog";
// import { Button } from "../ui/button";
// import { Download } from "lucide-react";

// interface ComparisonDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   inputImage: string | null;
//   outputImage: string | null;
// }

// const ComparisonDialog = ({
//   isOpen,
//   onClose,
//   inputImage,
//   outputImage,
// }: ComparisonDialogProps) => {
//   const handleDownload = (imageUrl: string, prefix: string) => {
//     const link = document.createElement("a");
//     link.href = imageUrl;
//     link.download = `${prefix} - ${new Date().getTime()}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-4xl">
//         <DialogHeader>
//           <DialogTitle>Image Processing Result</DialogTitle>
//         </DialogHeader>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <h1 className="font-title">Input Image</h1>
//             {inputImage ? (
//               <div className="relative group">
//                 <img
//                   src={inputImage}
//                   className="w-full h-auto rounded-lg border"
//                   alt=""
//                 />
//                 <Button
//                   size="icon"
//                   variant="secondary"
//                   className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                 >
//                   <Download className="h-4 w-4" />
//                 </Button>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
//                 No Input Image
//               </div>
//             )}
//           </div>
//           <div className="space-y-2">
//             <h1 className="font-title">Ouput Image</h1>
//             {outputImage ? (
//               <div className="relative group">
//                 <img
//                   src={outputImage}
//                   className="w-full h-auto rounded-lg border"
//                   alt=""
//                 />
//                 <Button
//                   size="icon"
//                   variant="secondary"
//                   className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//                   onClick={() => handleDownload(outputImage, 'output')}
//                 >
//                     <Download className="h-4 w-4" />
//                 </Button>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-48 bg-muted rounded-lg">
//                 Processing failed
//               </div>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ComparisonDialog;


//components/node-editor/FlowEditor.tsx
// "use client";

// import dynamic from "next/dynamic";
// import { ReactFlowProvider } from "reactflow";
// import { nodeTypes } from "./NodeTypes";
// import { ConnectionLine } from "./ConnectionLine";
// import { Toolbar } from "./Toolbar";
// import { UserProfile } from "./UserProfile";
// import { useNodeEditor } from "@/lib/hooks/useNodeEditor";
// import { useFlowPersistence } from "@/lib/hooks/useFlowPersistence";
// import { useEffect, useState } from "react";
// import { toast, useToast } from "@/hooks/use-toast";
// import { processImage } from "@/lib/nodes/processors/imageProcessor";
// import ComparisonDialog from "./ComparisonDialog";

// const ReactFlow = dynamic(
//   () => import("reactflow").then((mod) => mod.default),
//   { ssr: false }
// );
// const Background = dynamic(
//   () => import("reactflow").then((mod) => mod.Background),
//   { ssr: false }
// );
// const Controls = dynamic(
//   () => import("reactflow").then((mod) => mod.Controls),
//   { ssr: false }
// );
// const Panel = dynamic(() => import("reactflow").then((mod) => mod.Panel), {
//   ssr: false,
// });

// if (typeof window !== "undefined") {
//   import("reactflow/dist/style.css");
// }

// export function FlowEditor() {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [showComparison, setShowComparison] = useState(false);
//   const [porcessedImages, setProcessedImages] = useState<{
//     inputImage: string | null;
//     outputImage: string | null;
//   }>({ inputImage: null, outputImage: null });

//   const { toast } = useToast();

//   const {
//     nodes,
//     edges,
//     setNodes,
//     setEdges,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//     handleAddNode,
//     handleParamChange,
//   } = useNodeEditor();

//   const { handleSave, handleLoad, saveToLocalStorage, loadFromLocalStorage } =
//     useFlowPersistence();

//   // loading the data
//   // todo : Finish dinner and work getting and setting the data
//   useEffect(() => {
//     const savedFlow = loadFromLocalStorage();
//     if (savedFlow) {
//       setNodes(savedFlow.nodes);
//       setEdges(savedFlow.edges);
//     }
//   }, []);

//   useEffect(() => {
//     if (nodes.length > 0 || edges.length > 0) {
//       saveToLocalStorage(nodes, edges);
//     }
//   }, [nodes, edges]);

//   const handleProcess = async () => {
//     try {
//       setIsProcessing(true);

//       const inputNode = nodes.find((n) => n.type === "imageInput");
//       if (!inputNode) {
//         throw new Error("No input node found in the worflow");
//       }
//       if (!inputNode.data.params.imageurl) {
//         throw new Error("Please provide an input image URL");
//       }

//       const result = await processImage(nodes, edges);
//       setProcessedImages(result);
//       setShowComparison(true);
//     } catch (error) {
//       toast({
//         title: "Processing Error",
//         description:
//           error instanceof Error
//             ? error.message
//             : "An error occurred during processing",
//         variant: "destructive",
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="w-full h-screen bg-background">
//       <ReactFlowProvider>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           nodeTypes={nodeTypes}
//           connectionLineComponent={ConnectionLine}
//           fitView
//           className="bg-muted/50"
//         >
//           <Background />
//           <Controls />
//           <Panel position="top" className="w-full flex justify-center p-2">
//             <Toolbar
//               onAddNode={handleAddNode}
//               onProcess={handleProcess}
//               onSave={() => handleSave(nodes, edges)}
//               onLoad={() =>
//                 handleLoad((nodes, edges) => {
//                   setNodes(nodes);
//                   setEdges(edges);
//                 })
//               }
//               isProcessing={isProcessing}
//             />
//           </Panel>
//         </ReactFlow>
//         <UserProfile />
//         <ComparisonDialog
//           isOpen={showComparison}
//           onClose={() => setShowComparison(false)}
//           inputImage={porcessedImages.inputImage}
//           outputImage={porcessedImages.outputImage}
//         />
//       </ReactFlowProvider>
//     </div>
//   );
// }



//components/node-editor/ImagePreview.tsx

{
  /*
    'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon } from 'lucide-react';

interface ImagePreviewProps {
  url: string;
}

export function ImagePreview({ url }: ImagePreviewProps) {
  const [error, setError] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={error ? 'text-destructive' : ''}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <img
          src={url}
          alt="Preview"
          className="w-full h-auto rounded-md"
          onError={() => setError(true)}
          onLoad={() => setError(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
    */
}

// components/node-editor/Node.tsx
{
   /*

   'use client';

import { Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { nodeTypes } from '@/lib/nodes/nodeTypes';
import { ImagePreview } from './ImagePreview';

export function Node({ data, id }: { data: any; id: string }) {
  const nodeConfig = nodeTypes[data.type];
  if (!nodeConfig) return null;

  const handleParamChange = (paramName: string, value: any) => {
    data.handleParamChange(id, paramName, value);
  };

  return (
    <Card className="w-[280px] shadow-md">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">{nodeConfig.label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nodeConfig.params.map((param) => (
          <div key={param.name} className="space-y-2">
            <Label>{param.name}</Label>
            {param.type === 'text' && (
              <div className="flex gap-2">
                <Input
                  value={data.params[param.name] || ''}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  placeholder="Enter image URL"
                />
                {param.name === 'imageUrl' && data.params[param.name] && (
                  <ImagePreview url={data.params[param.name]} />
                )}
              </div>
            )}
            {param.type === 'number' && (
              <Input
                type="number"
                value={data.params[param.name]}
                onChange={(e) => handleParamChange(param.name, Number(e.target.value))}
                min={param.min}
                max={param.max}
                step={param.step}
              />
            )}
            {param.type === 'select' && (
              <Select
                value={data.params[param.name]}
                onValueChange={(value) => handleParamChange(param.name, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${param.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {param.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}
        {nodeConfig.inputs.map((input, index) => (
          <Handle
            key={`input-${index}`}
            type="target"
            position={Position.Left}
            id={input}
            style={{ top: `${(index + 1) * 25}%` }}
            className="w-3 h-3 bg-primary border-2 border-background"
          />
        ))}
        {nodeConfig.outputs.map((output, index) => (
          <Handle
            key={`output-${index}`}
            type="source"
            position={Position.Right}
            id={output}
            style={{ top: `${(index + 1) * 25}%` }}
            className="w-3 h-3 bg-primary border-2 border-background"
          />
        ))}
      </CardContent>
    </Card>
  );
}

   */
}

// components/node-editor/NodeTypes.ts

{
    /*
    import { Node } from './Node';
    
    export const nodeTypes = {
      customNode: Node,
    } as const;
    */
}


// components/node-editor/Preview.tsx

{
    /*
    'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface PreviewProps {
  processing: boolean;
  preview: string | null;
}

export function Preview({ processing, preview }: PreviewProps) {
  return (
    <Card className="absolute right-4 bottom-4 w-[300px]">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {processing ? (
          <div className="flex items-center justify-center h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto rounded-md"
          />
        ) : (
          <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">
            Process an image to see preview
          </div>
        )}
      </CardContent>
    </Card>
  );
}
    */
}

//components/node-editor/Toolbar.tsx

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { nodeTypes } from "@/lib/nodes/nodeTypes";
// import { Plus, Play, Save, Upload, Loader2 } from "lucide-react";

// interface ToolbarProps {
//   onAddNode: (type: string) => void;
//   onProcess: () => void;
//   onSave: () => void;
//   onLoad: () => void;
//   isProcessing: boolean;
// }

// export function Toolbar({
//   onAddNode,
//   onProcess,
//   onSave,
//   onLoad,
//   isProcessing,
// }: ToolbarProps) {
//   // Group nodes by category
//   const nodesByCategory = Object.entries(nodeTypes).reduce(
//     (acc, [key, node]) => {
//       if (!acc[node.category]) {
//         acc[node.category] = [];
//       }
//       acc[node.category].push({ type: key, ...node });
//       return acc;
//     },
//     {} as Record<string, any[]>
//   );

//   return (
//     <div className="flex gap-2 bg-card p-2 rounded-lg shadow-sm">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="outline" size="sm">
//             <Plus className="h-4 w-4 mr-2" />
//             Add Node
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56">
//           {Object.entries(nodesByCategory).map(([category, nodes]) => (
//             <div key={category}>
//               <DropdownMenuLabel>{category}</DropdownMenuLabel>
//               <DropdownMenuGroup>
//                 {nodes.map((node) => (
//                   <DropdownMenuItem
//                     key={node.type}
//                     onClick={() => onAddNode(node.type)}
//                   >
//                     {node.label}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuGroup>
//               <DropdownMenuSeparator />
//             </div>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <Button
//         variant="default"
//         size="sm"
//         onClick={onProcess}
//         disabled={isProcessing}
//       >
//         {isProcessing ? (
//           <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//         ) : (
//           <Play className="h-4 w-4 mr-2" />
//         )}
//         Process
//       </Button>

//       <Button variant="outline" size="sm" onClick={onSave}>
//         <Save className="h-4 w-4 mr-2" />
//         Save
//       </Button>

//       <Button variant="outline" size="sm" onClick={onLoad}>
//         <Upload className="h-4 w-4 mr-2" />
//         Load
//       </Button>
//     </div>
//   );
// }


//components/node-editor/UserProfile.tsx
// 'use client';

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Settings, LogOut, User } from 'lucide-react';

// export function UserProfile() {
//   return (
//     <div className="fixed top-6 right-[3rem] flex items-center gap-4">
      
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="relative h-10 w-10 rounded-full">
//             <Avatar className="h-15 w-16">
//               <AvatarImage src="https://pbs.twimg.com/profile_images/1862004271866327040/rThY3jKl_400x400.jpg" className='bg-black p-1 rounded-full' />
//               <AvatarFallback>JS</AvatarFallback>
//             </Avatar>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-56" align="end">
//           <DropdownMenuLabel>My Account</DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>
//             <User className="mr-2 h-4 w-4" />
//             Profile
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Settings className="mr-2 h-4 w-4" />
//             Settings
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem className="text-destructive">
//             <LogOut className="mr-2 h-4 w-4" />
//             Log out
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }

// lib/hooks/useFlowPresistence.ts

// "use client";

// 'use client';

// import { Node, Edge } from 'reactflow';
// import { useEffect } from 'react';

// const STORAGE_KEY = 'opencv-flow-state';

// export function useFlowPersistence() {
//   const handleSave = (nodes: Node[], edges: Edge[]) => {
//     // Save to file
//     const flow = { nodes, edges };
//     const json = JSON.stringify(flow);
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = 'opencv-flow.json';
//     link.click();

//     // Also save to localStorage
//     saveToLocalStorage(nodes, edges);
//   };

//   const handleLoad = (
//     callback: (nodes: Node[], edges: Edge[]) => void
//   ) => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = '.json';
//     input.onchange = (e: any) => {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const flow = JSON.parse(e.target?.result as string);
//         callback(flow.nodes, flow.edges);
//         // Also save to localStorage when loading from file
//         saveToLocalStorage(flow.nodes, flow.edges);
//       };
//       reader.readAsText(file);
//     };
//     input.click();
//   };

//   const saveToLocalStorage = (nodes: Node[], edges: Edge[]) => {
//     const flow = { nodes, edges };
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(flow));
//   };

//   const loadFromLocalStorage = (): { nodes: Node[]; edges: Edge[]; } | null => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     return saved ? JSON.parse(saved) : null;
//   };

//   return {
//     handleSave,
//     handleLoad,
//     saveToLocalStorage,
//     loadFromLocalStorage,
//   };
// }

//lib/hooks/useImageProcessing.ts
// 'use client';

// 'use client';

// import { useState } from 'react';
// import { Node, Edge } from 'reactflow';
// import { processImage } from '@/lib/nodes/processors/imageProcessor';

// export function useImageProcessing() {
//   const [processing, setProcessing] = useState(false);
//   const [preview, setPreview] = useState<string | null>(null);

//   const processFlow = async (nodes: Node[], edges: Edge[]) => {
//     setProcessing(true);
//     try {
//       // Find output node
//       const outputNode = nodes.find(node => 
//         node.data.type === 'output' || 
//         !edges.some(edge => edge.source === node.id)
//       );

//       if (!outputNode) {
//         throw new Error('No output node found');
//       }

//       const result = await processImage(
//         nodes as any,
//         edges as any,
//         outputNode.id
//       );

//       if (result) {
//         // Convert ImageData to base64 for preview
//         const canvas = document.createElement('canvas');
//         canvas.width = result.width;
//         canvas.height = result.height;
//         const ctx = canvas.getContext('2d')!;
//         ctx.putImageData(result, 0, 0);
//         setPreview(canvas.toDataURL());
//       }
//     } catch (error) {
//       console.error('Processing error:', error);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return {
//     processing,
//     preview,
//     processFlow,
//   };
// }

// lib/useNodeEditor.ts
// 'use client';

// import { useState, useCallback } from 'react';
// import {
//   Node,
//   Edge,
//   Connection,
//   addEdge,
//   applyNodeChanges,
//   applyEdgeChanges,
//   OnNodesChange,
//   OnEdgesChange,
//   OnConnect,
// } from 'reactflow';
// import { nodeTypes } from '@/lib/nodes/nodeTypes';

// export function useNodeEditor() {
//   const [nodes, setNodes] = useState<Node[]>([]);
//   const [edges, setEdges] = useState<Edge[]>([]);

//   const onNodesChange: OnNodesChange = useCallback(
//     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
//     []
//   );

//   const onEdgesChange: OnEdgesChange = useCallback(
//     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
//     []
//   );

//   const onConnect: OnConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     []
//   );

//   const handleAddNode = useCallback((type: string) => {
//     const nodeConfig = nodeTypes[type];
//     if (!nodeConfig) return;

//     const defaultParams = nodeConfig.params.reduce((acc, param) => {
//       acc[param.name] = param.default;
//       return acc;
//     }, {} as Record<string, any>);

//     const newNode: Node = {
//       id: `${type}-${Date.now()}`,
//       type: 'customNode',
//       position: { 
//         x: Math.random() * 500, 
//         y: Math.random() * 500 
//       },
//       data: { 
//         type,
//         params: defaultParams,
//         handleParamChange: (paramName: string, value: any) => {
//           handleParamChange(newNode.id, paramName, value);
//         },
//       },
//     };
//     setNodes((nodes) => [...nodes, newNode]);
//   }, []);

//   const handleParamChange = useCallback((nodeId: string, paramName: string, value: any) => {
//     setNodes((nodes) =>
//       nodes.map((node) =>
//         node.id === nodeId
//           ? {
//               ...node,
//               data: {
//                 ...node.data,
//                 params: { ...node.data.params, [paramName]: value },
//               },
//             }
//           : node
//       )
//     );
//   }, []);

//   return {
//     nodes,
//     edges,
//     setNodes,
//     setEdges,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//     handleAddNode,
//     handleParamChange,
//   };
// }

// lib/nodes/imageProcessor.ts
// 'use client';

// import { NodeData, Connection } from '@/lib/types/node';

// export async function processImage(nodes: NodeData[], connections: Connection[], startNodeId: string): Promise<ImageData | null> {
//   const processedNodes = new Set<string>();
//   const nodeOutputs = new Map<string, ImageData>();

//   async function processNode(nodeId: string): Promise<ImageData | null> {
//     if (processedNodes.has(nodeId)) {
//       return nodeOutputs.get(nodeId) || null;
//     }

//     const node = nodes.find(n => n.id === nodeId);
//     if (!node) return null;

//     // Get input connections for this node
//     const inputConnections = connections.filter(c => c.target === nodeId);
    
//     // Process all input nodes first
//     const inputs = await Promise.all(
//       inputConnections.map(async conn => {
//         return await processNode(conn.source);
//       })
//     );

//     // Process current node based on its type
//     let result: ImageData | null = null;
    
//     switch (node.type) {
//       case 'imageInput':
//         // Handle image input
//         result = await loadImageData(node.data.params.imageUrl);
//         break;
        
//       case 'grayscale':
//         if (inputs[0]) {
//           result = await applyGrayscale(inputs[0]);
//         }
//         break;
        
//       case 'blur':
//         if (inputs[0]) {
//           result = await applyBlur(inputs[0], node.data.params);
//         }
//         break;
        
//       case 'threshold':
//         if (inputs[0]) {
//           result = await applyThreshold(inputs[0], node.data.params);
//         }
//         break;
//     }

//     if (result) {
//       processedNodes.add(nodeId);
//       nodeOutputs.set(nodeId, result);
//     }

//     return result;
//   }

//   return processNode(startNodeId);
// }

// // Helper functions for image processing
// async function loadImageData(url: string): Promise<ImageData> {
//   const img = new Image();
//   img.src = url;
//   await img.decode();
  
//   const canvas = document.createElement('canvas');
//   canvas.width = img.width;
//   canvas.height = img.height;
//   const ctx = canvas.getContext('2d')!;
//   ctx.drawImage(img, 0, 0);
//   return ctx.getImageData(0, 0, canvas.width, canvas.height);
// }

// async function applyGrayscale(imageData: ImageData): Promise<ImageData> {
//   const data = imageData.data;
//   for (let i = 0; i < data.length; i += 4) {
//     const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
//     data[i] = data[i + 1] = data[i + 2] = gray;
//   }
//   return imageData;
// }

// async function applyBlur(imageData: ImageData, params: any): Promise<ImageData> {
//   // Implement Gaussian blur
//   // This is a simplified version - you'd want to implement a proper Gaussian blur
//   return imageData; // Placeholder
// }

// async function applyThreshold(imageData: ImageData, params: any): Promise<ImageData> {
//   const data = imageData.data;
//   const threshold = params.threshold;
//   const maxValue = params.maxValue;
  
//   for (let i = 0; i < data.length; i += 4) {
//     const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
//     const value = gray < threshold ? 0 : maxValue;
//     data[i] = data[i + 1] = data[i + 2] = value;
//   }
  
//   return imageData;
// }

// lib/node/nodeTypes.ts
// import { NodeType } from '@/lib/types/node';

// export const nodeTypes: Record<string, NodeType> = {
//   imageInput: {
//     type: 'imageInput',
//     label: 'Image Input',
//     category: 'Input/Output',
//     params: [
//       {
//         name: 'imageUrl',
//         type: 'text',
//         default: ''
//       }
//     ],
//     inputs: [],
//     outputs: ['image']
//   },
//   output: {
//     type: 'output',
//     label: 'Output',
//     category: 'Input/Output',
//     params: [],
//     inputs: ['image'],
//     outputs: []
//   },
//   grayscale: {
//     type: 'grayscale',
//     label: 'Grayscale',
//     category: 'Color',
//     params: [],
//     inputs: ['image'],
//     outputs: ['image']
//   },
//   blur: {
//     type: 'blur',
//     label: 'Gaussian Blur',
//     category: 'Filter',
//     params: [
//       {
//         name: 'kernelSize',
//         type: 'number',
//         default: 3,
//         min: 1,
//         max: 21,
//         step: 2
//       },
//       {
//         name: 'sigma',
//         type: 'number',
//         default: 1.0,
//         min: 0.1,
//         max: 10,
//         step: 0.1
//       }
//     ],
//     inputs: ['image'],
//     outputs: ['image']
//   },
//   threshold: {
//     type: 'threshold',
//     label: 'Threshold',
//     category: 'Binary',
//     params: [
//       {
//         name: 'threshold',
//         type: 'number',
//         default: 127,
//         min: 0,
//         max: 255,
//         step: 1
//       },
//       {
//         name: 'maxValue',
//         type: 'number',
//         default: 255,
//         min: 0,
//         max: 255,
//         step: 1
//       },
//       {
//         name: 'type',
//         type: 'select',
//         options: ['BINARY', 'BINARY_INV', 'TRUNC', 'TOZERO', 'TOZERO_INV'],
//         default: 'BINARY'
//       }
//     ],
//     inputs: ['image'],
//     outputs: ['image']
//   },
//   edgeDetection: {
//     type: 'edgeDetection',
//     label: 'Edge Detection',
//     category: 'Feature Detection',
//     params: [
//       {
//         name: 'method',
//         type: 'select',
//         options: ['Sobel', 'Canny'],
//         default: 'Canny'
//       },
//       {
//         name: 'threshold1',
//         type: 'number',
//         default: 100,
//         min: 0,
//         max: 255,
//         step: 1
//       },
//       {
//         name: 'threshold2',
//         type: 'number',
//         default: 200,
//         min: 0,
//         max: 255,
//         step: 1
//       }
//     ],
//     inputs: ['image'],
//     outputs: ['image']
//   }
// };

