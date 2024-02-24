import MiniProfile from "./MiniProfile/MiniProfile";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";

export default function Feed() {
    return (
        <main className="flex max-w-xl mx-auto">
            <section className="">
                <Stories />
                <Posts />
            </section>
            <aside className="hidden lg:inline-block">
                <MiniProfile />
            </aside>
        </main>
    )
}