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

interface DialogCpfileProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
}

export function DialogCpfile({ open, setOpen, onCancel }: DialogCpfileProps) {
  const [fileName, setFileName] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);

  useEffect(() => {
    const storedServerId = localStorage.getItem("selectedServerId");
    if (storedServerId) {
      setSelectedServerId(parseInt(storedServerId, 10));
    }
  }, []);

  const handleCopy = async () => {
    if (fileName.trim() !== "" && destination.trim() !== "" && selectedServerId !== null) {
      try {
        const response = await fetch("http://localhost:3000/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            server_id: selectedServerId,
            command: `cp ${fileName} ${destination}`,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("File copied successfully", data.output);
        } else {
          console.error("Failed to copy file", data.error);
        }
      } catch (error) {
        console.error("Error copying file:", error);
      }
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Copy a File</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the name of the file you want to copy and the destination.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <Label htmlFor="fileName">File Name:</Label>
          <Input
            id="fileName"
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <Label htmlFor="destination">Destination:</Label>
          <Input
            id="destination"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
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
