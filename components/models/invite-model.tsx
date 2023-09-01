"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModel } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";


const InviteModel = () => {

    const { onOpen,isOpen, onClose, type,data } = useModel();
    const {server} = data; 
    const isModelOpen = isOpen && type === 'invite'
    const origin = useOrigin();
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
    const [copied, setCopied] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = ()=> {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(()=> {
            setCopied(false)
        }, 1000 )
    }
    const onNew = async ()=> {
        try {
            setLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen('invite', {server: response.data});

        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return (
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite Friends
                    </DialogTitle>
                </DialogHeader>
                    <div className="p-6">
                        <Label
                        className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                        >
                            Server Invite link
                        </Label>
                        <div className="flex items-center mt-2 gap-x-2">
                            <Input 
                            disabled={loading}
                            className="bg-zinc-300/50 border-0 focus:visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                            />
                            <Button 
                            disabled={loading}
                            size='icon'
                            className=""
                            onClick={onCopy}
                            >
                                {copied ? <Check className="w-4 h-4 " /> :<Copy className="w-4 h-4 " />}
                                
                            </Button>
                        </div>
                        <Button 
                        disabled={loading}
                        variant='link'
                        size='sm'
                        className="text-xs text-zinc-500 mt-4"
                        onClick={onNew}
                        >
                            Generate a new link
                            <RefreshCw  className="w-4 h-4 ml-2"/>
                        </Button>
                        
                    </div>
            </DialogContent>

        </Dialog>
    );
}

export default InviteModel;