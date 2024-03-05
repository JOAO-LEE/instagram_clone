'use client'

import { FormEvent, useState } from "react";
import { useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '@/../../firebase'
import { useRouter } from "next/navigation";
import { CircleNotch } from "@phosphor-icons/react";

export default function SignUpForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasFormError, setHasFormError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>(''); 
    const router = useRouter();

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const errorsLayout = (): string | void => {
        if (email === "") {
            setHasFormError(true);
            return "Email field is required.";
        }

        if (password === "") {
            setHasFormError(true);
            return "Password field is required.";
        }
    };

    const handleSignUp = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const errorMessage = errorsLayout();
            if (errorMessage) {
                throw new Error(errorMessage)
            }

            const response = await createUserWithEmailAndPassword(email, password)

            if (!response) {
                setHasFormError(true);
                throw new Error('This email is invalid.');
            }

            setEmail('');
            setPassword('');
            router.push('/');
        } catch (error: any) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={(e) => handleSignUp(e)} className="mt-3">
            <div className="flex flex-col text-xs gap-2">
                <div className={`bg-slate-50 flex flex-col border rounded text-neutral-500 ${!hasFormError ? "border-gray-300" : "border-red-600"}`}>
                    <label htmlFor="" className="ml-2 text-[10px]">Email</label>
                    <input type="text"
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
                {hasFormError && <p className="text-red-600">{errorMessage}</p>}
                <button
                disabled={isLoading}
                type="submit"
                className="bg-sky-500 bg-opacity-95 text-white rounded-md min-h-6 p-2 hover:bg-blue-600 hover:bg-opacity-85 font-bold text-sm disabled:bg-slate-200 text-center">
                    {isLoading ? <CircleNotch className="animate-spin text-sky-600 text-xl min-w-full" /> : 'Sign up' }
                </button>
            </div>
        </form>
    )
}