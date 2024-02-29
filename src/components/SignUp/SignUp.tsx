'use client'

import Image from "next/image"

export function SignUp() {
    return (
       <section className="bg-white p-5 ">
            <div className="flex justify-center items-center space-x-10">
                <div>
                    <Image src={"https://echoinnovateit.com/wp-content/uploads/2023/07/instagram-like-app-development.png"} width={400} height={400} alt="Instagram demonstration"/>
                </div>
                <form action="" className="border rounded border-gray-300 p-5 flex flex-col items-center">
                    <Image 
                    width={150}
                    height={150} 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" 
                    alt="Instagram Logo" 
                    className="object-contain"/>
                    <div className="flex flex-col space-y-3">
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder="" />
                        <label htmlFor="">Password</label>
                        <input type="password" />
                        <button>Sign up</button>
                    </div>
                    <p>This app was created for learning purposes.</p>
                </form>
            </div>
       </section>
    )
}