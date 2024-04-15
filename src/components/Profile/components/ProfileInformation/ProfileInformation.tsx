'use client'

import { ProfilePostDTO } from "@/model/ProfilePost.dto";
import ProfileStats from "../ProfileStats/ProfileStats";
import { Gear, UserPlus, User, UserCheck } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { PostDTO } from "@/model/Post.dto";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { UserInfo, UserPageDTO } from "@/model/UserPage.dto";
import { getUser } from "@/utils/getUser";
import { LoggedUser } from "@/enum/LoggedUser.enum";
import { ProfileInfo } from "@/model/Profile/ProfileInfo";
import { ProfileActionsLoadingLoggedUser } from "../Loadings/ProfileActionsLoadingLoggedUser";
import { ProfileActionsLoadingNotLogged } from "../Loadings/ProfileActionsLoadingNotLoggedUser";
import ProfileActionsLogged from "../ProfileActions/LoggedUser/ProfileActionsLoggedUser";
import ProfileActionsNotLoggedUser from "../ProfileActions/NotLoggedUser/ProfileActionsNotLoggedUser";

export default function ProfileInformation({ userInfo, isLoggedUser }: ProfileInfo) {
    const { data: session } = useSession();
    const [loadingProfileInfo, setLoadingProfileInfo] = useState<boolean>(true);
    const [userImage, setUserImage] = useState<string>("")

    const [follows, setFollows] = useState<boolean>(false);

    useEffect(() => {

        if (session && session?.user?.uid) {
            fetchFollowsAndImage(userInfo.uid)
        }

    }, [session]);

    const fetchFollowsAndImage = async (uid: string): Promise<void>  => {
        try {
            const userFetched = await getUser(uid);
            const profileImage = userFetched.data().profileImage
            setUserImage(profileImage);
            const queryFollowing = query(collection(db, "users", userFetched.id, "followers"), 
                where("uid", "==", session?.user.uid!));

            const userResult = await getDocs(queryFollowing);
            console.log(userResult)
            
            if (userResult.docs.length) {
                setFollows(true);
                setLoadingProfileInfo(false);
                return;
            }
            setLoadingProfileInfo(false);
            setFollows(false); 

        } catch (error) {
            setLoadingProfileInfo(false);
            console.log(error)  
        }
    }

    const handleFollow = async (): Promise<void> => {
        try {
            const loggedUser = await getUser(session?.user.uid!);
            const visitedUser = await getUser(userInfo.uid!);
            if (!isLoggedUser && !follows) {
                await setDoc(doc(db, "users", loggedUser.id, "following", userInfo.uid!), { uid: userInfo.uid, username: userInfo.username });
                await setDoc(doc(db, "users", visitedUser.id, "followers", session?.user.uid!), { uid: session?.user.uid , username: session?.user.username })
                setFollows(true);
                return;
            }
            await deleteDoc(doc(db, "users", loggedUser.id, "following", userInfo.uid!))
            await deleteDoc(doc(db, "users", visitedUser.id, "followers", session?.user.uid!))

        setFollows(false);
        } catch (error) {
            console.log(error)

        }
    };

    return (
        <header className="flex gap-4 p-4 w-1/3">
            <section className="p-2">
            {
                loadingProfileInfo && !userImage
                ?
                    (
                        <div className="rounded-full animate-pulse bg-gray-200 size-20"></div>
                    )
                : !loadingProfileInfo && userImage 
                ? 
                    (
                        <img src={userImage} alt="" className="rounded-full" />
                    ) 
                : !loadingProfileInfo && !userImage
                ?
                    (
                        <User size={"74.172px"} weight="thin" className="border rounded-full" />
                    )
                :   (
                        <>
                        </>
                    )    
            }
            </section>
            <section className="flex flex-col w-full p-2">
                <section className="flex gap-2 items-center p-4">
                    {
                        !loadingProfileInfo 
                        &&
                            (
                                <div className="grow">
                                    <p className="font-semibold text-lg">{userInfo.username}</p>
                                </div>
                            )
                    }
                    {
                        loadingProfileInfo && (isLoggedUser === LoggedUser.isLoggedUser)
                        ? 
                            (
                                <ProfileActionsLoadingLoggedUser />
                            )
                        : 
                        loadingProfileInfo && (isLoggedUser === LoggedUser.isNotLoggedUser)
                        ?
                            (
                                <ProfileActionsLoadingNotLogged />
                            )
                        : 
                        isLoggedUser === LoggedUser.isLoggedUser 
                        ?
                            (
                                <ProfileActionsLogged />
                            )
                        :
                            (
                                <ProfileActionsNotLoggedUser follows={follows} handleFollow={handleFollow}/>
                            )
                    }
                    
                </section>
                <ProfileStats userInfo={userInfo} isLoggedUser={isLoggedUser} />   
            </section>
    </header>
    )
}