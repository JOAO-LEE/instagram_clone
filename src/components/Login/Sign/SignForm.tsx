"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircleNotch } from "@phosphor-icons/react";
import { SignEnum } from "@/enum/SignEnum";
import { signIn, useSession } from "next-auth/react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db, app } from "../../../../firebase";

const auth = getAuth(app);

export default function SignForm({ pageType }: { pageType: number }) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasFormError, setHasFormError] = useState<boolean>(false);
    const router = useRouter();

    const sign = async (): Promise<void> => {
        setIsLoading(true);
        try {
            if (pageType === SignEnum.SignUp) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (userCredential) {
                    await addDoc(collection(db, "users"), {
                        uid: userCredential.user.uid,
                        email: email,
                        profileImage: null
                    });
                    await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
                }
                return;
            } else {
                await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
            }
            router.push("/");
        } catch (error) {
            setHasFormError(true);
        }
    }

    const handleSign = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        sign();
    };

    return (
        <form onSubmit={(e) => handleSign(e)} className="mt-3">
            <div className="flex flex-col text-xs gap-2">
                <div className={`bg-slate-50 flex flex-col border rounded text-neutral-500 ${!hasFormError ? "border-gray-300" : "border-red-600"}`}>
                    <label htmlFor="" className="ml-2 text-[10px]">Email</label>
                    <input 
                    type="email"
                    value={email} 
                    className="border-none bg-slate-50 focus:ring-0 max-h-6"
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={`bg-slate-50 flex flex-col border rounded text-neutral-500 ${!hasFormError ? "border-gray-300" : "border-red-600"}`}>
                    <label htmlFor="" className="ml-2 text-[10px]">Password</label>
                    <input 
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-none bg-slate-50 focus:ring-0 max-h-6" />
                </div>
                <button
                disabled={isLoading || (email === ''  || password === '')}
                type="submit"
                className="bg-sky-500 bg-opacity-95 text-white rounded-md min-h-6 p-2 hover:bg-blue-600 hover:bg-opacity-85 font-bold text-sm disabled:bg-slate-200 text-center">
                    {isLoading ? <CircleNotch className="animate-spin text-sky-600 text-xl min-w-full" /> : pageType === SignEnum.SignUp ? "Sign up" : "Sign in"}
                </button>
            </div>
        </form>
    )
}