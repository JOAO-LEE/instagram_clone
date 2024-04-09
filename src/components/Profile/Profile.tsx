"use client";

import { ChatCircle, Gear, Heart } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
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

export default function Profile() {
    const { data: session } = useSession();
    const { isOpen } = useModalState();
    const [userPosts, setUserPosts] = useState<ProfilePostDTO[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (session && (session.user.username && session.user.uid)) {

                    const posts = query(collection(db, "posts"),
                        where("username", "==", session.user.username), 
                        where("uid", "==", session.user.uid));
                       
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
                }
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };
        
        if (session) {
            fetchUserPosts();
        }
    }, [session, db]);
    
    return (
        <>
            {
                userPosts.length === 0 && !(session?.user.username && session.user.uid)
                ?
                    (
                        <ProfileLoadingSkeleton />
                    ) 
                :   
                    (
                        <div className="flex gap-1 flex-col items-center">
                            <ProfileInfo session={session} userPosts={userPosts} />
                            <ProfileActions />
                            <ProfilePosts userPosts={userPosts} setStateFunction={setUserPosts}/>
                        </div> 
                    )
            }
            {
                isOpen 
                && 
                    (
                        <UploadModal />

                    )
            }
        </>
    )         
}