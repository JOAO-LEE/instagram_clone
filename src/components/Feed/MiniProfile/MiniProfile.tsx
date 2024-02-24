export default function MiniProfile() {
    return (
        <div className="flex mt-14 w-80 justify-between p-1">
            <div className="flex">
            <img src="https://pbs.twimg.com/profile_images/1745817608992047104/maCsEohv_400x400.jpg" className="h-12 rounded-full object-cover border p-[2px]" />
                <div className="ml-4">
                    <h2 className="font-bold text-sm">joaumlee</h2>
                    <h3 className="text-xs text-gray-400">Nome</h3>
                </div>
            </div> 
            <button className="text-blue-400 text-xs font-semibold">Switch</button>
     </div> 
    )
}

