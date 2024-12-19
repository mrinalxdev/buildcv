"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { nodeTypes } from "@/lib/nodes/nodeTypes";
import { Plus, Play, Save, Upload, Loader2 } from "lucide-react";

interface ToolbarProps {
  onAddNode: (type: string) => void;
  onProcess: () => void;
  onSave: () => void;
  onLoad: () => void;
  isProcessing: boolean;
}

export function Toolbar({
  onAddNode,
  onProcess,
  onSave,
  onLoad,
  isProcessing,
}: ToolbarProps) {
  // Group nodes by category
  const nodesByCategory = Object.entries(nodeTypes).reduce(
    (acc, [key, node]) => {
      if (!acc[node.category]) {
        acc[node.category] = [];
      }
      acc[node.category].push({ type: key, ...node });
      return acc;
    },
    {} as Record<string, any[]>
  );

  return (
    <div className="flex gap-2 bg-card p-2 rounded-lg shadow-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Node
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {Object.entries(nodesByCategory).map(([category, nodes]) => (
            <div key={category}>
              <DropdownMenuLabel>{category}</DropdownMenuLabel>
              <DropdownMenuGroup>
                {nodes.map((node) => (
                  <DropdownMenuItem
                    key={node.type}
                    onClick={() => onAddNode(node.type)}
                  >
                    {node.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="default"
        size="sm"
        onClick={onProcess}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Play className="h-4 w-4 mr-2" />
        )}
        Process
      </Button>

      <Button variant="outline" size="sm" onClick={onSave}>
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>

      <Button variant="outline" size="sm" onClick={onLoad}>
        <Upload className="h-4 w-4 mr-2" />
        Load
      </Button>
    </div>
  );
}
