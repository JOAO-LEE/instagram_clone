import Image from "next/image";
import SignForm from "./SignForm";
import Link from "next/link";
import Downloads from "../Downloads/Downloads";
import { SignEnum } from "@/enum/SignEnum.enum";
import SignGoogle from "../SignGoogle/SignGoogle";


export default function Sign({ pageType }: { pageType: number }) {
    const isSignUp = pageType === SignEnum.SignUp; 

    return (
        <section className="flex flex-col justify-center items-center gap-2 max-w-fit">
            <div className="border border-gray-300 flex flex-col items-center p-10 gap-3 min-h-80 self-stretch max-w-[450px]">
                <Image 
                width={175}
                height={51} 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" 
                alt="Instagram Logo" 
                className="object-contain"
                />
                <SignForm pageType={pageType} />
                {!isSignUp && (
                    <>
                        <span className="text-xs text-center inline-block text-gray-500 min-w-60 mt-3">OR</span>
                        <SignGoogle />
                    </>
                    )
                }
            </div>
            <div className="border border-gray-300 p-5 text-center text-sm self-stretch">
                <p>{isSignUp ? "Already have an account?" : "Don\"t have an account?"}<Link href={isSignUp ? "/sign-in" : "/sign-up"} className="font-bold text-sky-500 cursor-pointer"> {isSignUp ? "Sign In" : "Sign up"}</Link></p>
            </div>
            <p className="text-sm">Get the app.</p>
            <Downloads />
        </section>
    )
}

 
