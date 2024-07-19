import{ useState } from "react";
import {
  CardStackPlusIcon,
  CardStackMinusIcon,
  CopyIcon,
  MoveIcon,
  FilePlusIcon,
  FileMinusIcon,
  StackIcon,
  LayersIcon,
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
import { DialogMvDir } from "./commands/directories/Mvdir";
import { DialogMkfile } from "./commands/files/Mkfile";
import { DialogRmfile } from "./commands/files/Rmfile";
import { DialogCpfile } from "./commands/files/Cpfile";
import { DialogMvfile } from "./commands/files/Mvfile";
import { DialogCompress } from "./commands/files/Compress";
import { DialogDecompress } from "./commands/files/Decompress";

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
      case "Move A Directory":
        return (
          <DialogMvDir open={true} setOpen={setOpen} onCancel={handleCancel} />
        );
      case "Create A File":
        return (
          <DialogMkfile open={true} setOpen={setOpen} onCancel={handleCancel} />
        );
      case "Delete A File":
        return (
          <DialogRmfile open={true} setOpen={setOpen} onCancel={handleCancel} />
        );
      case "Copy A File":
        return (
          <DialogCpfile open={true} setOpen={setOpen} onCancel={handleCancel} />
        );
      case "Move A File":
        return (
          <DialogMvfile open={true} setOpen={setOpen} onCancel={handleCancel} />
        );
      case "Compress A File":
        return (
          <DialogCompress open={true} setOpen={setOpen} onCancel={handleCancel} />
        );
      case "Decompress A File":
        return (
          <DialogDecompress open={true} setOpen={setOpen} onCancel={handleCancel} />
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
        </CommandList>
      </CommandDialog>
      {renderDialog()}
    </>
  );
}
