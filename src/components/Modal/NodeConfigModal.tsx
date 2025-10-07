"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NodePropertiesForm from "./NodePropertiesForm";
import { Node } from "reactflow";

interface NodeConfigModalProps {
  open: boolean;
  node: Node | null;
  onClose: () => void;
  onSave: (updatedNode: Node) => void;
}

const NodeConfigModal: React.FC<NodeConfigModalProps> = ({
  open,
  node,
  onClose,
  onSave,
}) => {
  const [editingNode, setEditingNode] = React.useState<Node | null>(node);

  React.useEffect(() => {
    setEditingNode(node);
  }, [node]);

  if (!editingNode) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Node – {editingNode.type?.toUpperCase() || "Unknown"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <NodePropertiesForm
            type={editingNode.type || ""}
            values={editingNode.data || {}}
            onChange={(key, value) => {
              setEditingNode({
                ...editingNode,
                data: { ...editingNode.data, [key]: value },
              });
            }}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (editingNode) onSave(editingNode);
              onClose();
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NodeConfigModal;
