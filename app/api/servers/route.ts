

import{ v4 as uuidv4} from 'uuid';

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from '@prisma/client';

export async function POST(req: Request) {
    try {
         //Getting values from where this function is getting called in this one its gets called from Initial models sumbit
        const { name, imageUrl } = await req.json();
         const profile = await currentProfile();
         
         if(!profile) {
            return new NextResponse("Unauthorized", {status: 401})
         }
         console.log(profile)

         const server = await db.server.create({
            data: {
                profileId: profile.id,
                name: name,
                imageUrl: imageUrl,
                inviteCode: uuidv4(),
                channels: {
                    create: [
                        {name: 'general',
                         profileId: profile.id
                        }
                    ]
                },
                members : {
                    create: [
                        {
                            profileId: profile.id,
                            role: MemberRole.ADMIN,
                        }
                    ]
                }

            }
         })

         return NextResponse.json(server)

    } catch (error) {
        console.log("[Servers_post]", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}