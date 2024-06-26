"use client"

import { PostDTO } from "@/model/Post.dto";
import Post from "./Post/Post";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../../firebase";
import PostLoadingSkelenton from "@/components/Loadings/PostLoadingSkeleton";

export default  function Posts() {
    const { data: session, status } =  useSession();
    const [posts, setPosts] = useState<Array<any>>([]);
    console.log(session)
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), 
        (snapshot) => {
            setPosts(snapshot.docs);
            
        });
        return () => unsubscribe();

    }, [db]);

    return ( 
        <section className="flex flex-col justify-center min-w-full p-3 sm:max-w-fit gap-4">
            { 
                posts.length 
                ? 
                (
                    <>
                        {
                            posts.map((post: any, index: number) => (
                                <Post key={post.id} username={post.data().username} caption={post.data().caption} image={post.data().image} profileImage={post.data().profileImage} id={post.id} uid={post.data().uid} index={index} length={posts.length} />
                            )) 
                        } 
                    </> 
                )
                :
                (
                    <PostLoadingSkelenton />
                )
            }
        </section>
       
    )
}