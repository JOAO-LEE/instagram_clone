export default function MiniProfileLoadingSkeleton() {
    return (
        <div className="flex flex-wrap mt-14 justify-between p-1 items-center">
            <div className="flex items-center gap-2">
                <div className="h-12 w-12 rounded-full bg-gray-300 animate-pulse"></div>    
                <div className="max-w-fit flex flex-col gap-1">
                    <div className="w-14 h-2 bg-gray-300 animate-pulse"></div>
                    <div className="w-14 h-2 bg-gray-100 animate-pulse"></div>
                </div>
            </div> 
            <div className="w-14 h-2 bg-gray-300 animate-pulse"></div>
        </div> 
    )
}