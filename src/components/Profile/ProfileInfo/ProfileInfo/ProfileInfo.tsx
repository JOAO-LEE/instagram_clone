'use client'

import { ProfilePostDTO } from "@/model/ProfilePost.dto";
import ProfileStats from "../ProfileStats";
import { Gear } from "@phosphor-icons/react";
import { User } from "@phosphor-icons/react/dist/ssr/User";
import { useSession } from "next-auth/react";
import { PostDTO } from "@/model/Post.dto";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { username } from "minifaker";

type UserInfo = Pick<PostDTO, 'uid' | 'username'>;

export default function ProfileInfo({ userPosts, userInfo }: { userPosts: Array<ProfilePostDTO>, userInfo: UserInfo } ) {
    const { data: session } = useSession();
    // const [isLoggedUser, setIsLoggedUser] = useState<boolean>(false);

    // useEffect(() => {
        
    //     if (isItLoggedUser) {
    //         setIsLoggedUser(true);
    //     }
        


    // }, [session])
 
    // const getUser = async (id: string) => {
    //     try {
    //         let post: any;
    //         if (!docSnap.exists()) {
    //             throw new Error()
    //         } 
    //         post = docSnap.data();

    //         return post
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    


    // const isLoggedUser 
    return (
        <header className="flex gap-4 p-4">
            <section className="p-2">
                {/* { 
                    session?.user.image 
                    ? 
                        (
                            <img src={session.user.image} alt="" className="rounded-full" />
                        ) 
                    : 
                        (
                            <User size={"74.172px"} weight="thin" className="border rounded-full" />
                        ) 
                }  */}
            </section>
            <section className="flex flex-col w-full p-2">
                <section className="flex gap-2 items-center p-4 w-full">
                    <div className="grow">
                        <p className="font-semibold text-lg">{userInfo.username}</p>
                    </div>
                    {/* {
                        isLoggedUser 
                        &&  */}
                            {/* ( */}
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
                            {/* ) */}
                    {/* } */}
                  
                </section>
                <ProfileStats userPosts={userPosts}/>   
            </section>
    </header>
    )
}