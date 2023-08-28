import { currentUser, redirectToSignIn, redirectToSignUp } from "@clerk/nextjs";

import { db } from "@/lib/db";  //models should be called with db 

export const initialProfile = async () => {
    const user = await currentUser();
    if (!user) {
        return redirectToSignIn();     //get user from clerk
    };

    const profile = await db.profile.findUnique({   //check if user exists so we dont create multiple users for single userid
        where: {
            userId: user.id,
        }
    });
    if (profile) {              //return the profile if exists 
        return profile;
    }
    const newProfile = await db.profile.create({    //else create new profile using clerk details 
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        }
    });
    return newProfile;

}
