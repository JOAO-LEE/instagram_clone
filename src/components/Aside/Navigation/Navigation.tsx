'use-client'

import { Compass, FilmSlate, Heart, House, InstagramLogo, MagnifyingGlass, MessengerLogo, Plus } from "@phosphor-icons/react";

export default function Navigation() {
    return (
        <nav>
            <ul className="flex flex-col gap-7 p-1.5">
                <li>
                    <div className="flex gap-2 items-center">
                        <House size={30} />
                        <p className="sm:hidden md:inline lg:inline">Home</p>
                    </div>
                </li>
                <li>
                    <div className="flex gap-2 items-center">
                        <MagnifyingGlass size={30} />
                        <p className="sm:hidden md:inline lg:inline">Search</p>
                    </div>
                </li>
                <li>
                    <div className="flex gap-2 items-center">
                        <Compass size={30} />
                        <p className="sm:hidden md:inline lg:inline">Explore</p>
                    </div>
                </li>
                <li>
                    <div className="flex gap-2 items-center">
                        <FilmSlate size={30} />
                        <p className="sm:hidden md:inline lg:inline">Reels</p>
                    </div>
                </li>
                <li>
                    <div className="flex gap-2 items-center">
                        <MessengerLogo size={30} />
                        <p className="sm:hidden md:inline lg:inline">Messages</p>
                    </div>
                </li>
                <li>
                    <div className="flex gap-2 items-center">
                        <Heart size={30} />
                        <p className="sm:hidden md:inline lg:inline">Notifications</p>
                    </div>
                </li>
                <li>
                    <div className="flex gap-2 items-center">
                        <Plus size={30} />
                        <p className="sm:hidden md:inline lg:inline">Create</p>
                    </div>
                </li>
            </ul>
        </nav>
    )
}