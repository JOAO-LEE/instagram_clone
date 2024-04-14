"use client";

import { useModalState } from "../../../store/modalState";
import UploadModal from "../Modals/UploadModal/UploadModal";
import { useEffect, useState } from "react";
import ProfileActions from "./components/ProfileActions/ProfileActions";
import ProfilePosts from "./components/ProfilePosts/ProfilePosts";
import ProfileInfo from "./components/ProfileInformation/ProfileInformation";
import { useSearchParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import NoPosts from "../Feed/Posts/Post/NoPosts";
import { LoggedUser } from "@/enum/LoggedUser.enum";

export default function Profile({ username }: { username: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isOpen } = useModalState();
    const [isLoggedUser, setIsLoggedUser] = useState<LoggedUser>(LoggedUser.isNotLoggedUser);
    const { data: session} = useSession();
    const searchParams = useSearchParams();
    const uidParam = searchParams.get('uid');

    useEffect(() => {
        const isLoggedUserConfirmation = session?.user?.username === username && session?.user?.uid === uidParam;
        if (session && isLoggedUserConfirmation) {
            console.log(isLoggedUserConfirmation)
            setIsLoggedUser(LoggedUser.isLoggedUser);
        }
       
    }, [session]);
    
    return (
        <>
            <div className="flex gap-1 flex-col items-center">
                <ProfileInfo userInfo={{username, uid: uidParam!}} isLoggedUser={isLoggedUser} />
                <ProfileActions />
                <ProfilePosts userInfo={{username, uid: uidParam!}} isLoggedUser={isLoggedUser} />
            </div> 
        </>
    )         
}

{/* //         !isLoading && userPosts.length > 0 && ( */}
                {/* // ) */}

     // }
            // {
            //     isOpen && (
            //         <UploadModal />
            //     )
            // }
            // { isLoading && <ProfileLoadingSkeleton /> }