'use client'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../../../firebase";
import { useRouter } from "next/navigation";
import { SignEnum } from "@/enum/SignEnum";

export default function SignGoogle() {
    const router = useRouter();

    const handleGoogleSignIn = async (): Promise<void> => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider()
        try {
            await signInWithPopup(auth, provider);
            router.push('/')
        } catch (error) {
            console.error(error)
        }
    };
    return (
        <div className="self-stretch flex justify-center items-center gap-3 cursor-pointer p-2 group" onClick={() => handleGoogleSignIn()}>
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png" alt="Google icon" className="max-w-6" />
            <p className="text-sky-500 font-semibold group-hover:text-opacity-85 group-hover:text-blue-600">Sign in with Google</p>
        </div>
    )

}