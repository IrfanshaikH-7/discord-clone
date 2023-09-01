import { Server } from '@prisma/client';
import { create } from 'zustand';

export type ModelType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer"

interface ModelData {
    server?: Server
}

interface ModelStore {
    type: ModelType | null;
    data: ModelData
    isOpen: boolean;
    onOpen: (type: ModelType,data?: ModelData) => void;
    onClose: () => void;
}
export const useModel = create<ModelStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data ={}) => set({isOpen:true, type, data}),
    onClose: () => set({isOpen:false, type: null}) ,
}))