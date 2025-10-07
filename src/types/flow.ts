import { Node, Edge } from "reactflow";
export type NodeType = "webhook" | "code" | "http" | "smtp";

export type FlowNode = Node<any>;
export type FlowEdge = Edge<any>;
