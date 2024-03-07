'use client'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";
import MiniProfile from "./MiniProfile/MiniProfile";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";
import Suggestions from "./Suggestions/Suggestions";
import { useRouter } from "next/navigation";


export default function Feed() {
    const [user] = useAuthState(auth);
    const router = useRouter();

    if (!user) {
        router.push('/sign-up')
    }

    return (
        <main className="flex w-full sm:max-w-[58rem] sm:mx-auto gap-3">
            <section className="w-full sm:max-w-[35rem] md:max-w-[38rem]">
                <Stories />
                <Posts />
            </section>
            <aside className="hidden lg:inline-block">
                <MiniProfile user={user!} />
                <Suggestions />
            </aside>
        </main>
    )
}