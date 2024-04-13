"use client";

import { useModalState } from "../../../store/modalState";
import UploadModal from "../Modals/UploadModal/UploadModal";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import ProfileLoadingSkeleton from "../Loadings/ProfileLoadingSkeleton";
import ProfileActions from "./ProfileActions/ProfileActions";
import { ProfilePostDTO } from "@/model/ProfilePost.dto";
import ProfilePosts from "./ProfilePosts/ProfilePosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo/ProfileInfo";
import { useSearchParams } from 'next/navigation'
import { useSession } from "next-auth/react";
import NoPosts from "../Feed/Posts/Post/NoPosts";

export default function Profile({ username }: { username: string }) {
    const searchParams = useSearchParams();
    const uidParam = searchParams.get('uid');
    const { isOpen } = useModalState();
    const [userPosts, setUserPosts] = useState<ProfilePostDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: session} = useSession();

    useEffect(() => {
        setIsLoading(true);
        const fetchUserInfo = async () => {
            try {
                const posts = query(collection(db, "posts"),
                    where("username", "==", username), 
                    where("uid", "==", uidParam));
                    
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
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false)
                console.error("Error fetching user posts:", error);
            }
        };
        
        if (username && uidParam) {
            fetchUserInfo();
        }
    }, []);
    
    return (
        <>
            {
                !isLoading && userPosts.length > 0 && (
                    <div className="flex gap-1 flex-col items-center">
                        <ProfileInfo userPosts={userPosts} userInfo={{username, uid: uidParam!}}/>
                        <ProfileActions />
                        <ProfilePosts userPosts={userPosts} setStateFunction={setUserPosts}/>
                    </div> 
                )
            }
            {
                isOpen && (
                    <UploadModal />
                )
            }
            { isLoading && <ProfileLoadingSkeleton /> }
        </>
    )         
}