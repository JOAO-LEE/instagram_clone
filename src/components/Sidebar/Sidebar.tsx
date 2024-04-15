import { InstagramLogo, List } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Navigation from "./Navigation/Navigation";
import ThreadsIcon from "@/assets/icons/ThreadsIcon";
import Link from "next/link";

export default function Sidebar() {
    return ( 
        <nav className="hidden sm:inline-block sticky top-0 max-h-dvh border border-b-0 border-l-0 box-border">
            <div className="flex flex-col p-4 h-screen box-border">
                    <div className="cursor-pointer h-24 w-[103px] relative hidden md:inline-grid lg:inline-grid p-1">
                    <Link href="/">
                        <Image 
                        width={100}
                        height={100} 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" 
                        alt="Instagram Logo" 
                        className="object-contain"/>
                    </Link>
                    </div>
                    <div className="flex flex-col items-center lg:hidden md:hidden mt-4 mb-10">
                        <Link href="/">
                            <InstagramLogo className="text-2xl" />
                        </Link>
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
                        <List className="text-2xl" weight="thin" />
                        <p className="sm:hidden md:inline lg:inline">More</p>
                    </li>
                </ul>
            </div> 
        </nav>
    )
}