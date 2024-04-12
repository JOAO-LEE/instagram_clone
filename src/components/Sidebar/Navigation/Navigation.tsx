"use client"

import { useModalState } from "../../../../store/modalState";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Compass, FilmSlate, Heart, House, MagnifyingGlass, MessengerLogo, Plus, User } from "@phosphor-icons/react";
import Link from "next/link";

export default function Navigation() {
    const { action } = useModalState();
    const { data: session } = useSession();
    const router = useRouter();
    const pathName = usePathname();
    // const location = uselo

    const handleNavigateToProfile = () => {
        console.log(pathName)
        const isProfilePage = pathName.includes(`/user/${session?.user?.username}`);
        if(isProfilePage) {
            router.refresh()
            return;
        }
        router.push(`user/${session?.user?.username}?uid=${session?.user?.uid}`)
    };
    
    return (
        <ul className="flex flex-col gap-7">
            <li className="sidebar-buttons" onClick={() => router.push("/")}>
                <House weight="thin" className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Home</p>
            </li>
            <li className="sidebar-buttons">
                <MagnifyingGlass weight="thin" className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Search</p>
            </li>
            <li className="sidebar-buttons">
                <Compass weight="thin" className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Explore</p>
            </li>
            <li className="sidebar-buttons">
                <FilmSlate weight="thin" className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Reels</p>
            </li>
            <li className="sidebar-buttons">
                <MessengerLogo weight="thin" className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Messages</p>
            </li>
            <li className="sidebar-buttons">
                <Heart  weight="thin" className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Notifications</p>
            </li>
            <li className="sidebar-buttons" onClick={action}>
                <Plus weight="thin" className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Create</p>
            </li>
           <li className="sidebar-buttons" onClick={handleNavigateToProfile}>
                {/* <Link href={{pathname: `user/${session?.user.username}`, query: { uid: session?.user.uid }  }}> */}
                    {session?.user.image ? <img src={session?.user.image!} alt="User profile image" className="h-6 rounded-full" /> :  <User weight="thin" size={25} className="border rounded-full" /> }
                    <p className="sm:hidden md:inline lg:inline">Profile</p>
                {/* </Link> */}
            </li>
        </ul>
    )
}