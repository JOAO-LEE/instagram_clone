'use client'

import { ProfilePostDTO } from "@/model/ProfilePost.dto";
import ProfileStats from "../ProfileStats";
import { Gear, UserPlus, User, UserCheck } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { PostDTO } from "@/model/Post.dto";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { UserInfo, UserPageDTO } from "@/model/UserPage.dto";
import { getUser } from "@/utils/getUser";

export default function ProfileInfo({ userPosts, userInfo }: { userPosts: Array<ProfilePostDTO>, userInfo: UserInfo } ) {
    const { data: session } = useSession();
    const [isLoggedUser, setIsLoggedUser] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const [follows, setFollows] = useState<boolean>(false);
    // const [userPage, setUserPage] = useState<UserPageDTO>({} as UserPageDTO)

    useEffect(() => {
        const isLoggedUserConfirmation = session?.user.username === userInfo.username && session?.user.uid === userInfo.uid;
        if (isLoggedUserConfirmation) {
            setIsLoggedUser(true);
            // const fetchedLoggedUser = async () => {
            //     const loggedUser = await getUser(session?.user.uid!);
            //     setUserPage(prev => ({...prev, uid: loggedUser.data().uid, username: session?.user?.username! }));
            //     onSnapshot(query(collection(db, "users", loggedUser.id, "following")), 
            //     (snapshot) => {
            //         setUserPage(prev => ({ ...prev, following: snapshot.docs.map(doc => doc.data as UserInfo) }));
            //     });
            //     onSnapshot(query(collection(db, "users", loggedUser.id, "followers")), 
            //     (snapshot) => {
            //         setUserPage(prev => ({ ...prev, followers: snapshot.docs.map(doc => doc.data as UserInfo) }));
            //     });
            // }
            // fetchedLoggedUser()
            return;
        }


        const fetchedUser = async () => {
            try {
                if (session) {
                    const userFetched = await getUser(userInfo.uid!);
                    const queryFollowing = query(collection(db, "users", userFetched.id, "followers"), where("uid", "==", session?.user?.uid!));
                    const userResult = await getDocs(queryFollowing);
                    console.log(userResult)
                    if (userResult.docs.length) {
                        setFollows(true);
                        return;
                    }
                    setFollows(false); 
                }
                
            } catch (error) {
                
            }
        }
        fetchedUser()

        // setUser(prev => ({ ...prev}));
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
                        isLoggedUser 
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
                <ProfileStats userPosts={userPosts}/>   
            </section>
    </header>
    )
}