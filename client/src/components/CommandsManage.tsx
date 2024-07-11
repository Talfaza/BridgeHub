"use client"
import React from "react";
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
  PersonIcon
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

export function CommandsManage() {
  const [open, setOpen] = React.useState(true);

  return (
    <>
     
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>Command not found.</CommandEmpty>
          <CommandGroup heading="Directory Manipulation">
            <CommandItem>
              <CardStackPlusIcon className="mr-2 h-4 w-4" />
              <span>Create A Directory</span>
            </CommandItem>
            <CommandItem>
              <CopyIcon className="mr-2 h-4 w-4" />
              <span>Copy A Directory</span>
            </CommandItem>
            <CommandItem>
              <CardStackMinusIcon className="mr-2 h-4 w-4" />
              <span>Delete A Directory</span>
            </CommandItem>
        
            <CommandItem>
              <MoveIcon className="mr-2 h-4 w-4" />
              <span>Move A Directory</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="File Manipulation">
            <CommandItem>
              <FilePlusIcon className="mr-2 h-4 w-4" />
              <span>Create A File </span>
            </CommandItem>
            <CommandItem>
              <FileMinusIcon className="mr-2 h-4 w-4" />
              <span>Delete A File</span>
            </CommandItem>
            <CommandItem>
              <CopyIcon className="mr-2 h-4 w-4" />
              <span>Copy A File</span>
            </CommandItem>
            <CommandItem>
              <MoveIcon className="mr-2 h-4 w-4" />
              <span>Move A File</span>
            </CommandItem>
           <CommandItem>
              <StackIcon className="mr-2 h-4 w-4" />
              <span>Compress A File</span>
            </CommandItem>
            <CommandItem>
              <LayersIcon className="mr-2 h-4 w-4" />
              <span>Decompress A File</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
       <CommandGroup heading="Permission">
            <CommandItem>
              <Pencil1Icon className="mr-2 h-4 w-4" />
              <span>Change Permissions</span>
            </CommandItem>
          <CommandItem>
              <PersonIcon className="mr-2 h-4 w-4" />
              <span>Change Ownership</span>
            </CommandItem>
            </CommandGroup>
          <CommandSeparator />

        </CommandList>
      </CommandDialog>
    </>
  );
}
