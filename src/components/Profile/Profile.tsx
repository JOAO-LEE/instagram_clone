"use client";

import { useEffect, useState } from "react";
import ProfileActions from "./components/ProfilePostsInfos/ProfileActionsInfos";
import ProfilePosts from "./components/ProfilePosts/ProfilePosts";
import ProfileInfo from "./components/ProfileInformation/ProfileInformation";
import { useSearchParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import { LoggedUser } from "@/enum/LoggedUser.enum";
import { db } from "../../../firebase";

export default function Profile({ username }: { username: string }) { 
    const [isLoggedUser, setIsLoggedUser] = useState<LoggedUser>(LoggedUser.isNotLoggedUser);
    const { data: session} = useSession();
    const searchParams = useSearchParams();
    const uidParam = searchParams.get('uid');

    useEffect(() => {
        const isLoggedUserConfirmation = session?.user?.username === username && session?.user?.uid === uidParam;
        if (session && isLoggedUserConfirmation) {
            setIsLoggedUser(LoggedUser.isLoggedUser);
        }
       
    }, [session, db]);
    
    return (
        <main className="flex gap-1 flex-col justify-center items-center max-w-full">
            <ProfileInfo userInfo={{username, uid: uidParam!}} isLoggedUser={isLoggedUser} />
            <ProfileActions />
            <ProfilePosts userInfo={{username, uid: uidParam!}} isLoggedUser={isLoggedUser} />
        </main> 
    )         
}

