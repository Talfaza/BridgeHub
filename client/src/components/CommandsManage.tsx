"use client";
import React, { useState } from "react";
import {
  CardStackPlusIcon,
  CardStackMinusIcon,
  CopyIcon,
  MoveIcon,
  FilePlusIcon,
  FileMinusIcon,
  StackIcon,
  LayersIcon,
  Pencil1Icon,
  PersonIcon,
} from "@radix-ui/react-icons";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { DialogMkdir } from "./commands/directories/Mkdir";
import { DialogCpdir } from "./commands/directories/Cpdir";
import { DialogRmdir } from "./commands/directories/Rmdir";
export function CommandsManage() {
  const [open, setOpen] = useState(true);
  const [dialogType, setDialogType] = useState<string | null>(null);

  const handleSelect = (title: string) => {
    setOpen(false);
    setTimeout(() => {
      setDialogType(title);
    }, 150);
  };

  const handleCancel = () => {
    setOpen(true);
    setDialogType(null);
  };

  const renderDialog = () => {
    switch (dialogType) {
      case "Create A Directory":
        return (
          <DialogMkdir open={true} setOpen={setOpen} onCancel={handleCancel} />
        );
      case "Copy A Directory":
        return (
          <DialogCpdir open={true} setOpen={setOpen} onCancel={handleCancel} />
      );
      case "Delete A Directory":
        return (
          <DialogRmdir open={true} setOpen={setOpen} onCancel={handleCancel} />
      );
      default:
        return null;
    }
  };

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>Command not found.</CommandEmpty>
          <CommandGroup heading="Directory Manipulation">
            <CommandItem onSelect={() => handleSelect("Create A Directory")}>
              <CardStackPlusIcon className="mr-2 h-4 w-4" />
              <span>Create A Directory</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("Copy A Directory")}>
              <CopyIcon className="mr-2 h-4 w-4" />
              <span>Copy A Directory</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("Delete A Directory")}>
              <CardStackMinusIcon className="mr-2 h-4 w-4" />
              <span>Delete A Directory</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("Move A Directory")}>
              <MoveIcon className="mr-2 h-4 w-4" />
              <span>Move A Directory</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="File Manipulation">
            <CommandItem onSelect={() => handleSelect("Create A File")}>
              <FilePlusIcon className="mr-2 h-4 w-4" />
              <span>Create A File</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("Delete A File")}>
              <FileMinusIcon className="mr-2 h-4 w-4" />
              <span>Delete A File</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("Copy A File")}>
              <CopyIcon className="mr-2 h-4 w-4" />
              <span>Copy A File</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("Move A File")}>
              <MoveIcon className="mr-2 h-4 w-4" />
              <span>Move A File</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("Compress A File")}>
              <StackIcon className="mr-2 h-4 w-4" />
              <span>Compress A File</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("Decompress A File")}>
              <LayersIcon className="mr-2 h-4 w-4" />
              <span>Decompress A File</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Permission">
            <CommandItem onSelect={() => handleSelect("Change Permissions")}>
              <Pencil1Icon className="mr-2 h-4 w-4" />
              <span>Change Permissions</span>
            </CommandItem>
            <CommandItem onSelect={() => handleSelect("Change Ownership")}>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Change Ownership</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
      {renderDialog()}
    </>
  );
}
