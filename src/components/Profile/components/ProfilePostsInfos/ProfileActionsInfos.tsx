import { GridNine, IdentificationBadge, BookmarkSimple } from "@phosphor-icons/react";

export default function ProfileActions() {
    return (
        <section className="flex gap-8 justify-center p-2 text-gray-300 text-xs border-t border-gray-200 w-1/2 cursor-not-allowed hover:blur-sm" title="Feature not implemented yet!">
            <div className="flex items-center gap-2 p-1">
                <GridNine weight="light" className="text-xl"  />
                <p className="uppercase font-semibold">posts</p>
            </div>
            <div className="flex  items-center gap-2 p-1">
                <IdentificationBadge weight="light" className="text-xl" />
                <p className="uppercase font-semibold">tagged</p>
            </div>
            <div className="flex  items-center gap-2 p-1">
                <BookmarkSimple weight="light"  className="text-xl"/>
                <p className="uppercase font-semibold">saved</p>
            </div>
        </section>
    )
}