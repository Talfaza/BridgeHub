import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DialogCpdirProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
}

export function DialogCpdir({ open, setOpen, onCancel }: DialogCpdirProps) {
  const [sourceDirectory, setSourceDirectory] = useState("");
  const [destinationDirectory, setDestinationDirectory] = useState("");
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);

  useEffect(() => {
    const storedServerId = localStorage.getItem("selectedServerId");
    if (storedServerId) {
      setSelectedServerId(parseInt(storedServerId, 10));
    }
  }, []);

  const handleCopy = async () => {
    if (
      sourceDirectory.trim() !== "" &&
      destinationDirectory.trim() !== "" &&
      selectedServerId !== null
    ) {
      try {
        const response = await fetch("http://localhost:3000/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            server_id: selectedServerId,
            command: `cp -r ${sourceDirectory} ${destinationDirectory}`,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Directory copied successfully", data.output);
        } else {
          console.error("Failed to copy directory", data.error);
        }
      } catch (error) {
        console.error("Error copying directory:", error);
      }
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Copy a Directory</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the source and destination directories.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <Label htmlFor="sourceDirectory">Source Directory:</Label>
          <Input
            id="sourceDirectory"
            placeholder="Source Directory"
            value={sourceDirectory}
            onChange={(e) => setSourceDirectory(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destinationDirectory">Destination Directory:</Label>
          <Input
            id="destinationDirectory"
            placeholder="Destination Directory"
            value={destinationDirectory}
            onChange={(e) => setDestinationDirectory(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleCopy}>Copy</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
