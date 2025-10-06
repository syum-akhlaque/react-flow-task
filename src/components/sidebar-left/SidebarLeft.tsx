"use client";
import React from "react";
import { Globe, Code, Cloud, Mail } from "lucide-react";

const SidebarLeft: React.FC = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const nodeTypes = [
    {
      type: "webhook",
      label: "Webhook",
      icon: <Globe size={18} />,
      color: "bg-blue-100/60",
    },
    {
      type: "code",
      label: "Code",
      icon: <Code size={18} />,
      color: "bg-green-100/60",
    },
    {
      type: "http",
      label: "HTTP Request",
      icon: <Cloud size={18} />,
      color: "bg-yellow-100/60",
    },
    {
      type: "smtp",
      label: "SMTP",
      icon: <Mail size={18} />,
      color: "bg-red-100/60",
    },
  ];

  return (
    <div
      className="w-[200px] h-screen border-r border-gray-200 p-4 flex flex-col gap-3
      bg-gradient-to-b from-blue-50 via-white to-blue-100"
    >
      <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
        Nodes Library
      </h2>

      {nodeTypes.map((node) => (
        <div
          key={node.type}
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
          className={`flex items-center gap-3 p-3 rounded-lg shadow-sm border cursor-grab
            hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${node.color}`}
        >
          <div className="text-gray-700">{node.icon}</div>
          <span className="text-sm font-medium text-gray-800">
            {node.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SidebarLeft;
