import { PostDTO } from "@/model/Post.dto";

export default function Post({username, postCaption, userImage, postImage}: PostDTO) {
   
    return (
        <>
        <h1>{username}</h1>
        </>
    )
}