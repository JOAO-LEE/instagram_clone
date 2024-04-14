"use client";

import NoPosts from "@/components/Feed/Posts/Post/NoPosts";
import { ProfileInfo } from "@/model/Profile/ProfileInfo";
import { ProfilePostDTO } from "@/model/ProfilePost.dto";
import { UserInfo } from "@/model/UserPage.dto";
import { Heart, ChatCircle } from "@phosphor-icons/react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../../../firebase";

export default function ProfilePosts({ userInfo, isLoggedUser }: ProfileInfo) {
    const [userPosts, setUserPosts] = useState<ProfilePostDTO[]>([]);
    const router = useRouter();

    useEffect(() => {
        // setIsLoading(true);
        const fetchUserInfo = async () => {
            try {
                const posts = query(collection(db, "posts"),
                    where("username", "==", userInfo), 
                    where("uid", "==", userInfo));
                    
                const queryPosts = await getDocs(posts);
                const postsData = queryPosts.docs.map(async(doc)=> {

                    const likes = query(collection(db, "posts", doc.id, "likes"))
                    const queryLikes = await getDocs(likes);
                    const likesAmount = queryLikes.docs.map(docLikes => {
                        return docLikes.data();
                    });

                    const comments = query(collection(db, "posts", doc.id, "comments"))
                    const queryComments = await getDocs(comments);
                    const commentsAmount = queryComments.docs.map(docComments => {
                        return docComments.data();
                    });

                    return { 
                        id: doc.id,
                        stats: false, 
                        ...doc.data(), 
                        likesAmount: likesAmount.length, 
                        commentsAmount: commentsAmount.length 
                    } as ProfilePostDTO;
                });
                const promiseAllPosts = await Promise.all(postsData);
                setUserPosts(promiseAllPosts);
                // setIsLoading(false);

            } catch (error) {
                // setIsLoading(false)
                console.error("Error fetching user posts:", error);
            }
        };
        
        if (userInfo.username && userInfo.uid) {
            fetchUserInfo();
        }

    }, []);

    const handleMouseOver = (index: number) => {
        setUserPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index].stats = true;
            return updatedPosts;
        });
    };

    const handleMouseLeave = (index: number) => {
        setUserPosts(prevPosts => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index].stats = false;
            return updatedPosts;
        });
    };

    return (
        <>
        </>
        // <main className="grid grid-cols-3 gap-2">
        //     {
        //         userPosts.length ? userPosts.map((userPost, index) => (
        //             <div className="w-fit relative cursor-pointer" key={index} 
        //             onMouseOver={() => handleMouseOver(index)}
        //             onMouseLeave={() => handleMouseLeave(index)}
        //             onClick={() => router.push(`/post/${userPost.id}`)}
        //             >
        //                 <img src={userPost.image} alt="" className="h-64 object-cover w-64 hover:brightness-50 transition-all duration-500 hover:scale-105 hover:shadow-lg shadow-black" />
        //                 {
        //                     userPost.stats 
        //                     ?
        //                     (
        //                         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6 pointer-events-none">
        //                             <div className="flex gap-2 text-white">
        //                                 <Heart 
        //                                 weight="fill" 
        //                                 className="text-white text-xl"/>
        //                                 <p>{userPost.likesAmount}</p>
        //                             </div>
        //                             <div className="flex gap-2 text-white cursor-none">
        //                                 <ChatCircle 
        //                                 weight="fill" 
        //                                 className="text-white text-xl"/>
        //                                 <p>{userPost.commentsAmount}</p>
        //                             </div>
        //                         </div>
        //                     ) 
        //                     :
        //                     <>
        //                     </>
        //                 }
        //             </div>
        //         ))
        //         :
        //         (
        //             <NoPosts username={'user'}/>
        //         )
                
        //     }
        // </main>
    )
}