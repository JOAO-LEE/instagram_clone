import { PostDTO } from "@/model/Post.dto";
import { BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt, Smiley } from "@phosphor-icons/react/dist/ssr";

export default function Post({username, postCaption, userImage, postImage}: PostDTO) {
    return (
     <section className="border-b max-w-">
        <header className="flex items-center p-5">
            <img src={userImage} alt={`${username} profile photo`} className="h-12 rounded-full object-cover border p-1 mr-3" />
            <p className="font-bold flex-1">{username}</p>
        <DotsThree size={32} className="h-5" />
        </header>
            <img src={postImage} alt={`${username} post`} className="object-cover w-full max-w-full" />
        <div className="flex justify-between">
            <div className="flex">
                <Heart className="action-buttons"/>
                <ChatCircle className="action-buttons"/>
                <PaperPlaneTilt className="action-buttons"/>
            </div>
        <BookmarkSimple className="action-buttons"/>
        </div>
        <p className="p-5 truncate"><span className="font-bold mr-2">{username}</span>{postCaption}</p>
        <form className="flex items-center p-4 box-border m-0">
            <input type="text" name="" id="" placeholder="Add a comment" className="flex-1 border-none focus:ring-0"/>
            <button className="text-blue-400 font-bold" >Post</button>
            <Smiley size={30}/> 
        </form>
     </section>
    )
}