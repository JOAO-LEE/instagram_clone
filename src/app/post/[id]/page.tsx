"use client"

import Post from "@/components/Feed/Posts/Post/Post";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { PostDTO } from "@/model/Post.dto";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import PostLoadingSkelenton from "@/components/Loadings/PostLoadingSkeleton";

export default function  ProfilePage({params: { id }}: { params: { id: string }}) {
  const [post, setPost] = useState<PostDTO>({} as PostDTO)
  const [loadingPost, setLoadingPost] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const retrievedPost = await getPost(id);
      if (retrievedPost) {
        setPost(retrievedPost);
      }
    };

    getData();
    }, [id]);

  const getPost = async (id: string) => {
    let post: any;
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      post = docSnap.data();
      setLoadingPost(false)

      return post   
    }
  } 

  return (
    <main className="h-screen w-full">
      <div className="p-4" title="Go back">
        <ArrowLeft size={32} onClick={() => router.back()} className="sidebar-buttons"/>
      </div>
      <section className="max-w-full flex justify-center items-center">
        <section className="w-full md:w-1/2 lg:w-1/3 p-3">
          {
            loadingPost
            ? 
              (
                <PostLoadingSkelenton />
              )
            :
              (
                <Post caption={post?.caption} id={id} image={post?.image} profileImage={post?.profileImage} username={post?.username} uid={post?.uid} />
              )
          }
        </section>
      </section>
    </main>
  )
}