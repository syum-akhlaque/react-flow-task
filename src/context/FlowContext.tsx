"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import {
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  Node,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from "reactflow";
import { FlowNodeData, FlowEdge } from "@/types/flow";

interface FlowContextType {
  nodes: Node<FlowNodeData>[];
  setNodes: React.Dispatch<React.SetStateAction<Node<FlowNodeData>[]>>;
  edges: FlowEdge[];
  setEdges: React.Dispatch<React.SetStateAction<FlowEdge[]>>;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (instance: ReactFlowInstance | null) => void;
  handleImportFlow: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleExportFlow: () => void;
  saveFlow: () => void;
  handleNodesChange: (changes: NodeChange[]) => void;
  handleEdgesChange: (changes: EdgeChange[]) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useNodesState<FlowNodeData>([]);
  const [edges, setEdges] = useEdgesState<FlowEdge[]>([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  // auto-save
  const saveFlow = useCallback(() => {
    if (!reactFlowInstance) return;
    const flow = reactFlowInstance.toObject();
    localStorage.setItem("flow-data", JSON.stringify(flow));
    console.log("Flow saved to localStorage ✅");
  }, [reactFlowInstance]);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // Import flow from JSON
  const handleImportFlow = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);

        if (!json.nodes || !json.edges || !json.viewport) {
          alert("Invalid flow file (must contain nodes, edges, viewport)");
          return;
        }

        setNodes(json.nodes as Node<FlowNodeData>[]);
        setEdges(json.edges as FlowEdge[]);
        reactFlowInstance?.setViewport(json.viewport);

        alert("Flow imported successfully ✅");
      } catch (err) {
        console.error(err);
        alert("Failed to import: Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  const handleExportFlow = () => {
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

  // Load saved flow from localStorage on mount
  useEffect(() => {
    const storedFlow = localStorage.getItem("flow-data");
    if (storedFlow && reactFlowInstance) {
      const flow = JSON.parse(storedFlow);
      reactFlowInstance.setNodes(flow.nodes || []);
      reactFlowInstance.setEdges(flow.edges || []);
      reactFlowInstance.setViewport(flow.viewport || { x: 0, y: 0, zoom: 1 });
    }
  }, [reactFlowInstance]);

  // auto-save on every nodes/edges change
  useEffect(() => {
    if (!reactFlowInstance) return;
    const flow = reactFlowInstance.toObject();
    localStorage.setItem("flow-data", JSON.stringify(flow));
  }, [nodes, edges, reactFlowInstance]);

  return (
    <FlowContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        reactFlowInstance,
        setReactFlowInstance,
        handleImportFlow,
        handleExportFlow,
        saveFlow,
        handleNodesChange,
        handleEdgesChange,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = () => {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error("useFlow must be used inside FlowProvider");
  return ctx;
};
