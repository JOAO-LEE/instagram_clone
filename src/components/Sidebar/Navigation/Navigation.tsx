"use client"
import { Compass, FilmSlate, Heart, House, MagnifyingGlass, MessengerLogo, Plus, UserCircle } from "@phosphor-icons/react"
import { useModalState } from "../../../../store/modalState"
import { ResolvingMetadata, Metadata } from "next"
import { Props } from "react-modal"
import { useSession } from "next-auth/react"
// import { use } from "react"

export default function Navigation() {
    const { action } = useModalState();
    const {data: session } = useSession();
    console.log(session)
    
    return (
        <ul className="flex flex-col gap-7">
            <li className="sidebar-buttons">
                <House className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Home</p>
            </li>
            <li className="sidebar-buttons">
                <MagnifyingGlass className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Search</p>
            </li>
            <li className="sidebar-buttons">
                <Compass className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Explore</p>
            </li>
            <li className="sidebar-buttons">
                <FilmSlate className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Reels</p>
            </li>
            <li className="sidebar-buttons">
                <MessengerLogo className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Messages</p>
            </li>
            <li className="sidebar-buttons">
                <Heart className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Notifications</p>
            </li>
            <li className="sidebar-buttons" onClick={action}>
                <Plus className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Create</p>
            </li>
           <li className="sidebar-buttons">
                {session?.user.image ? <img src={session?.user.image!} alt="User profile image" className="h-6 rounded-full" /> :  <UserCircle size={25} /> }
                <p className="sm:hidden md:inline lg:inline">Profile</p>
            </li>
        </ul>
    )
}