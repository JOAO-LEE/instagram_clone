'use client'

import { ProfilePostDTO } from "@/model/ProfilePost.dto";
import ProfileStats from "../ProfileStats";
import { Gear } from "@phosphor-icons/react";
import { User } from "@phosphor-icons/react/dist/ssr/User";
import { useSession } from "next-auth/react";
import { PostDTO } from "@/model/Post.dto";
import { useEffect, useState } from "react";

type UserInfo = Pick<PostDTO, 'uid' | 'username'>;

export default function ProfileInfo({ userPosts, userInfo }: { userPosts: Array<ProfilePostDTO>, userInfo: UserInfo } ) {
    const { data: session } = useSession();
    const [isLoggedUser, setIsLoggedUser] = useState<boolean>(false);

    useEffect(() => {
        const isItLoggedUser = userInfo.uid === session?.user.uid && userInfo.username === session?.user.username;
        if (isItLoggedUser) {
            setIsLoggedUser(true);
        }


    }, [])


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
                    {
                        isLoggedUser 
                        && 
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
                    }
                  
                </section>
                <ProfileStats userPosts={userPosts}/>   
            </section>
    </header>
    )
}