import { UserStoryDTO } from "@/model/UserStory.dto";

export default function Story({username, image}: UserStoryDTO) {
    return (
        <div>
            <img src={image} alt="`${username} profile photo`" className="h-14 rounded-full border-2 border-red-500 hover:scale-110 transition-transform duration-200 ease-out"/>
            <p className="text-xs w-14 truncate">{username}</p>
        </div>
    )
}