import { ReactNode } from "react";

export default async function Settings({ children }: { children: ReactNode }) {
    return (
        <main className="flex justify-center w-full p-4 h-full">
            {children}
        </main>
    )
}
