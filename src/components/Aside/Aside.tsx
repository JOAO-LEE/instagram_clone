'use client'
import { InstagramLogo, List } from "@phosphor-icons/react";
import Image from "next/image";
import Navigation from "./Navigation/Navigation";

export default function Aside() {
    return (
        <aside className="h-lvh border border-b-0 border-l-0 box-border md:w-[244px] lg:w-[335px] sm:w-[4.5em]">
            <div className="flex flex-col p-4 h-lvh box-border">
                <div className="cursor-pointer h-24 w-[103px] relative hidden md:inline-grid lg:inline-grid">
                    <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt="Instagram Logo" 
                    layout="fill" 
                    className="object-contain"/>
                </div>
                <div className="flex flex-col items-center lg:hidden md:hidden mt-4 mb-10">
                    <InstagramLogo size={30} />
                </div>
                <div className="grow">
                    <Navigation />
                </div>
                <div className="flex gap-2 items-center">
                    <List size={30} />
                    <p className="sm:hidden md:inline lg:inline">More</p>
                </div>
            </div>
        </aside>
    )
}