"use client";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SidebarLeftProps {
  // optionally pass any props
}

const SidebarLeft: React.FC<SidebarLeftProps> = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-[200px] p-4 border-r border-gray-200">
      <div
        className="p-2 mb-2 border cursor-grab text-center"
        draggable
        onDragStart={(e) => onDragStart(e, "code")}
      >
        Code Node
      </div>
      <div
        className="p-2 mb-2 border cursor-grab text-center"
        draggable
        onDragStart={(e) => onDragStart(e, "text")}
      >
        Text Node
      </div>
    </div>
  );
};

export default SidebarLeft;
