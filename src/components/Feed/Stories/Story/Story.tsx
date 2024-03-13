import { UserStoryDTO } from "@/model/UserStory.dto";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export default function Story({username, image, isUser}: UserStoryDTO) {
    return (
        <div className="relative group">
            <div className="min-w-14 bg-gradient-to-tl from-fuchsia-600  via-red-500 to-yellow-500 rounded-full p-[2px] group-hover:scale-110 transition-transform duration-200 ease-out text-center">
                <img src={image} alt="`${username} profile photo`" className="min-h-14 min-w-14 object-cover rounded-full border-1"/>
            </div>
            {isUser && <Plus className="group-hover:scale-110 group-hover:opacity-85 transition-transform duration-200 ease-linear rounded-full bg-sky-400 text-white text-[22px] absolute left-[40px] bottom-5"/>}
            <p className="text-xs w-14 truncate">{username}</p>
        </div>
    )
}