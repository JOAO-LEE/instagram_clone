'use client'

import { signOut } from "next-auth/react"

export default function SignOutButton() {
    return (
        <>
            <button className="text-blue-400 text-xs font-semibold" onClick={() => signOut({callbackUrl: '/sign-in', redirect: true})}>Sign Out</button>
        </>
    )
}