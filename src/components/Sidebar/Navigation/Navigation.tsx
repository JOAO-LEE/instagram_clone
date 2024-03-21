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
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300 sm:text-sm p-1 md:gap-4">
                <House className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Home</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300 sm:text-sm p-1 md:gap-4">
                <MagnifyingGlass className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Search</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300 sm:text-sm p-1 md:gap-4">
                <Compass className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Explore</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300 sm:text-sm p-1 md:gap-4">
                <FilmSlate className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Reels</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300 sm:text-sm p-1 md:gap-4">
                <MessengerLogo className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Messages</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300 sm:text-sm p-1 md:gap-4">
                <Heart className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Notifications</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300 sm:text-sm p-1 md:gap-4" onClick={action}>
                <Plus className="text-2xl" />
                <p className="sm:hidden md:inline lg:inline">Create</p>
            </li>
           <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300 sm:text-sm p-1 md:gap-4">
                {session?.user.image ? <img src={session?.user.image!} alt="User profile image" className="h-6 rounded-full" /> :  <UserCircle size={25} /> }
                <p className="sm:hidden md:inline lg:inline">Profile</p>
            </li>
        </ul>
    )
}