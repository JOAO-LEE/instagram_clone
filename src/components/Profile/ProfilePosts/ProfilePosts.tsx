import { ProfilePostDTO } from "@/model/ProfilePost.dto";
import { Heart, ChatCircle } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

export default function ProfilePosts({ userPosts, setStateFunction }: { userPosts: Array<ProfilePostDTO>, setStateFunction: Dispatch<SetStateAction<ProfilePostDTO[]>> }) {

    const handleMouseOver = (index: number) => {
        setStateFunction(prevPosts => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index].stats = true;
            return updatedPosts;
        });
    };

    const handleMouseLeave = (index: number) => {
        setStateFunction(prevPosts => {
            const updatedPosts = [...prevPosts];
            updatedPosts[index].stats = false;
            return updatedPosts;
        });
    };

    return (
        <main className="grid grid-cols-3 gap-2">
            {
                userPosts.length ? userPosts.map((userPost, index) => (
                    <div className="w-fit relative cursor-pointer" key={index} 
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    >
                        <img src={userPost.image} alt="" className="h-64 object-cover w-64 hover:brightness-50 transition-all duration-500 hover:scale-105 hover:shadow-lg shadow-black" />
                        {
                            userPost.stats 
                            ?
                            (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6 pointer-events-none">
                                    <div className="flex gap-2 text-white">
                                        <Heart 
                                        weight="fill" 
                                        className="text-white text-xl"/>
                                        <p>{userPost.likesAmount}</p>
                                    </div>
                                    <div className="flex gap-2 text-white cursor-none">
                                        <ChatCircle 
                                        weight="fill" 
                                        className="text-white text-xl"/>
                                        <p>{userPost.commentsAmount}</p>
                                    </div>
                                </div>
                            ) 
                            :
                            <>
                            </>
                        }
                    </div>
                ))
                :
                <>
                </>
            }
        </main>
    )
}