export default function MiniProfile() {
    return (
        <div className="flex justify-between items-center mt-14 ml-10">
                 <img src="https://pbs.twimg.com/profile_images/1745817608992047104/maCsEohv_400x400.jpg" className="h-16 rounded-full object-cover border p-[2px]" />
             <div className="flex flex-1">
                <div className="ml-4">
                    <h2 className="font-bold text-sm">joaumlee</h2>
                    <h3 className="text-xs text-gray-400">Nome</h3>
                </div>
            </div>
            <button className="text-blue-400 text-sm font-semibold">Switch</button>
     </div> 
    )
}

