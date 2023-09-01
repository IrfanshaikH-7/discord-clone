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


const LeaveServerModel = () => {
    const router = useRouter();
    const { onOpen,isOpen, onClose, type,data } = useModel();
    const {server} = data; 
    const isModelOpen = isOpen && type === 'leaveServer'
    const origin = useOrigin();
    const [isloading, setIsLoading] = useState(false)

    const onSubmit = async ()=> {
        try {
            setIsLoading(true);
            await axios.patch(`/api/servers/${server?.id}/leave`)

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
                        Leave Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to leave <span className="text-indigo-500 font-semibold">{server?.name}</span>?
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
                            variant='primary'
                            >
                                Confirm
                            </Button>
                        </div>
                    </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}

export default LeaveServerModel;