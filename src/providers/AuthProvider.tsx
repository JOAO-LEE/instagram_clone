"use client";
import { SessionProvider, useSession } from "next-auth/react";

interface AuthProviderProps {
    children: React.ReactNode
    session: any
}

export default function AuthProvider ({children, session}: AuthProviderProps) {
    return (
        <SessionProvider session={session}>{children}</SessionProvider>
    )
}