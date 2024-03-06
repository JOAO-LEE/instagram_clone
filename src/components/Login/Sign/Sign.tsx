import Image from "next/image"
import SignForm from "./SignForm"
import Link from "next/link"
import Downloads from "../Downloads/Downloads"
import { SignEnum } from "@/enum/SignEnum"
import SignGoogle from "../SignGoogle/SignGoogle"


export default function SignUp({ pageType }: { pageType: number }) {
    return (
        <section className="flex flex-col justify-center items-center gap-2 max-w-fit">
            <div className="border border-gray-300 flex flex-col items-center p-10 gap-5 min-h-80 self-stretch max-w-[450px]">
                <Image 
                width={175}
                height={51} 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" 
                alt="Instagram Logo" 
                className="object-contain"
                />
                <SignForm pageType={pageType} />
                <span className="text-xs text-center inline-block text-gray-500 min-w-60">OR</span>
                <SignGoogle/>
            </div>
            <div className="border border-gray-300 p-5 text-center text-sm self-stretch">
                <p>{pageType === SignEnum.SignUp ? 'Already have an account?' : 'Don\'t have an account?'}<Link href={pageType === SignEnum.SignUp ? '/sign-in' : '/sign-up'} className="font-bold text-blue-400 cursor-pointer"> {pageType === SignEnum.SignUp ? 'Sign In' : 'Sign up'}</Link></p>
            </div>
            <p className="text-sm">Get the app.</p>
            <Downloads />
        </section>
    )
}


