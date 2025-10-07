/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Connection,
  Edge,
  Node,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import { useFlow } from "@/context/FlowContext";
import { CodeNode, HttpNode, SmtpNode, WebhookNode } from "./CustomNode";
import NodeConfigModal from "../Modal/NodeConfigModal";

interface CanvasProps {
  setSelectedNodeId: Dispatch<SetStateAction<string | null>>;
}

const nodeTypes = {
  webhook: WebhookNode,
  code: CodeNode,
  http: HttpNode,
  smtp: SmtpNode,
};

const Canvas: React.FC<CanvasProps> = ({ setSelectedNodeId }) => {
  const {
    nodes,
    setNodes,
    handleNodesChange,
    edges,
    setEdges,
    handleEdgesChange,
    setReactFlowInstance,
  } = useFlow();

  // modal state
  const [showModal, setShowModal] = useState(false);
  const [editingNode, setEditingNode] = useState<Node | null>(null);
  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: Node = {
        id: `${type}-${+new Date()}`,
        type: type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // single click = select node
  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  // double click = open modal
  const onNodeDoubleClick = useCallback((_: React.MouseEvent, node: Node) => {
    setEditingNode(node);
    setShowModal(true);
  }, []);

  const onNodesDelete = useCallback(
    (deleted: any) => {
      let remainingNodes = [...nodes];
      setEdges(
        deleted.reduce((acc: any, node: any) => {
          const incomers = getIncomers(node, remainingNodes, acc);
          const outgoers = getOutgoers(node, remainingNodes, acc);
          const connectedEdges = getConnectedEdges([node], acc);

          const remainingEdges = acc.filter(
            (edge: any) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          remainingNodes = remainingNodes.filter((rn) => rn.id !== node.id);

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  // modal save handler
  const handleNodeSave = (updatedNode: Node) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    );
  };

  return (
    <div className="flex-1">
      <ReactFlowProvider>
        <ReactFlow
          className="w-full h-full bg-gradient-to-b from-gray-50 to-white"
          onInit={setReactFlowInstance}
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodesDelete={onNodesDelete}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>

      {/* Modal for editing node*/}
      <NodeConfigModal
        open={showModal}
        node={editingNode}
        onClose={() => setShowModal(false)}
        onSave={handleNodeSave}
      />
    </div>
  );
};

export default Canvas;
