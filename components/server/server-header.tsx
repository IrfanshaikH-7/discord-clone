"use client"
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, Trash2, TrashIcon, UserPlus, Users } from "lucide-react";
import { Separator } from "../ui/separator";
import { useModel } from "@/hooks/use-modal-store";

interface  ServerHeaderProps {
    server: ServerWithMembersWithProfiles,
    role?: MemberRole
}
const ServerHeader = ({server,role}: ServerHeaderProps) => {
    const { onOpen } = useModel();

    const isAdmin = role === MemberRole.ADMIN
    const isModerator = isAdmin || role === MemberRole.MODERATOR

    return ( 
        <>
        <DropdownMenu>
            <DropdownMenuTrigger
            className="focus:outline-none"
            asChild
            >
                <button 
                className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-700 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                >
                    {server.name}
                    <ChevronDown 
                    className="h-5 w-5 ml-auto"
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-2"
            >
                {isModerator && (
                    <DropdownMenuItem
                    className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                    onClick={()=> onOpen('invite',{ server: server})}
                    >
                        Invite People
                        <UserPlus  
                        className="h-4 w-4 ml-auto"
                        />
                    </DropdownMenuItem>
                    
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    className=" px-3 py-2 text-sm cursor-pointer"
                    >
                        Server settings
                        <Settings  
                        className="h-4 w-4 ml-auto"
                        />
                    </DropdownMenuItem>
                    
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    className=" px-3 py-2 text-sm cursor-pointer"
                    >
                        Manage members
                        <Users  
                        className="h-4 w-4 ml-auto"
                        />
                    </DropdownMenuItem>
                    
                )}
                {isModerator && (
                    <DropdownMenuItem
                    className=" px-3 py-2 text-sm cursor-pointer"
                    >
                        Create channel
                        <PlusCircle  
                        className="h-4 w-4 ml-auto"
                        />
                    </DropdownMenuItem>
                    
                )}
                {isModerator && (
                    <Separator />
                )}
                {isAdmin && (
                    <DropdownMenuItem
                    className=" text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Delete server
                        <Trash
                        className="h-4 w-4 ml-auto"
                        />
                    </DropdownMenuItem>
                    
                )}
                {!isAdmin && (
                    <DropdownMenuItem
                    className=" text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Leave server
                        <LogOut
                        className="h-4 w-4 ml-auto"
                        />
                    </DropdownMenuItem>
                    
                )}
                
            </DropdownMenuContent>
        </DropdownMenu>
        </>
     )
}
 
export default ServerHeader;