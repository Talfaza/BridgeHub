import React, { useState } from "react";
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

interface DialogMvDirProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
}

export function DialogMvDir({ open, setOpen, onCancel }: DialogMvDirProps) {

  const handleCreate = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Move a Directory</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the source and destination directories.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-2">
          <Label htmlFor="sourcedirectoryName"> Source Directory Name:</Label>
          <Input
            id="sourcedirectoryName"
            placeholder="Source"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destdirectoryName"> Destination Directory Name:</Label>
          <Input
            id="destdirectoryName"
            placeholder="Destination"
          />
        </div>
        <AlertDialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button  onClick={handleCreate}>
           Move 
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
