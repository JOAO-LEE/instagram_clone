import MiniProfile from "./MiniProfile/MiniProfile";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";
import Suggestions from "./Suggestions/Suggestions";

export default function Feed() {
    return (
        <main className="flex w-full sm:max-w-[58rem] sm:mx-auto gap-3">
            <section className="w-full sm:max-w-[35rem] md:max-w-[38rem]">
                <Stories />
                <Posts />
            </section>
            <aside className="hidden lg:inline-block">
                <MiniProfile />
                <Suggestions />
            </aside>
        </main>
    )
}