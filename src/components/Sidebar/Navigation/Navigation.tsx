"use client"
import { Compass, FilmSlate, Heart, House, MagnifyingGlass, MessengerLogo, Plus } from "@phosphor-icons/react"
import { useModalState } from "../../../../store/modalState"


export default function Navigation() {
    const { action } = useModalState();
  
     const openModal = () => {
        action()
     }
    
    return (
        <ul className="flex flex-col gap-7 p-1.5 bg-blue-500">
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300">
                <House size={30} />
                <p className="pl-4 sm:hidden md:inline lg:inline">Home</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300">
                <MagnifyingGlass size={30} />
                <p className="pl-4 sm:hidden md:inline lg:inline">Search</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300">
                <Compass size={30} />
                <p className="pl-4 sm:hidden md:inline lg:inline">Explore</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300">
                <FilmSlate size={30} />
                <p className="pl-4 sm:hidden md:inline lg:inline">Reels</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300">
                <MessengerLogo size={30} />
                <p className="pl-4 sm:hidden md:inline lg:inline">Messages</p>
            </li>
            <li className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300">
                <Heart size={30} />
                <p className="pl-4 sm:hidden md:inline lg:inline">Notifications</p>
            </li>
            <li  className="flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300" onClick={openModal}>
                <Plus size={30} />
                <p className="pl-4 sm:hidden md:inline lg:inline">Create</p>
            </li>
        </ul>
    )
}