'use client'
import { PostDTO } from "@/model/Post.dto";
import Post from "./Post/Post";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default  function Posts() {
    const { data: session, status } =  useSession();
 
    if (!session || status !== "authenticated") {
        redirect('/sign-up')
    }
    
    const posts: PostDTO[] = [{id: 1, username: 'joaumlee', userImage: session!.user!.image!, postImage: 'https://plus.unsplash.com/premium_photo-1680087014917-904bb37c5191?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', postCaption: 'Drinking some fine wine today...'}, {id: 2, username: 'joaumlee', userImage: session.user.image!, postImage: 'https://plus.unsplash.com/premium_photo-1664124888904-435121e89c74?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJvcGljYWwlMjBiZWFjaHxlbnwwfHwwfHx8MA%3D%3D', postCaption: 'Beautiful place!'}];

    return (
        <section className="w-full p-3 sm:max-w-fit">
            {
                posts.map((post: PostDTO) => (
                    <Post key={post.id} username={post.username} postCaption={post.postCaption} postImage={post.postImage} userImage={post.userImage} />
                ))
            }
        </section>
    )
}