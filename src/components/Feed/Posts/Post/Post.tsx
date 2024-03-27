import { PostDTO } from "@/model/Post.dto";
import { BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt, Smiley, UserCircle } from "@phosphor-icons/react/dist/ssr";

export default function Post({ username, caption, profileImage, image }: PostDTO) {
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
                <ChatCircle className="post-buttons"/>
                <PaperPlaneTilt className="post-buttons"/>
            </div>
        <BookmarkSimple className="post-buttons"/>
        </div>
        <p className="mt-3 truncate text-sm"><span className="font-bold mr-2">{username}</span>{caption}</p>
        <form className="flex items-center m-0">
            <input type="text" name="" id="" placeholder="Add a comment" className="flex-1 border-none focus:ring-0 text-sm"/>
            <Smiley size={15}/> 
        </form>
     </section>
    )
}