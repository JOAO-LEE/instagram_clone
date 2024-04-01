import { PostDTO } from "@/model/Post.dto";
import { BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt, Smiley, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { FormEvent, useEffect, useRef, useState } from "react";
import { db } from "../../../../../firebase";
import { useSession } from "next-auth/react";

export default function Post({ username, caption, profileImage, image, id }: PostDTO) {
    const {data: session} = useSession();
    const commentRef = useRef<HTMLInputElement>(null);
    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<Array<any>>([]);
    const [hasToShowComments, setHasToShowComments] = useState<boolean>(false);


    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "posts", id, "comments"), orderBy("timestamp", "desc")), 
            (snapshot) => {
                console.log(snapshot.docs)
                setComments(snapshot.docs);
        });
    }, [db, id]);

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
            userImage: session?.user.image,
            timestamp: serverTimestamp()
        });
    }

    

    return (
     <section className="border-b w-full mx-auto p-1">
        <header className="flex items-center p-1">
            {profileImage ? <img src={profileImage} alt={`${username} profile photo`} className="h-12 rounded-full object-cover border p-1 mr-3" /> : <UserCircle size={'48px'} className="p-1 mr-3"/>}
            <p className="font-semibold flex-1 text-sm">{username}</p>
        <DotsThree className="post-buttons" />
        </header>
            <img src={image} alt={`${username} post`} className="object-cover mx-auto border-2 border-gray-50  rounded-sm shadow-sm" />
        <div className="flex justify-between mt-3">
            <div className="flex gap-2">
                <Heart className="post-buttons"/>
                <ChatCircle className="post-buttons" onClick={handleChatIconClick} />
                <PaperPlaneTilt className="post-buttons"/>
            </div>
        <BookmarkSimple className="post-buttons"/>
        </div>
        <p className="mt-3 truncate text-sm"><span className="font-bold mr-1">{username}</span>{caption}</p>
        {comments.length > 0 && (
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
                                <div key={index} className="flex gap-1"> 
                                    <p className="font-semibold">{comment.data().username}</p>
                                    <p className="truncate">{comment.data().comment}</p>
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