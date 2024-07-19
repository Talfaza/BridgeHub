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

interface DialogDecompressProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
}

export function DialogDecompress({ open, setOpen, onCancel }: DialogDecompressProps) {
  const [fileName, setFileName] = useState("");
  const [selectedServerId, setSelectedServerId] = useState<number | null>(null);

  useEffect(() => {
    const storedServerId = localStorage.getItem("selectedServerId");
    if (storedServerId) {
      setSelectedServerId(parseInt(storedServerId, 10));
    }
  }, []);

  const handleDecompress = async () => {
    if (fileName.trim() !== "" && selectedServerId !== null) {
      try {
        const response = await fetch("http://localhost:3000/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            server_id: selectedServerId,
            command: `gzip -d ${fileName}`,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("File decompressed successfully", data.output);
        } else {
          console.error("Failed to decompress file", data.error);
        }
      } catch (error) {
        console.error("Error decompressing file:", error);
      }
    }
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Decompress a File</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the name of the file you want to decompress.
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
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleDecompress}>Decompress</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
