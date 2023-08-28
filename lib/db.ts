import { PrismaClient } from "@prisma/client";
    //first step to use prisma 
declare global {
    var prisma: PrismaClient | undefined;
};

export const  db = globalThis.prisma || new PrismaClient(); //creatae a database instance as db

if( process.env.NODE_ENV !== "production" ) globalThis.prisma = db;