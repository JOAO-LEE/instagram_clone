'use client'

import Image from "next/image"
import SignUpForm from "./SignUpForm"
import Link from "next/link"

export default function SignUp() {
    return (
        <>
            <section className="flex flex-col justify-center items-center gap-2 max-w-fit">
                <div className="border border-gray-300 flex flex-col items-center p-14 gap-1 min-h-80 self-stretch max-w-[450px]">
                    <Image 
                    width={175}
                    height={51} 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" 
                    alt="Instagram Logo" 
                    className="object-contain"
                    />
                    <SignUpForm />
                </div>
                    <div className="border border-gray-300 p-5 text-center text-sm self-stretch">
                        <p>Already have an account? <Link href='/sign-in' className="font-bold text-blue-400 cursor-pointer">Sign In</Link></p>
                    </div>
                    <p className="text-sm">Get the app.</p>
                    <div className="flex gap-1">
                        <img src="https://static.cdninstagram.com/rsrc.php/v3/yt/r/Yfc020c87j0.png" alt="" className="object-contain h-10"/>
                        <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="" className="object-contain h-10"/>
                    </div>
            </section>
        </>
    )
}

{/* <p className="text-xs text-center">This app was created for learning purposes.</p>  */}
