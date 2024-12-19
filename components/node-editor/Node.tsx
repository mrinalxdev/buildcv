import { Handle, Position } from "reactflow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { nodeTypes } from "@/lib/nodes/nodeTypes";
import { ImagePreview } from "./ImagePreview";

interface NodeData {
  type: string;
  params: Record<string, any>;
  handleParamChange: (nodeId: string, paramName: string, value: any) => void;
}

interface NodeProps {
  id: string;
  data: NodeData;
}


export function Node({ data, id }: NodeProps) {
  const nodeConfig = nodeTypes[data.type];
  if (!nodeConfig) return null;

  console.log('Node render:', { id, data, handleParamChange: !!data.handleParamChange });

  const handleChange = (paramName: string, value: any) => {
    console.log('Parameter change:', { id, paramName, value });
    if (data.handleParamChange) {
      data.handleParamChange(id, paramName, value);
    } else {
      console.error('handleParamChange is not defined');
    }
  };

  return (
    <Card className="w-[280px] shadow-md">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">
          {nodeConfig.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nodeConfig.params.map((param) => (
          <div key={param.name} className="space-y-2">
            <Label>{param.name}</Label>
            {param.type === "text" && (
              <div className="flex gap-2">
                <Input
                  value={data.params[param.name] || ""}
                  onChange={(e) => data.handleParamChange(id, param.name, e.target.value)}
                  placeholder="Enter image URL"
                />
                {param.name === "imageUrl" && data.params[param.name] && (
                  <ImagePreview url={data.params[param.name]} />
                )}
              </div>
            )}
            {param.type === "number" && (
              <Input
                type="number"
                value={data.params[param.name]}
                onChange={(e) =>
                  data.handleParamChange(id, param.name, Number(e.target.value))
                }
                min={param.min}
                max={param.max}
                step={param.step}
              />
            )}
            {param.type === "select" && (
              <Select
                value={data.params[param.name]}
                onValueChange={(value) =>
                  data.handleParamChange(id, param.name, value)
                }
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
