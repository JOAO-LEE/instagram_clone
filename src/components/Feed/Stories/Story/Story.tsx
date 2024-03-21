import { UserStoryDTO } from "@/model/UserStory.dto";
import { Plus, UserCircle } from "@phosphor-icons/react/dist/ssr";

export default function Story({ username, image, isUser }: UserStoryDTO) {
    return (
        <div className="relative group  max-w-fit">
            <div className="min-w-14 bg-gradient-to-tl from-fuchsia-600  via-red-500 to-yellow-300 rounded-full p-[2px] group-hover:scale-110 transition-transform duration-200 ease-out text-center">
                { image ? <img src={image} alt="`${username} profile photo`" className="min-h-14 min-w-14 object-cover rounded-full border-1"/> : <UserCircle className="min-h-14 min-w-14 rounded-full  border-1 bg-white" /> }
            </div>
            {isUser && <Plus className="group-hover:scale-125 group-hover:opacity-85 transition-transform duration-200 ease-in-out rounded-full bg-sky-400 text-white text-[22px] absolute left-[45px] bottom-[1.05rem]"/>}
            <p className="text-xs w-14 truncate">{username}</p>
        </div>
    )
}