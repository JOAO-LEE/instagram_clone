import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories";

export default function Feed() {
    return (
        <section className="">
            <Stories />
            <Posts />
        </section>
    )
}