import { User } from "@phosphor-icons/react/dist/ssr";
import { Session } from "next-auth";

export default function PhotoAndInfo(session: Session) {
    return (
        <div className="w-fit items-center flex gap-2">
            {
                session?.user.image 
                ?
                <img src={session?.user.image!} alt="User image" className="rounded-full w-20 object-contain" />
                :
                <User size={80} weight="thin" className="border border-gray-400 rounded-full bg-zinc-100" />
            }
                <div>
                    <p>{session?.user.username}</p>
                    <p className="text-gray-400 font-normal">{session?.user.name ?? ""}</p>
                </div>
        </div>

    )
}