import { ReactNode } from "react";
import Image from "next/image";
import '@/app/globals.css';

export default function Login({ children }: { children: ReactNode }) {
    return (
        <main className="p-5 flex items-center justify-center gap-6 flex-1">
            <div className="hidden lg:inline-block">
                <Image src={"https://static.wixstatic.com/media/fd63ed_44d6fed781e94f88adeb3152a7a247fb~mv2.png/v1/fill/w_588,h_588,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/mockup-of-two-black-iphones-xr-floating-.png"} width={400} height={400} alt="Instagram demonstration"/>
            </div>
            {children}
        </main>
    )
}


