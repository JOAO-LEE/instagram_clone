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

export default function ProfileInfo({ userInfo, isLoggedUser }: ProfileInfo) {
    const { data: session } = useSession();
    // const [user, setUser] = useState<any>();
    const [follows, setFollows] = useState<boolean>(false);

    useEffect(() => {

        const fetchedUser = async () => {
            try {
                const userFetched = await getUser(userInfo.uid!);
                console.log(userFetched)
                const queryFollowing = query(collection(db, "users", userFetched.id, "followers"), where("uid", "==", session?.user?.uid!));
                const userResult = await getDocs(queryFollowing);
                if (userResult.docs.length) {
                    setFollows(true);
                    return;
                }
                setFollows(false); 
            } catch (error) {
                console.log(error)
                
            }
        }

        if (session && session?.user?.uid) {
            fetchedUser()
        }

    }, [session]);

   

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

        }
    };

    return (
        <header className="flex gap-4 p-4">
            <section className="p-2">
            {/* {
                isLoggedUser && session?.user.image 
                ? 
                    (
                        <img src={session?.user.image} alt="" className="rounded-full" />
                    ) 
                : 
                isLoggedUser && user?.profileImage 
                ? 
                    (
                        <img src={user?.profileImage} alt="" className="rounded-full" />
                    ) 
                :   
                    (
                        <User size={"74.172px"} weight="thin" className="border rounded-full" />
                    )
            } */}
            </section>
            <section className="flex flex-col w-full p-2">
                <section className="flex gap-2 items-center p-4 w-full">
                    <div className="grow">
                        <p className="font-semibold text-lg">{userInfo.username}</p>
                    </div>
                    {
                        LoggedUser.isLoggedUser === isLoggedUser 
                        ? 
                            (
                                <>
                                    <div>
                                        <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400">Edit Profile</button>
                                    </div>
                                    <div>
                                        <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400">View Archive</button>
                                    </div>
                                    <div className="">
                                        <Gear size={"30px"} weight="light" />
                                    </div>
                                </>
                            )
                        :
                            (
                                <div>
                                    <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400" onClick={handleFollow}>
                                        <div className="flex items-center gap-2">
                                            {
                                                !follows 
                                                ? 
                                                    ( 
                                                        <UserPlus weight="thin" className="inline text-xl" /> 
                                                    )
                                                :  
                                                    ( 
                                                        <UserCheck weight="thin" className="inline text-xl" />
                                                    )
                                            }
                                            <p>{!follows ? "Follow" : "Following"}</p>
                                        </div>
                                    </button>
                                </div>
                            )
                    }
                </section>
                <ProfileStats userInfo={userInfo} isLoggedUser={isLoggedUser} />   
            </section>
    </header>
    )
}