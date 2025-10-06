/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Node,
  Edge,
  ReactFlowInstance,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

interface FlowContextType {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  reactFlowInstance: ReactFlowInstance | null;
  setReactFlowInstance: (instance: ReactFlowInstance | null) => void;
  handleImportFlow: (data: any) => void;
  handleExportFlow: () => void;
  saveFlow: () => void;
  handleNodesChange: (changes: any) => void;
  handleEdgesChange: (changes: any) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export const FlowProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  // 🔹 auto-save
  const saveFlow = useCallback(() => {
    if (!reactFlowInstance) return;
    const flow = reactFlowInstance.toObject();
    localStorage.setItem("flow-data", JSON.stringify(flow));
    console.log("Flow saved to localStorage ✅");
  }, [reactFlowInstance]);

  const handleNodesChange = useCallback(
    (changes: any) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
      saveFlow();
    },
    [setNodes, saveFlow]
  );

  const handleEdgesChange = useCallback(
    (changes: any) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
      saveFlow();
    },
    [setEdges, saveFlow]
  );

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

        setNodes(json.nodes);
        setEdges(json.edges);
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

  useEffect(() => {
    const storedFlow = localStorage.getItem("flow-data");
    if (storedFlow && reactFlowInstance) {
      const flow = JSON.parse(storedFlow);
      reactFlowInstance.setNodes(flow.nodes || []);
      reactFlowInstance.setEdges(flow.edges || []);
      reactFlowInstance.setViewport(flow.viewport || { x: 0, y: 0, zoom: 1 });
    }
  }, [reactFlowInstance]);

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
