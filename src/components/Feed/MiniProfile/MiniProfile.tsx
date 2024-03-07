import { User } from "firebase/auth";

export default function MiniProfile({ user }: {user?: User}) {

    return (
        <div className="flex mt-14 justify-between p-1">
            <div className="flex">
            <img src={user?.photoURL!} className="h-12 rounded-full object-cover border p-[2px]" />
                <div className="ml-4">
                    <h2 className="font-bold text-sm">{user?.email}</h2>
                    <h3 className="text-xs text-gray-400">{user?.displayName}</h3>
                </div>
            </div> 
            <button className="text-blue-400 text-xs font-semibold">Switch</button>
     </div> 
    )
}

