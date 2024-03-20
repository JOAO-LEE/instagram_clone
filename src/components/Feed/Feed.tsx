'use client'
import MiniProfile from "./MiniProfile/MiniProfile";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";
import Suggestions from "./Suggestions/Suggestions";
import UploadModal from "../Modals/UploadModal/UploadModal";
import { useModalState } from "../../../store/modalState";

export default function Feed() {
    const { isOpen } = useModalState();

    return (
        <main className="flex max-w-full sm:max-w-[58rem] sm:mx-auto gap-4 p-2">
            <section className="max-w-full sm:max-w-[35rem] sm:mx-auto md:max-w-[38rem]">
                <Stories />
                <Posts />
                {isOpen ? <UploadModal/> : <></>}
            </section>
                <aside className="hidden lg:inline-block w-fit">
                    <MiniProfile  />
                    <Suggestions />
                </aside> 
                {/* <aside className="hidden mt-14 lg:flex flex-col items-end max-w-[50%] p-4 h-fit text-xs">
                    <p className="text-gray-400">Already have an account?</p>
                    <Link className="text-blue-400 text-xs font-semibold" href={'/sign-in'}>Sign In</Link>
                </aside> */}
        </main>
    )
}