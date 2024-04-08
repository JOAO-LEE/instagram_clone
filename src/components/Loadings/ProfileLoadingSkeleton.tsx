export default function ProfileLoadingSkeleton() {
    return (
        <>
            <main className="flex gap-1 flex-col items-center">
               <header className="flex gap-4 p-4">
                   <section className="p-2">
                        <div className="rounded-full animate-pulse bg-gray-200 size-14"></div>
                   </section>
                   <section className="flex flex-col w-full p-2">
                       <section className="flex gap-2 items-center p-4 w-full">
                           <div className="grow">
                                <div className="animate-pulse h-5 w-32 bg-gray-200"></div>
                           </div>
                           <div>
                                <div className="animate-pulse h-5 w-16 rounded-md bg-gray-300 p-2"></div>
                           </div>
                           <div>
                                <div className="animate-pulse h-5 w-16 rounded-md bg-gray-300 p-2"></div>
                           </div>
                           <div className="">
                                <div className="rounded-full animate-pulse bg-gray-300 size-8"></div>
                           </div>
                       </section>
                       <section className="flex gap-8 p-2">
                            <span className="flex gap-2"><div className="size-5 animate-pulse bg-gray-300"></div><div className="h-5 w-16 bg-gray-200 animate-pulse"></div></span>
                            <span className="flex gap-2"><div className="size-5 animate-pulse bg-gray-300"></div><div className="h-5 w-16 bg-gray-200 animate-pulse"></div></span>  
                            <span className="flex gap-2"><div className="size-5 animate-pulse bg-gray-300"></div><div className="h-5 w-16 bg-gray-200 animate-pulse"></div></span>  
                       </section>
                   </section>
               </header>
               <div className="flex gap-8 justify-center p-2 text-xs border-t border-gray-200 w-1/2">
                    <div className="flex items-center gap-2 p-1">
                        <div className="size-5 animate-pulse bg-gray-300"></div>
                        <div className="h-5 w-16 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="flex  items-center gap-2 p-1">
                        <div className="size-5 animate-pulse bg-gray-300"></div>
                        <div className="h-5 w-16 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="flex  items-center gap-2 p-1">
                        <div className="size-5 animate-pulse bg-gray-300"></div>
                        <div className="h-5 w-16 bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
                <section className="grid grid-cols-3 gap-2">
                    <div className="h-64 animate-pulse bg-gray-300 w-64 p-1"></div>
                    <div className="h-64 animate-pulse bg-gray-300 w-64 p-1"></div>
                    <div className="h-64 animate-pulse bg-gray-300 w-64 p-1"></div>
                </section>
           </main>
        </>
    )
}