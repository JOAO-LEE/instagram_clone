"use client"

import { useUploadModalState } from "../../../../store/modalState";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Compass, FilmSlate, Heart, House, MagnifyingGlass, MessengerLogo, Plus, User } from "@phosphor-icons/react";
import UploadModal from "@/components/Modals/UploadModal/UploadModal";
import { LogoutModal } from "@/components/Modals/LogoutModal/LogoutModal";

export default function Navigation() {
    const { action, isUploadModalOpen } = useUploadModalState();
    const { data: session } = useSession();
    const router = useRouter();
    const pathName = usePathname();
 
    const handleNavigateToProfile = () => {

        const userInfo = `${session?.user?.username}?uid=${session?.user?.uid}`;
        const isProfilePage = pathName.includes(`/user/${userInfo}`);
        
        if (isProfilePage) {
            router.refresh();
            return;
        }
        router.push(`/user/${userInfo}`);
    };
    
    return (
        <>
            <ul className="flex justify-evenly items-center gap-1 w-full sm:gap-[0.875rem] sm:justify-normal sm:items-start sm:flex-col md:gap-7">
                <li className="group sidebar-buttons" onClick={() => router.push("/")}>
                    <House weight="thin" className="text-2xl transition-transform duration-500 group-hover:scale-125" />
                    <p className="hidden sm:hidden md:inline lg:inline">Home</p>
                </li>
                <li className="hidden group sm:sidebar-buttons">
                    <MagnifyingGlass weight="thin" className="text-2xl transition-transform duration-500 group-hover:scale-125" />
                    <p className="hidden sm:hidden md:inline lg:inline">Search</p>
                </li>
                <li className="group sidebar-buttons">
                    <Compass weight="thin" className="text-2xl transition-transform duration-500 group-hover:scale-125" />
                    <p className="hidden sm:hidden md:inline lg:inline">Explore</p>
                </li>
                <li className="group sidebar-buttons">
                    <FilmSlate weight="thin" className="text-2xl transition-transform duration-500 group-hover:scale-125" />
                    <p className="hidden sm:hidden md:inline lg:inline">Reels</p>
                </li>
                <li className="group sidebar-buttons">
                    <MessengerLogo weight="thin" className="text-2xl transition-transform duration-500 group-hover:scale-125" />
                    <p className="hidden sm:hidden md:inline lg:inline">Messages</p>
                </li>
                <li className="group hidden sm:sidebar-buttons">
                    <Heart weight="thin" className="text-2xl transition-transform duration-500 group-hover:scale-125" />
                    <p className="sm:hidden md:inline lg:inline">Notifications</p>
                </li>
                <li className="group sidebar-buttons" onClick={() => action("upload")}>
                    <Plus weight="thin" className="text-2xl transition-transform duration-500 group-hover:scale-125" />
                    <p className="hidden sm:hidden md:inline lg:inline">Create</p>
                </li>
            <li className="group sidebar-buttons" onClick={handleNavigateToProfile}>
                    {
                        session?.user.image 
                        ?
                            (
                                <img src={session?.user.image!} alt="User profile image" className="h-6 rounded-full transition-transform duration-500 group-hover:scale-125" /> 
                            )
                        :  
                            ( 
                                <User weight="thin" size={25} className="border rounded-full transition-transform duration-500 group-hover:scale-125" /> 
                            )
                    }
                    <p className="hidden sm:hidden md:inline lg:inline">Profile</p>
                </li>
            </ul>
            {isUploadModalOpen.find(modal => (modal.isOpen === true) && modal.modalType === "upload")?.isOpen && <UploadModal />}
        </>
    )
}