import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";

export default function Feed() {
    return (
        <main className="grid grid-cols-1">
            <section className="md:col-span-2 md:max-w-6xl">

                <Stories />
                <Posts />
            </section>
            <section className="hidden md:inline-grid md:col-span-1">
                <aside>

                </aside>
            </section>
        </main>
        // </section>
    )
}