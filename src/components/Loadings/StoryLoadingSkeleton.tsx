export default function StoryLoadingSkeleton() {
    const storySkeletons = Array.from({ length: 10 }, (_, index) => index)
    
    return (
        <>
            {storySkeletons.map((_, index) => (
                <div key={index} className="max-w-fit flex flex-col gap-1 text-center">
                    <div className="min-w-14 min-h-14 rounded-full p-[2px] text-center bg-gray-300 animate-pulse"></div>
                    <div className="w-14 h-2 bg-gray-300 animate-pulse"></div>
                </div>
            ))}
        </>
    )
}