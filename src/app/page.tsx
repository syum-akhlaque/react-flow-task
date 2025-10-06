"use client";
import React, { useState } from "react";
import SidebarLeft from "@/components/sidebar-left/SidebarLeft";
import Canvas from "@/components/canvas/Canvas";
import SidebarRight from "@/components/sidebar-right/SidebarRight";
import { FlowNode } from "@/types/flow";
import { FlowProvider } from "@/context/FlowContext";

const Page = () => {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);

  return (
    <FlowProvider>
      <div className="flex h-screen">
        <SidebarLeft />
        <Canvas setSelectedNode={setSelectedNode} />
        <SidebarRight node={selectedNode} />
      </div>
    </FlowProvider>
  );
};

export default Page;
