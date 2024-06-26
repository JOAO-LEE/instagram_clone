import { useSession } from "next-auth/react";
import SignOutButton from "@/components/Login/SignOutButton/SignOutButton";
import { User } from "@phosphor-icons/react/dist/ssr";
import MiniProfileLoadingSkeleton from "@/components/Loadings/MiniProfileLoadingSkeleton";

export default function MiniProfile() {
    const { data: session, status } =  useSession();

    return (
        <>
            { 
                session?.user.username 
                ?
                    (
                        <div className="flex flex-wrap mt-14 justify-between p-1">
                            <div className="flex">
                            { session?.user?.image ? <img src={session?.user?.image} className="h-12 rounded-full object-cover border p-[2px]" /> : <User weight="thin" size={"48px"} className="border rounded-full"/>}
                                <div className="ml-4 max-w-fit">
                                    <h2 className="font-bold text-sm">{session?.user?.username}</h2>
                                    <h3 className="text-xs  text-gray-400">{session?.user?.email}</h3>
                                </div>
                            </div> 
                            <SignOutButton />
                        </div>
                        
                    )
                :
                    (

                        <MiniProfileLoadingSkeleton />
                    )
                        
            }
        </>
   
    )
}

