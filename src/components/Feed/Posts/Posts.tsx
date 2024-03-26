'use client'
import { PostDTO } from "@/model/Post.dto";
import Post from "./Post/Post";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../../firebase";

export default  function Posts() {
    const { data: session, status } =  useSession();
    const [posts, setPosts] = useState<Array<any>>([]);
 
    if (!session || status !== "authenticated") {
        redirect('/sign-up')
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts"), orderBy("timestamp", "desc")), 
        (snapshot) => {
            setPosts(snapshot.docs);
            // console.log(posts)

            console.log(posts)
        });

    }, []);

    return (
        <section className="flex flex-col justify-center w-full p-3 sm:max-w-fit">
            {
                posts.map((post: any) => (
                    <Post key={post.id} username={post.data().username} caption={post.data().caption} image={post.data().image} profileImage={post.data().profileImage} />
                ))
            }
        </section>
    )
}