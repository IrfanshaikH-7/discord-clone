"use client"
import qs from 'query-string';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useModel } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


const DeleteChannelModel = () => {
    const router = useRouter();
    const { onOpen,isOpen, onClose, type,data } = useModel();
    const {server, channel} = data; 
    const isModelOpen = isOpen && type === 'deleteChannel'
    const origin = useOrigin();
    const [isloading, setIsLoading] = useState(false)

    const onSubmit = async ()=> {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url:`/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id,
                }
            })
            await axios.delete(url)

            onClose();
            router.refresh();
            router.push(`/servers/${server?.id}`);
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false);
        }
    }
    
    return (
        <Dialog open={isModelOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this <br />
                         <span className="text-rose-500 font-semibold">#{channel?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <div className="flex items-center justify-between w-full">
                            <Button
                            disabled={isloading}
                            onClick={onClose}
                            variant='ghost'
                            >
                                Cancel
                            </Button>
                            <Button
                            disabled={isloading}
                            onClick={onSubmit}
                            variant='destructive'
                            >
                                Confirm
                            </Button>
                        </div>
                    </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}

export default DeleteChannelModel;