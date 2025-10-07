export type NodeType = "webhook" | "code" | "http" | "smtp";

export interface WebhookData {
  label: string;
  method: "GET" | "POST";
  path: string;
}

export interface CodeData {
  label: string;
  language: "JavaScript";
  code: string;
}

export interface HttpData {
  label: string;
  url: string;
  body: string;
}

export interface SmtpData {
  label: string;
  host: string;
  port: string;
}

export type FlowNodeData = WebhookData | CodeData | HttpData | SmtpData;

export type FlowNode = {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: FlowNodeData & { label: string }; // ensure label always exists
};

export type FlowEdge = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
};
