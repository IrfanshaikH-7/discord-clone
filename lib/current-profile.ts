import { auth } from '@clerk/nextjs'
import { db } from '@/lib/db';//

export const currentProfile = async () => {
    const { userId } = auth(); //auth is a func which returns current user who is accessing this.

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