"use client";

import MiniProfile from "./MiniProfile/MiniProfile";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";
import Suggestions from "./Suggestions/Suggestions";

export default function Feed() {

    return (
        <main className="flex max-w-full sm:max-w-[58rem] sm:mx-auto gap-4 p-2">
            <section className="max-w-full sm:max-w-[35rem] mx-auto md:max-w-[38rem]">
                <Stories />
                <Posts />
            </section>
            <aside className="hidden xl:inline-block w-fit min-w-max">
                <MiniProfile  />
                <Suggestions />
            </aside> 
        </main>
    )
}