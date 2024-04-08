'use client';

import { signIn } from "next-auth/react";

export default function SignGoogle() {
    return (
        <div className="self-stretch flex justify-center items-center gap-3 cursor-pointer p-2 group" onClick={() => signIn("google", {callbackUrl: "/"})}>
            <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png" alt="Google icon" className="max-w-6" />
            <p className="text-sky-500 font-semibold group-hover:text-opacity-85 group-hover:text-blue-600">Sign in with Google</p>
        </div>
    )
}
