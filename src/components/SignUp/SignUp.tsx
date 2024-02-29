'use client'

import Image from "next/image"

export function SignUp() {
    return (
       <section className="p-5 w-full">
            <div className="flex justify-center items-center">
                <div className="hidden lg:inline-block">
                    <Image src={"https://echoinnovateit.com/wp-content/uploads/2023/07/instagram-like-app-development.png"} width={500} height={500} alt="Instagram demonstration"/>
                </div>
                <form action="" className="border rounded border-gray-300 p-10 flex flex-col items-center">
                    <Image 
                    width={150}
                    height={150} 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" 
                    alt="Instagram Logo" 
                    className="object-contain"/>
                    <div className="flex flex-col space-y-3 text-xs p-5">
                        <div className="bg-slate-200 flex flex-col border rounded border-gray-300 p-1">
                            <label htmlFor="">Phone number, username, or email</label>
                            <input type="text" className="border-none  bg-slate-200 focus:ring-0"/>
                        </div>
                        <div className="bg-slate-200 flex flex-col border rounded border-gray-300 p-1">
                            <label htmlFor="">Password</label>
                            <input type="password" className="border-none  bg-slate-200 focus:ring-0" />
                        </div>
                        <button 
                        className="bg-blue-400 text-white rounded-md min-h-6 p-2 hover:bg-blue-600 font-bold">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
            <div className="border rounded border-gray-300 p-8 text-center text-sm">
                <p>Don't have an account? <span className="font-bold text-blue-400 cursor-pointer">Sign up</span></p>
            </div>
            <p className="text-xs text-center">This app was created for learning purposes.</p>
       </section>
    )
}