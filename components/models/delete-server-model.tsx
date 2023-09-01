"use client"

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


const DeleteServerModel = () => {
    const router = useRouter();
    const { onOpen,isOpen, onClose, type,data } = useModel();
    const {server} = data; 
    const isModelOpen = isOpen && type === 'deleteServer'
    const origin = useOrigin();
    const [isloading, setIsLoading] = useState(false)

    const onSubmit = async ()=> {
        try {
            setIsLoading(true);
            await axios.delete(`/api/servers/${server?.id}/`)

            onClose();
            router.refresh();
            router.push('/');
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
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this <br />
                         <span className="text-rose-500 font-semibold">{server?.name}</span> will be permanently deleted.
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

export default DeleteServerModel;