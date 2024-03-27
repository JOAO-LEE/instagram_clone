import { BookmarkSimple, ChatCircle, DotsThree, Heart, PaperPlaneTilt, Smiley } from "@phosphor-icons/react";
export default function PostLoadingSkelenton () {
    return (
    <section className="border-b w-full mx-auto p-1">
        <header className="flex items-center p-1">
            <div className="h-12 w-12 rounded-full mr-3 p-1 animate-pulse bg-gray-200"></div>
            <div className="flex-1">
                <div className="animate-pulse w-16 bg-gray-200 h-3"></div>
            </div>
            <DotsThree className="animate-pulse text-gray-300 cursor-pointer" />
        </header>
        <div className="animate-pulse bg-gray-200 w-full h-[640px]"></div>
        {/* <img src={image} alt={`${username} post`} className="object-cover mx-auto border-2 border-gray-50  rounded-sm shadow-sm" /> */}
        <div className="flex justify-between mt-3">
            <div className="flex gap-2">
                <Heart className="animate-pulse text-gray-200"/>
                <ChatCircle className="animate-pulse text-gray-200"/>
                <PaperPlaneTilt className="animate-pulse text-gray-200"/>
            </div>
        <BookmarkSimple className="animate-pulse text-gray-200"/>
        </div>
        <div className="flex gap-2">

            <div className="animate-pulse w-16 bg-gray-200 h-3 mt-3"></div>
            <div className="animate-pulse w-16 bg-gray-100 h-3 mt-3"></div>

        </div>

        <div className="flex items-center justify-between m-0">
            <div className="text-sm animate-pulse w-16 bg-gray-200 h-3"></div>
            <Smiley className="animate-pulse text-gray-200"/> 
        </div>
    </section>
    )
}