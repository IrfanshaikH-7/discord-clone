import { db } from "@/lib/db";
import { redirect} from 'next/navigation';
import { initialProfile } from "@/lib/initial-profile";
import InitialModel from "@/components/models/InitialModel";

const SetupPage = async () => {
    const profile = await initialProfile();

    const server =await db.server.findFirst({
        where: {
            members:{
                some: {
                    profileId:profile.id
                }
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    }
    return (  
        <div>
            <InitialModel />
        </div>
    );
}
 
export default SetupPage;