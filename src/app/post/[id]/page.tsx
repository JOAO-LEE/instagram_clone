"use client"
import Post from "@/components/Feed/Posts/Post/Post";
import {  doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { PostDTO } from "@/model/Post.dto";

export default function  ProfilePage({params: { id }}: { params: { id: string }}) {
    const [post, setPost] = useState<PostDTO>({} as PostDTO)


    useEffect(() => {
        const getData = async (): Promise<void> => {
          try {
            const retrievedPost = await getPost(id);
            setPost(retrievedPost);
          } catch (error) {
            console.error(error);
          }
        };
    
        getData();
      }, [id]);

    const getPost = async (id: string) => {
        try {
            let post: any;
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            console.log(docSnap)
    
            if (!docSnap.exists()) {
                throw new Error()
            } 
            post = docSnap.data();
            console.log(post)
            return post
        } catch (error) {
            console.error(error)
        }
    }


   
    return (
        <div className="w-1/4 p-4 max-h-fit mx-auto">
            {/* <img src={post?.data().image} alt="" /> */}
            <Post caption={post?.caption} id={id} image={post?.image} profileImage={post?.profileImage} username={post?.username} uid={post?.uid}/>
        </div>
    )
  }