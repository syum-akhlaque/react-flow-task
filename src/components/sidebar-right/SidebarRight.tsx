"use client";

import { FlowNode } from "@/types/flow";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SidebarRightProps {
  node: FlowNode | null;
  handleExport: () => void;
}

const SidebarRight: React.FC<SidebarRightProps> = ({ node, handleExport }) => {
  if (!node)
    return (
      <div className="w-64 bg-gray-100 p-4 border-l">No node selected</div>
    );

  return (
    <div className="w-64 bg-gray-100 p-4 border-l">
      <div className="p-2 border-b flex gap-2">
        <Button onClick={handleExport}>Export</Button>
        {/* <Input type="file" accept="application/json" onChange={handleImport} /> */}
      </div>
      <h3 className="font-semibold mb-2">Properties</h3>
      <p>
        <strong>ID:</strong> {node.id}
      </p>
      <p>
        <strong>Type:</strong> {node.type}
      </p>
      <p>
        <strong>Label:</strong> {node.ariaLabel}
      </p>
      <pre className="mt-2 bg-gray-200 p-2 rounded text-xs">
        {JSON.stringify(node.data, null, 2)}
      </pre>
    </div>
  );
};

export default SidebarRight;
