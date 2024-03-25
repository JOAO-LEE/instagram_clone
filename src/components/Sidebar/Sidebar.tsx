import { InstagramLogo, List } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Navigation from "./Navigation/Navigation";
import ThreadsIcon from "@/assets/icons/ThreadsIcon";

export default function Sidebar() {
    return ( 
        <nav className="hidden sm:inline-block sticky top-0 max-h-svh border border-b-0 border-l-0 box-border">
            <div className="flex flex-col p-4 h-lvh box-border">
                <div className="cursor-pointer h-24 w-[103px] relative hidden md:inline-grid lg:inline-grid p-1">
                    <Image 
                    width={100}
                    height={100} 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" 
                    alt="Instagram Logo" 
                    className="object-contain"/>
                </div>
                <div className="flex flex-col items-center lg:hidden md:hidden mt-4 mb-10">
                    <InstagramLogo className="text-2xl" />
                </div>
                <div className="grow">
                    <Navigation />
                </div>
                <ul className="flex flex-col gap-3.5">
                    <li className="hidden 2xl:flex sidebar-buttons">
                        <ThreadsIcon  width={25}/>
                        <p className="sm:hidden md:inline lg:inline">Threads</p>
                    </li>
                    <li className="sidebar-buttons">
                        <List className="text-2xl" />
                        <p className="sm:hidden md:inline lg:inline">More</p>
                    </li>
                </ul>
            </div> 
        </nav>
    )
}

// flex items-center rounded-sm hover:bg-gray-100 transition-colors duration-300 sm:text-sm p-1 md:gap-4

// nav responsivity (see it later)
// h-screen md:w-[244px] lg:w-[335px] sm:w-[4.5em] m-0
{/*
<div className="flex rounded-sm hover:bg-gray-100 transition-colors duration-300">

</div> */}