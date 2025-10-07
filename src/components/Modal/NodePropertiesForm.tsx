// components/NodePropertiesForm.tsx
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NodePropertiesFormProps {
  type: string;
  values: {
    label?: string;
    method?: string;
    path?: string;
    code?: string;
    url?: string;
    body?: string;
    host?: string;
    port?: string;
  };
  onChange: (key: string, value: string) => void;
}

const NodePropertiesForm: React.FC<NodePropertiesFormProps> = ({
  type,
  values,
  onChange,
}) => {
  switch (type) {
    case "webhook":
      return (
        <>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Label</Label>
            <Input
              className="col-span-3"
              value={values.label || ""}
              onChange={(e) => onChange("label", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Method</Label>
            <Select
              value={values.method || ""}
              onValueChange={(value) => onChange("method", value)}
            >
              <SelectTrigger className="col-span-3 w-full">
                <SelectValue placeholder="Select Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Path</Label>
            <Input
              className="col-span-3"
              placeholder="/api/webhook"
              value={values.path || ""}
              onChange={(e) => onChange("path", e.target.value)}
            />
          </div>
        </>
      );

    case "code":
      return (
        <>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Label</Label>
            <Input
              className="col-span-3"
              value={values.label || ""}
              onChange={(e) => onChange("label", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Language</Label>
            <Input className="col-span-3" value="JavaScript" disabled />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Code</Label>
            <Textarea
              className="col-span-3"
              rows={5}
              value={values.code || ""}
              onChange={(e) => onChange("code", e.target.value)}
            />
          </div>
        </>
      );

    case "http":
      return (
        <>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Label</Label>
            <Input
              className="col-span-3"
              value={values.label || ""}
              onChange={(e) => onChange("label", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">URL</Label>
            <Input
              className="col-span-3"
              placeholder="https://api.example.com"
              value={values.url || ""}
              onChange={(e) => onChange("url", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="text-right pt-2">Body</Label>
            <Textarea
              className="col-span-3"
              rows={4}
              placeholder='{"key": "value"}'
              value={values.body || ""}
              onChange={(e) => onChange("body", e.target.value)}
            />
          </div>
        </>
      );

    case "smtp":
      return (
        <>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Label</Label>
            <Input
              className="col-span-3"
              value={values.label || ""}
              onChange={(e) => onChange("label", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Host</Label>
            <Input
              className="col-span-3"
              placeholder="smtp.gmail.com"
              value={values.host || ""}
              onChange={(e) => onChange("host", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Port</Label>
            <Input
              className="col-span-3"
              placeholder="587"
              value={values.port || ""}
              onChange={(e) => onChange("port", e.target.value)}
            />
          </div>
        </>
      );

    default:
      return <p className="text-sm text-gray-500">No editable fields</p>;
  }
};

export default NodePropertiesForm;
