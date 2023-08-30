"use client"

import { useEffect, useState } from "react";

import CreateServerModel from "../models/create-server-model";
import InviteModel from "../models/invite-model";



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
        </>
     );
}
 
export default ModelProvider;