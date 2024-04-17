"use client"

import ThreadsIcon from "@/assets/icons/ThreadsIcon";
import { Gear, List, SignOut, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useUploadModalState } from "../../../../store/modalState";
import { LogoutModal } from "@/components/Modals/LogoutModal/LogoutModal";
import UploadModal from "@/components/Modals/UploadModal/UploadModal";

export default function NavigationMore() {
    const [opened, setOpened] = useState<boolean>(false);
    const { isUploadModalOpen, action } = useUploadModalState()

    const handleModal = () => {
        if (opened) {
            setOpened(false);
            action("logout");
        }
    }

    const logoutModalOpen = isUploadModalOpen.find(modal => modal.isOpen && modal.modalType === "logout");

    return (
        <ul className="hidden sm:flex flex-col gap-3.5 relative">
            <li className="group hidden 2xl:flex sidebar-buttons">
                <ThreadsIcon  width={25} className="transition-transform duration-500 group-hover:scale-110"/>
                <p className="sm:hidden md:inline lg:inline">Threads</p>
            </li>
            <li className="group sidebar-buttons" onClick={() => setOpened(!opened)}>
                {
                    opened 
                    ?
                    <X className={`text-2xl ${opened && "animate-spin-once"}`} />
                    :
                    <List className="text-2xl transition-all duration-500 group-hover:scale-125" weight="thin" />
                }
                <p className="sm:hidden md:inline lg:inline">{!opened ? "More" : "Close"}</p>
            </li>
            { 
                opened 
                &&
                    (

                        <ul className="absolute bg-white shadow-xl rounded-md left-0 bottom-10 p-4 divide-y divide-gray-300 z-50">
                            <li className="group flex gap-2 p-4 cursor-pointer items-center hover:bg-neutral-100 transition-colors duration-300">
                                <Gear weight="thin" className="text-xl transition-transform duration-500 group-hover:scale-110"/>
                                <p className="text-xs ">Settings</p>
                            </li>
                            <li className="group flex gap-2 p-4 cursor-pointer items-center hover:bg-neutral-100 transition-colors duration-300" onClick={() => handleModal()}>
                                <SignOut weight="thin" className="text-xl transition-transform duration-500 group-hover:scale-110" />
                                <p className="text-xs ">Logout</p>
                            </li>
                        </ul>
                    )
                 
            }
            { logoutModalOpen && <LogoutModal/>}
        </ul>
    )
}