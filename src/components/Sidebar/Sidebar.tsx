import { InstagramLogo, List } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Navigation from "./Navigation/Navigation";
import ThreadsIcon from "@/assets/icons/ThreadsIcon";
import Link from "next/link";
import NavigationMore from "./NavigationMore/NavigationsMore";

export default function Sidebar() {
    return ( 
        <>
            <nav className="w-full fixed bottom-0 bg-white border-2 border-r-0 sm:border-r sm:border border-b-0 border-l-0 box-border sm:inline-block md:bg-transparent sm:sticky sm:top-0 sm:max-h-dvh ">
                <div className="flex p-2 sm:flex-col sm:h-dvh box-border">
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
                    <div className="hidden sm:sidebar-buttons sm:flex lg:hidden md:hidden sm:mt-4 sm:mb-10">
                        <Link href="/">
                            <InstagramLogo className="text-2xl" weight="thin" />
                        </Link>
                    </div>
                    <div className="w-full sm:grow">
                        <Navigation />
                    </div>
                    <div>
                        <NavigationMore />
                    </div>
                </div> 
            </nav>
        </>
    )
}