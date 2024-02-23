import MiniProfile from "./MiniProfile/MiniProfile";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";

export default function Feed() {
    return (
        <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-4xl mx-auto gap-2">
            <section className="md:col-span-2 bg-zinc-200">
                <Stories />
                <Posts />
            </section>
            <aside className="hidden md:inline-grid md:col-span-1">
                <div className="">
                    <MiniProfile />
                </div>
            </aside>
        </main>
    )
}