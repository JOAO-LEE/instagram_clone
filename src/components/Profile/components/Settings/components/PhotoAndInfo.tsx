import { User } from "@phosphor-icons/react/dist/ssr";
import { Session } from "next-auth";

export default function PhotoAndInfo({user}: {user: Session["user"]}) {
    return (

        <div className="w-fit items-center flex gap-2">
            {
                user.image 
                ?
                <img src={user.image!} alt="User image" className="rounded-full w-20 object-contain" />
                :
                <User size={80} weight="thin" className="border border-gray-400 rounded-full bg-zinc-100" />
            }
                <div>
                    <p>{user?.username}</p>
                    <p className="text-gray-400 font-normal">{user.name ?? ""}</p>
                </div>
        </div>

    )
}