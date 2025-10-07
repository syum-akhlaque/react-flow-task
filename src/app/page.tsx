"use client";
import React, { useState } from "react";
import SidebarLeft from "@/components/sidebar-left/SidebarLeft";
import Canvas from "@/components/canvas/Canvas";
import SidebarRight from "@/components/sidebar-right/SidebarRight";
import { FlowProvider } from "@/context/FlowContext";

const Page = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  return (
    <FlowProvider>
      <div className="flex h-screen">
        <SidebarLeft />
        <Canvas setSelectedNodeId={setSelectedNodeId} />
        <SidebarRight selectedNodeId={selectedNodeId} />
      </div>
    </FlowProvider>
  );
};

export default Page;
