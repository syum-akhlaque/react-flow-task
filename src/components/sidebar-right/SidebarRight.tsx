"use client";

import { FlowNode } from "@/types/flow";

interface SidebarRightProps {
  node: FlowNode | null;
}

const SidebarRight: React.FC<SidebarRightProps> = ({ node }) => {
  if (!node)
    return (
      <div className="w-64 bg-gray-100 p-4 border-l">No node selected</div>
    );

  return (
    <div className="w-64 bg-gray-100 p-4 border-l">
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
