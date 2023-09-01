"use client"
import { Search } from "lucide-react";
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { useState } from "react";
9848012345


interface ServerSearchProps {
    data: {
        label: string;
        type: 'channel' | 'member',
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;

        }[] | undefined
    }[]
}
const ServerSearch = ({ data }: ServerSearchProps) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <button className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
            
            onClick={()=> setOpen(true)}>
                <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition ">
                    Search
                </p>
                <kbd 
                className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 fount-mono text-[10px] font-medium text-muted-foreground ml-auto"
                >
                    <span className="text-xs ">CTRL</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput 
                placeholder="Search all channels and members"
                />
                <CommandList>
                    <CommandEmpty>
                        No Result found.
                    </CommandEmpty>
                </CommandList>
            </CommandDialog>
        </>
    );
}

export default ServerSearch;