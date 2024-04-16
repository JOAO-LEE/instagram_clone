"use client"

import ThreadsIcon from "@/assets/icons/ThreadsIcon";
import { Gear, List, SignOut } from "@phosphor-icons/react";
import { useState } from "react";

export default function NavigationMore() {
    const [opened, setOpened] = useState<boolean>(false);
    return (
        <ul className="hidden sm:flex flex-col gap-3.5 relative">
            <li className="group hidden 2xl:flex sidebar-buttons">
                <ThreadsIcon  width={25} className="transition-transform duration-500 group-hover:scale-110"/>
                <p className="sm:hidden md:inline lg:inline">Threads</p>
            </li>
            <li className="group sidebar-buttons" onClick={() =>setOpened(!opened)}>
                <List className="text-2xl transition-transform duration-500 group-hover:scale-125" weight="thin" />
                <p className="sm:hidden md:inline lg:inline">More</p>
            </li>
            { 
                opened 
                &&
                    (

                        <ul className="absolute bg-white shadow-xl rounded-md left-0 bottom-10 p-4 divide-y divide-gray-300">
                            <li className="group flex gap-2 p-4 cursor-pointer items-center hover:bg-neutral-100 transition-colors duration-300">
                                <Gear weight="thin" className="text-xl transition-transform duration-500 group-hover:scale-110"/>
                                <p className="text-xs ">Settings</p>
                            </li>
                            <li className="group flex gap-2 p-4 cursor-pointer items-center hover:bg-neutral-100 transition-colors duration-300">
                                <SignOut weight="thin" className="text-xl transition-transform duration-500 group-hover:scale-110" />
                                <p className="text-xs ">Logout</p>
                            </li>
                        </ul>
                    ) 
            }
        </ul>
    )
}