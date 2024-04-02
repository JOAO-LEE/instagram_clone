'use client'
import MiniProfile from "./MiniProfile/MiniProfile";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";
import Suggestions from "./Suggestions/Suggestions";
import UploadModal from "../Modals/UploadModal/UploadModal";
import { useModalState } from "../../../store/modalState";
import { useSession } from "next-auth/react";

export default function Feed() {
    const { isOpen } = useModalState();
    const {data: session} = useSession();
    
    return (
        <main className="flex max-w-full sm:max-w-[58rem] sm:mx-auto gap-4 p-2">
            <section className="max-w-full sm:max-w-[35rem] mx-auto md:max-w-[38rem]">
                <Stories />
                <Posts />
                {isOpen ? <UploadModal/> : <></>}
            </section>
            <aside className="hidden lg:inline-block w-fit min-w-max">
                <MiniProfile  />
                <Suggestions />
            </aside> 
        </main>
    )
}