/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import SidebarLeft from "@/components/sidebar-left/SidebarLeft";
import Canvas from "@/components/canvas/Canvas";
import SidebarRight from "@/components/sidebar-right/SidebarRight";
import { FlowNode } from "@/types/flow";

const Page = () => {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const handleExport = () => {
    if (!reactFlowInstance) return;
    const flow = reactFlowInstance.toObject();
    const json = JSON.stringify(flow, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "flow.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex h-screen">
        <SidebarLeft />
        <Canvas
          setSelectedNode={setSelectedNode}
          setReactFlowInstance={setReactFlowInstance}
        />
        <SidebarRight node={selectedNode} handleExport={handleExport} />
      </div>
    </>
  );
};

export default Page;
