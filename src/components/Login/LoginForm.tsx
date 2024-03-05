'use client'

import { FormEvent, useState } from "react";
import { useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import { auth } from '@/../../firebase'
import { useRouter } from "next/navigation";

export default function SignUpFogm() {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            const response = await createUserWithEmailAndPassword(username, password)
            console.log(response);
            setUserName('');
            setPassword('');
            router.push('/');
        } catch (error) {
          console.log(error)  
        }
    };

    return (
        <form onSubmit={(e) => handleSignUp(e)} className="mt-3">
            <div className="flex flex-col text-xs gap-2">
                <div className="bg-slate-50 flex flex-col border rounded border-gray-300 text-[10px] text-neutral-500 ">
                    <label htmlFor="" className="ml-2">Phone number, username, or email</label>
                    <input type="text" value={username} className="border-none text-xs bg-slate-50 focus:ring-0 max-h-6"
                    onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="bg-slate-50 flex flex-col border rounded border-gray-300 text-[10px] text-neutral-500">
                    <label htmlFor="" className="ml-2">Password</label>
                    <input type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-none text-xs bg-slate-50 focus:ring-0  max-h-6" />
                </div>
                <button
                type="submit"
                className="bg-sky-500 bg-opacity-95 text-white rounded-md min-h-6 p-2 hover:bg-blue-600 hover:bg-opacity-85 font-bold text-sm">
                    Log in
                </button>
            </div>
        </form>
    )
}