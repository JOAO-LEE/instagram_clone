import { UserStoryDTO } from "@/model/userStory.dto";

export default function Story({username, image}: UserStoryDTO) {
    return (
        <div>
            <img src={image} alt="`${username} profile photo`" />
            <p>{username}</p>
        </div>
    )
}