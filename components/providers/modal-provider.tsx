"use client"

import { useEffect, useState } from "react";

import CreateServerModel from "../models/create-server-model";
import InviteModel from "../models/invite-model";
import EditServerModel from "../models/edit-server-model";
import MembersModel from "../models/members-model";
import CreateChannelModel from "../models/create-channel-model";
import LeaveServerModel from "../models/leave-server-model ";
import DeleteServerModel from "../models/delete-server-model";
import DeleteChannelModel from "../models/delete-channel-model";
import EditChannelModel from "../models/edit-channel-model";
import { MessageFileModal } from "../models/message-file-modal";
import DeleteMessageModel from "../models/delete-message-model";



const ModelProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) {
        return null;
    }
    return ( 
        <>
        <CreateServerModel />
        <InviteModel />
        <EditServerModel />
        <MembersModel />
        <CreateChannelModel />
        <LeaveServerModel />
        <DeleteServerModel />
        <DeleteChannelModel />
        <EditChannelModel />
        <MessageFileModal />
        <DeleteMessageModel />
        </>
     );
}
 
export default ModelProvider;