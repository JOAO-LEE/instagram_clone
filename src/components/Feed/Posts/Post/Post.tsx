import { PostDTO } from "@/model/Post.dto";
import { BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt, Smiley } from "@phosphor-icons/react/dist/ssr";

export default function Post({username, postCaption, userImage, postImage}: PostDTO) {
    return (
     <section className="border-b w-full mx-auto p-1">
        <header className="flex items-center p-1">
            <img src={userImage} alt={`${username} profile photo`} className="h-12 rounded-full object-cover border p-1 mr-3" />
            <p className="font-semibold flex-1 text-sm">{username}</p>
        <DotsThree size={30} className="" />
        </header>
            <img src={postImage} alt={`${username} post`} className="object-cover mx-auto border-2 border-gray-200 rounded rounded-sm" />
        <div className="flex justify-between mt-3">
            <div className="flex gap-2">
                <Heart className="action-buttons"/>
                <ChatCircle className="action-buttons"/>
                <PaperPlaneTilt className="action-buttons"/>
            </div>
        <BookmarkSimple className="action-buttons"/>
        </div>
        <p className="mt-3 truncate text-sm"><span className="font-bold mr-2">{username}</span>{postCaption}</p>
        <form className="flex items-center m-0">
            <input type="text" name="" id="" placeholder="Add a comment" className="flex-1 border-none focus:ring-0"/>
            {/* <button className="text-blue-400 font-semibold">Post</button> */}
            <Smiley size={15}/> 
        </form>
     </section>
    )
}