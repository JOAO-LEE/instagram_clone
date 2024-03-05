import { ReactNode } from "react";
import FooterInfo from "../FooterInfo/FooterInfo";
import Image from "next/image";

export default function Login({ children }: { children: ReactNode }) {
    return (
        <main className="w-full min-h-svh flex flex-col items-center justify-center">
            <section className="p-5 w-full flex items-center justify-center gap-6 flex-1">
                <div className="hidden lg:inline-block">
                    <Image src={"https://agenciadebolso.com/wp-content/uploads/2020/12/1214-instagram-reels-fb.png"} width={500} height={500} alt="Instagram demonstration"/>
                </div>
                {children}
        </section>
            <footer className="min-w-full items-center mt-auto">
                <FooterInfo />
            </footer>
        </main>  
    )
}


