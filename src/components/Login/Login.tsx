import { ReactNode } from "react";
import Image from "next/image";

export default function Login({ children }: { children: ReactNode }) {
    return (
        <main className="p-5 flex items-center justify-center gap-6 flex-1">
            <div className="hidden lg:inline-block">
                <Image src={"https://agenciadebolso.com/wp-content/uploads/2020/12/1214-instagram-reels-fb.png"} width={500} height={500} alt="Instagram demonstration"/>
            </div>
            {children}
        </main>
    )
}


