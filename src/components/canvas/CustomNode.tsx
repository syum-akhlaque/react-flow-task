"use client";
import React from "react";
import { Handle, Position } from "reactflow";
import { Globe, Code2, Link, Mail } from "lucide-react";

interface NodeProps {
  data: { label: string };
  type?: string;
}

const baseStyle =
  "rounded-lg shadow-md border-2 text-sm font-medium text-center px-4 py-3 w-40 flex items-center justify-center gap-2";

export const WebhookNode = ({ data }: NodeProps) => (
  <div className={`${baseStyle} border-blue-400 bg-blue-50 text-blue-600`}>
    <Globe size={16} />
    <span>{data.label}</span>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

export const CodeNode = ({ data }: NodeProps) => (
  <div className={`${baseStyle} border-green-400 bg-green-50 text-green-600`}>
    <Code2 size={16} />
    <span>{data.label}</span>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

export const HttpNode = ({ data }: NodeProps) => (
  <div
    className={`${baseStyle} border-yellow-400 bg-yellow-50 text-yellow-600`}
  >
    <Link size={16} />
    <span>{data.label}</span>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);

export const SmtpNode = ({ data }: NodeProps) => (
  <div className={`${baseStyle} border-pink-400 bg-pink-50 text-pink-600`}>
    <Mail size={16} />
    <span>{data.label}</span>
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
  </div>
);
