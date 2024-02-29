'use client'

import { useState } from "react";

export default function LoginForm() {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <form action="" className="mt-3">
            <div className="flex flex-col text-xs gap-2">
                <div className="bg-slate-50 flex flex-col border rounded border-gray-300 text-[10px] text-neutral-500 ">
                    <label htmlFor="" className="ml-2">Phone number, username, or email</label>
                    <input type="text" className="border-none text-xs bg-slate-50 focus:ring-0 max-h-6"/>
                </div>
                <div className="bg-slate-50 flex flex-col border rounded border-gray-300 text-[10px] text-neutral-500">
                    <label htmlFor="" className="ml-2">Password</label>
                    <input type="password" className="border-none text-xs bg-slate-50 focus:ring-0  max-h-6" />
                </div>
                <button 
                className="bg-sky-500 bg-opacity-95 text-white rounded-md min-h-6 p-2 hover:bg-blue-600 hover:bg-opacity-85 font-bold text-sm">
                    Log in
                </button>
            </div>
        </form>
    )
}