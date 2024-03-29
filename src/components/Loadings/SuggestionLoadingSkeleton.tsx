export default function SuggestionLoadingSkeleton() {
    const suggestionsSkeleton = Array.from({ length: 5 }, (_, index) => index)
    return (
        <section className="w-[272px] mt-4 p-1">
            <div className="flex justify-between mb-5">
                <div className="bg-gray-300 animate-pulse w-1/3 h-3"></div>
                <div className="bg-gray-400 animate-pulse w-10 h-3"></div>
            </div>
            <>
                {  
                    suggestionsSkeleton.map((_, index) => 
                    (
                        <div className="flex items-center justify-between mt-3" key={index}>
                            <div  className="h-10 w-10 rounded-full bg-gray-300 animate-pulse p-[2px]"></div>
                            <div className="flex-1 ml-3 flex flex-col gap-2">
                                <div className="bg-gray-300 w-12 h-2 animate-pulse"></div>
                                <div className="bg-gray-300 w-24 h-2 animate-pulse"></div>
                            </div>
                            <div className="w-10 h-2 animate-pulse bg-gray-300"></div>
                        </div>
                    ))
                }
            </>
        </section>
    )
}