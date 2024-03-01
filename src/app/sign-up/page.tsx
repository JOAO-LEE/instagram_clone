import FooterInfo from "@/components/FooterInfo/FooterInfo";
import SignUp from "../../components/SignUp/SignUp";
import Image from "next/image";

export default function Page() {
    return ( 
        <main className="w-full min-h-screen flex flex-col items-center justify-center">
            <section className="p-5 w-full flex  items-center justify-center gap-6">
                <div className="hidden lg:inline-block">
                    <Image src={"https://echoinnovateit.com/wp-content/uploads/2023/07/instagram-like-app-development.png"} width={500} height={500} alt="Instagram demonstration"/>
                </div>
            <SignUp />
           </section>
           <footer className="min-w-full items-center mt-auto">
            <FooterInfo />
           </footer>
        </main>
        
    )
}