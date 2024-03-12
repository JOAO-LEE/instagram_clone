import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import MiniProfile from "./MiniProfile/MiniProfile";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";
import Suggestions from "./Suggestions/Suggestions";
import Link from "next/link";

export default async function Feed() {
    const session: Session | null = await getServerSession(authOptions);

    return (
        <main className="flex max-w-full sm:max-w-[58rem] sm:mx-auto">
            <section className="max-w-full sm:max-w-[35rem] sm:mx-auto md:max-w-[38rem]">
                <Stories />
                <Posts />
            </section>
            {session ? 
            <aside className="hidden lg:inline-block w-fit">
                <MiniProfile  />
                <Suggestions />
            </aside> :  <aside className="hidden mt-14 lg:flex flex-col items-end max-w-[50%] p-4 h-fit gap-x-11">
            <p className="text-sm">Already have an account?</p>
            <Link className="text-blue-400 text-xs font-semibold" href={'/sign-in'}>Sign In</Link>
            </aside> }
        </main>
    )
}