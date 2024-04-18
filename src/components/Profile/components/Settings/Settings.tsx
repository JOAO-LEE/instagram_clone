"use client"

import { User } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";

export default function Settings() {
    const { data: session } = useSession();

    return (
        <main className="flex justify-center bg-blue-300 w-full p-4">
            <section className="bg-red-400 w-2/3 p-2">
                <h1 className="text-lg font-semibold pb-4">Edit Profile</h1> 
                <form action="" className="flex flex-col gap-8">
                    <div className="flex justify-between items-center font-bold text-sm bg-gray-200 rounded-xl p-4">
                        <div className="w-full items-center flex gap-2">
                            {
                                session?.user.image 
                                ?
                                <img src={session.user.image!} alt="User image" />
                                :
                                <User size={"50.172px"} weight="thin" className="border border-gray-400 rounded-full bg-zinc-100 " />
                            }
                                <div>
                                    <p>{session?.user.username}</p>
                                    <p className="text-gray-400 font-normal">Amalia Jones</p>
                                </div>
                        </div>

                      

                        <div>
                            <button className="bg-sky-500 hover:bg-blue-500 rounded w-32 py-2 px-1 text-white text-xs">Change photo</button>
                        </div>
                    </div>

                    <div className="flex flex-col w-3/5">
                        <label htmlFor="">Username</label>
                        <input type="text"value={session?.user.username} className="rounded border-gray-200 focus:ring-0" />
                    </div>
                    <div className="flex flex-col w-3/5">
                        <label htmlFor="">Name</label>
                        <input type="text"value={session?.user.username} className="rounded border-gray-200 focus:ring-0" />
                    </div>
                    <div className="flex flex-col w-3/5">
                        <label htmlFor="">Website</label>
                        <input type="text"value={session?.user.username} className="rounded border-gray-200 focus:ring-0" />
                    </div>
                    <div className="flex flex-col w-3/5">
                        <label htmlFor="">Bio</label>
                        <input type="text"value={session?.user.username} className="rounded border-gray-200 focus:ring-0" />
                    </div>
                </form>
            </section>
        </main>
    )
}

{/* //                  
//                     <div>
//                         <label htmlFor="">name</label>
//                         <input type="text"  />
//                     </div>
//                 </form> */}