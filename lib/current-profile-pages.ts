import { getAuth } from '@clerk/nextjs/server'
import { db } from '@/lib/db';//
import { NextApiRequest } from 'next';

export const currentProfilePages = async (req: NextApiRequest) => {
    const { userId } = getAuth(req); //auth is a func which returns current user who is accessing this.

    if(!userId){
        return null
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: userId
        }
    });
    return profile
}