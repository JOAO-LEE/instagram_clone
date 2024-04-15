import { FormEvent, useEffect, useRef, useState } from "react";
import { db } from "../../../../../firebase";
import { PostDTO } from "@/model/Post.dto";
import { useSession } from "next-auth/react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { HeartBreak, TrashSimple, User, BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt, Smiley } from "@phosphor-icons/react";
import Link from "next/link";

export default function Post({ username, caption, profileImage, image, id, uid }: PostDTO) {

    const { data: session } = useSession();
    const commentRef = useRef<HTMLInputElement>(null);
    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<Array<any>>([]);
    const [hasLiked, setHasLiked] = useState<boolean>(false)
    const [likes, setLikes] = useState<any[]>([]);
    const [hasToShowComments, setHasToShowComments] = useState<boolean>(false);
    const [showHeart, setShowHeart] = useState<boolean>(false);

    
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), 
            (snapshot) => {
                setComments(snapshot.docs);

            });
            return () => unsubscribe();
    }, [db]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts", id, "likes"), orderBy("timestamp", "desc")), 
            (snapshot) => {
                setLikes(snapshot.docs);
            });

        return () => unsubscribe();
    }, [db]);

    useEffect(() => {
        const liked = likes.findIndex((like: any) => like.id === session?.user?.uid);
        if (liked !== -1) {
            setHasLiked(true);
            return;
        }
        setHasLiked(false)

    }, [likes]);

    const handleChatIconClick = () => {
        if (commentRef.current) {
            commentRef.current.focus();
        }
    };

    const handlePostComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment("");
        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session?.user.username,
            userImage: session?.user.image ?? "",
            uid: session?.user.uid,
            timestamp: serverTimestamp()
        });
    };

    const handleDeleteComment = async (idComment: string): Promise<void> => {
        try {
            const documentRef = doc(db, "posts", id, "comments", idComment);
            await deleteDoc(documentRef);
        } catch (error) {
        console.error("Erro ao excluir o documento:", error);
        }
    };

    const handleLikePost = async (): Promise<void> => {
        if (hasLiked) {
            setTimeout(() => {
                setShowHeart(true)
            }, 250)
            await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid!));
            setTimeout(() => {
                setShowHeart(false)
            }, 500)
            return;

        }
        setTimeout(() => {
            setShowHeart(true)
        }, 250)
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid!), { timestamp: serverTimestamp(), uid: session?.user.uid!, username: session?.user.username })
        setTimeout(() => {
            setShowHeart(false)
        }, 500)
    };

    return (
     <section className="border-b w-full mx-auto p-1">
        <header className="flex items-center p-1">
            <Link href={{pathname: `user/${username}`, query: {uid} }}>
                {profileImage ? <img src={profileImage} alt={`${username} profile photo`} className="h-12 rounded-full object-cover border p-1 mr-3" /> : <User weight="thin" size={"48px"} className="p-1 mr-3 border rounded-full"/>}
            </Link>
            <Link href={{pathname: `user/${username}`, query: {uid} }} className="font-semibold flex-1 text-sm">
                {username}
            </Link>
        <DotsThree weight="thin" className="post-buttons" />
        </header>
        <div className="relative mx-auto">
            <img src={image} alt={`${username} post`} className="object-cover  mx-auto border-2 border-gray-50 rounded-sm shadow-sm cursor-pointer" onDoubleClick={handleLikePost} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                { (hasLiked && showHeart) && <Heart weight="fill" className="text-[150px] opacity-60 text-red-500 animate-ping"/> }
                { (!hasLiked && showHeart) && <HeartBreak  weight="fill" className="text-[150px] opacity-60 text-gray-500 animate-ping"/> }
            </div>
        </div>
          { 
            likes.length 
            ?
                (
                    <div className="pt-1 mt-1.5">
                        <span className="text-sm inline">Liked by <p className="font-semibold inline">{likes[0]?.data().username}</p> {likes.length > 1 && <span> and other <p className="font-semibold inline">{likes.length - 1}</p> user{likes.length - 1 > 1 ? "s" : ""} </span>}</span> 
                    </div>
                ) 
            : 
                (
                    <></>
                )
          }
        <div className="flex justify-between mt-3">
            <div className="flex gap-2">
              { 
                hasLiked 
                ? 
                  <Heart
                  onClick={handleLikePost}
                  weight="fill" className="post-buttons text-red-600 hover:bg-transparent hover:text-gray-300"/>
                :
                  <Heart
                  weight="thin"
                  onClick={handleLikePost}
                  className="post-buttons"/>
                }
                <ChatCircle weight="thin" className="post-buttons" onClick={handleChatIconClick} />
                <PaperPlaneTilt weight="thin" className="post-buttons"/>
            </div>
        <BookmarkSimple weight="thin" className="post-buttons"/>
        </div>
        {
            caption 
            && 
                (
                    <p className="mt-3 truncate text-sm"><Link href={{pathname: `user/${username}`, query: {uid} }}><span className="font-bold mr-1">{username}</span></Link>{caption}</p>
                ) 
        }
        {
            comments.length > 0 
            && 
                (
                    <div className="mt-1">
                        { 
                            !hasToShowComments 
                            ?  
                                ( 
                                    <p className="text-gray-400 cursor-pointer text-sm" onClick={() => setHasToShowComments(!hasToShowComments)}>View { comments.length === 1 ? "one" : "all" } {comments.length > 1 && comments.length} comment{comments.length > 1 ? "s" : ""}</p> 
                                )
                            :  
                                (
                                    <p className="text-gray-400 cursor-pointer text-sm" onClick={() => setHasToShowComments(!hasToShowComments)}>Hide { comments.length === 1 ? "one" : "all" } { comments.length > 1 && comments.length} comment{comments.length > 1 ? "s" : ""} </p>
                                ) 
                        }
                        { 
                            hasToShowComments 
                            ? 
                                (
                                    comments.map((comment, index) => (
                                        <div key={index} className="group flex gap-1 items-center relative">
                                            <Link href={{pathname: `user/${comment.data().username}`, query: {uid: `${comment.data().uid}`} }}>
                                                <p className="font-semibold text-sm">{comment.data().username}</p>
                                            </Link> 
                                            <p className="truncate text-sm flex-1">{comment.data().comment}</p>
                                            {
                                                (session?.user.username === comment.data().username || username === session?.user.username) 
                                                && 
                                                    (
                                                        <TrashSimple onClick={() => handleDeleteComment(comment.id)} className="text-black absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:text-red-500 ease-in-out cursor-pointer" weight="light"/>
                                                    )
                                            }
                                        </div>
                                    ))
                                )
                            : 
                                (
                                    <></>
                                )   
                        } 
                    </div>
            )}
        <form
        onSubmit={handlePostComment} 
        className="flex items-center m-0">
            <input 
            ref={commentRef} 
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            type="text" name="" id="" placeholder="Add a comment" className="flex-1 border-none focus:ring-0 text-sm"/>
            <Smiley size={15}/> 
        </form>
     </section>
    )
}