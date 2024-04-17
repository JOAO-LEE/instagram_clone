"use client"

import { Gear } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation"

export default function ProfileActionsLogged({ username }: { username: string }) {
    const router = useRouter();
    return (
        <div className="flex items-center gap-2 px-1">
            <div>
                <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400">View Archive</button>
            </div>
            <div className="group">
                <Gear weight="light" className="cursor-pointer text-3xl group-hover:animate-spin-once-no-fade duration-1000" onClick={() => router.push(`/user/${username}/settings`)}/>
            </div>
        </div>
    )
}