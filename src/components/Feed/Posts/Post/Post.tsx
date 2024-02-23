import { PostDTO } from "@/model/Post.dto";
import { BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";

export default function Post({username, postCaption, userImage, postImage}: PostDTO) {
   
    return (
     <section className="border-b border-gray-200">
        <header className="flex items-center p-5">
            <img src={userImage} alt={`${username} profile photo`} className="h-12 rounded-full object-cover border p-1 mr-3" />
            <p className="font-bold flex-1">{username}</p>
        <DotsThree size={32} className="h-5" />
        </header>
        {/* <div> */}
            <img src={postImage} alt={`${username} post`} className="object-cover w-full" />
            <p className="font-bold">{username}</p>
        {/* </div> */}

        <div className="flex justify-between px-4">
            <div className="flex space-x-4">
                <Heart className="action-buttons"/>
                <ChatCircle className="action-buttons"/>
                <PaperPlaneTilt className="action-buttons"/>
            </div>
        <BookmarkSimple className="action-buttons"/>
        </div>
     </section>
    )
}

