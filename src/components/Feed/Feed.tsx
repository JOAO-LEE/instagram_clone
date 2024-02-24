import MiniProfile from "./MiniProfile/MiniProfile";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";
import Suggestions from "./Suggestions/Suggestions";

export default function Feed() {
    return (
        <main className="flex gap-4">
            <section className="flex-1 max-w-lg">
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