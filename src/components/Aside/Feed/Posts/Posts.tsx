import { PostDTO } from "@/model/Post.dto";
import Post from "./Post/Post";

export default function Posts() {
    const posts: PostDTO[] = [{id: 1, username: 'joaumlee', userImage: 'https://pbs.twimg.com/profile_images/1745817608992047104/maCsEohv_400x400.jpg', postImage: 'https://plus.unsplash.com/premium_photo-1680087014917-904bb37c5191?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', postCaption: 'Drinking some fine wine today...'}, {id: 2, username: 'joaumlee', userImage: 'https://pbs.twimg.com/profile_images/1745817608992047104/maCsEohv_400x400.jpg', postImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSikT0MmTNtyH4eUtOI5OeDEsoDDoQWk1MAg&usqp=CAU', postCaption: 'Beautiful place!'}];
    return (
        <section>
            {posts.map((post: PostDTO) => (
                <Post key={post.id} username={post.username} postCaption={post.postCaption} postImage={post.postImage} userImage={post.userImage} />
            ))}
        </section>
    )
}