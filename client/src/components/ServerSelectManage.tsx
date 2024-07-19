import React, { useEffect, useState } from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import axios from "axios";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function ServerCombobox({ onSelect }) { 
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [servers, setServers] = useState([])

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/getservers", {
          withCredentials: true,
        });
        setServers(response.data);
      } catch (error) {
        console.error("Error fetching servers:", error);
      }
    };

    fetchServers();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? servers.find((server) => server.id === value)?.name
            : "Select server..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search server..." className="h-9" />
          <CommandEmpty>No server found.</CommandEmpty>
          <CommandGroup>
            {servers.map((server) => (
              <CommandItem
                key={server.id}
                value={server.id}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  onSelect(server)
                }}
              >
                {server.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === server.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
