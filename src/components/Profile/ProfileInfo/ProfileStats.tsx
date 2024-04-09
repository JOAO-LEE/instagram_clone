import { ProfilePostDTO } from "@/model/ProfilePost.dto";

export default function ProfileStats({ userPosts }: { userPosts: Array<ProfilePostDTO> }) {
    console.log(userPosts.length !== 0 )
    return (
        <section className="flex gap-8 p-2 text-lg">  
            <span className=""><p className="font-semibold inline">{userPosts.length}</p> post{userPosts.length > 1 || userPosts.length === 0 ? "s" : ""}</span>
            <span className=""><p className="font-semibold inline">123</p> followers</span>
            <span className="grow"><p className="font-semibold inline" >100</p> following</span>
        </section>
    )
}