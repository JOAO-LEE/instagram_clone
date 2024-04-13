'use client'

import { ProfilePostDTO } from "@/model/ProfilePost.dto";
import ProfileStats from "../ProfileStats";
import { Gear, UserPlus, User, UserCheck } from "@phosphor-icons/react";
// import { User } from "@phosphor-icons/react/dist/ssr/User";
import { useSession } from "next-auth/react";
import { PostDTO } from "@/model/Post.dto";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { username } from "minifaker";

type UserInfo = Pick<PostDTO, 'uid' | 'username'>;

export default function ProfileInfo({ userPosts, userInfo }: { userPosts: Array<ProfilePostDTO>, userInfo: UserInfo } ) {
    const { data: session } = useSession();
    const [isLoggedUser, setIsLoggedUser] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const [follows, setFollows] = useState<boolean>(false);
    useEffect(() => {
        const isLoggedUserConfirmation = session?.user.username === userInfo.username && session?.user.uid === userInfo.uid
        if (isLoggedUserConfirmation) {
            setIsLoggedUser(true)
            // const unsubscribe = onSnapshot(query(collection(db, "users", "following"), where("uid", "==", userInfo.uid)), 
            // (snapshot) => {
           
                return;
        // });
        }
        

        getUser()
    }, [])

 
    const getUser = async () => {
        try {
            const userQuery = query(collection(db, "users"),
            where("uid", "==", userInfo.uid)); 
            const searchedUser = await getDocs(userQuery);
            // const
            if (searchedUser.empty) {
                throw new Error('User does not exist.')
            }
            const foundUser = searchedUser.docs[0]?.data();
            setUser(foundUser);

        } catch (error) {
            console.log(error);
        }
    }

    const getLoggedUser = async () => {
        const userQuery = query(collection(db, "users"), where("uid", "==", session?.user?.uid));
        const userDocs = await getDocs(userQuery);
        console.log(userDocs.docs[0].id)
        return userDocs.docs[0];
    }

    const handleFollow = async (): Promise<void> => {
        const loggedUser = await getLoggedUser();
        if (!isLoggedUser && !follows) {
            console.log('oi')
            await setDoc(doc(db, "users", loggedUser.id, "following", userInfo.uid! ), { uid: userInfo.uid, username: userInfo.username });
            setFollows(true);
            return;
        }
        await deleteDoc(doc(db, "users", loggedUser.id, "following", userInfo.uid!))
        setFollows(false);
    };

    return (
        <header className="flex gap-4 p-4">

            <section className="p-2">
            {
                isLoggedUser && session?.user.image 
                ? 
                    (
                        <img src={session?.user.image} alt="" className="rounded-full" />
                    ) 
                : 
                !isLoggedUser && user?.profileImage 
                ? 
                    (
                        <img src={user?.profileImage} alt="" className="rounded-full" />
                    ) 
                :   
                    (
                        <User size={"74.172px"} weight="thin" className="border rounded-full" />
                    )
            }
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