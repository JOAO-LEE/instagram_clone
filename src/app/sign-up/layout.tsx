import Footer from "@/components/Footer/Footer";
import Login from "@/components/Login/Login";
import type { Metadata } from "next";
import { Inter } from "next/font/google";;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sign up • Instagram Clone",
  description: "Generated by create next app",
  icons: {
    icon: ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"]
  }
};

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-full min-h-svh flex flex-col items-center justify-center">
      <Login>
        {children}
      </Login>
      <Footer />
    </div>
  );
}