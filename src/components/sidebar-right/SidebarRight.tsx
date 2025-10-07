"use client";

import { FlowNode } from "@/types/flow";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFlow } from "@/context/FlowContext";
import { Upload, Download, Settings2, ImageDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toPng } from "html-to-image";

interface SidebarRightProps {
  selectedNodeId: string | null;
}

const SidebarRight: React.FC<SidebarRightProps> = ({ selectedNodeId }) => {
  const { handleExportFlow, handleImportFlow, nodes } = useFlow();
  const [currentNode, setCurrentNode] = useState<FlowNode | null>(null);

  useEffect(() => {
    setCurrentNode(
      (nodes.find((n) => n.id === selectedNodeId) as FlowNode) || null
    );
  }, [nodes, selectedNodeId]);

  const handleExportAsPNG = async () => {
    const flowWrapper = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement;
    if (!flowWrapper) return;

    try {
      const dataUrl = await toPng(flowWrapper, {
        backgroundColor: "white",
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "flow-diagram.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("PNG export failed:", error);
    }
  };

  return (
    <div
      className="w-[270px] h-screen border-l border-gray-200 flex flex-col justify-between 
      bg-gradient-to-b from-white via-blue-50 to-blue-100"
    >
      {/* 🔹 Header Section */}
      <div className="p-4 border-b border-gray-200 flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          Flow Controls
        </h2>

        {/* 🔹 Top Row: Export & Import JSON */}
        <div className="flex gap-2 w-full">
          <Button
            onClick={handleExportFlow}
            size="sm"
            variant="outline"
            className="flex-1 flex items-center justify-center gap-1 bg-gray-50 hover:bg-gray-100 border-gray-300"
          >
            <Download size={14} /> Export
          </Button>

          <label className="flex-1 flex items-center justify-center gap-1 text-sm bg-gray-50 px-3 py-1.5 rounded-md border border-gray-300 hover:bg-gray-100 cursor-pointer transition">
            <Upload size={14} />
            Import
            <Input
              type="file"
              accept="application/json"
              onChange={handleImportFlow}
              className="hidden"
            />
          </label>
        </div>

        {/* 🔹 Export PNG button */}
        <Button
          onClick={handleExportAsPNG}
          size="sm"
          variant="outline"
          className="w-full flex items-center justify-center gap-1 bg-gray-50 hover:bg-gray-100 border-gray-300"
        >
          <ImageDown size={14} /> Export as PNG
        </Button>
      </div>

      {/* 🔹 Node Info Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        {currentNode ? (
          <>
            <div className="flex items-center gap-2 mb-3">
              <Settings2 size={16} className="text-blue-500" />
              <h3 className="text-base font-semibold text-gray-800">
                Node Properties
              </h3>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">ID:</span>
                <span className="font-medium text-gray-800">
                  {currentNode.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium text-gray-800">
                  {currentNode.type}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Label:</span>
                <span className="font-medium text-gray-800">
                  {currentNode.data?.label}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs uppercase text-gray-500 mb-1">Raw Data</h4>
              <pre className="bg-white/70 p-2 rounded-md text-xs border border-gray-200 overflow-x-auto">
                {JSON.stringify(currentNode.data, null, 2)}
              </pre>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm italic">
            Select a node to view its properties
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 text-center text-xs text-gray-400 border-t border-gray-200">
        Flow Builder © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default SidebarRight;
