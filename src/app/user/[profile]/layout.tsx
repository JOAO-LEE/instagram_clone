import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Generated by create next app",
  icons: {
    icon: ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"]
  }
};

export default async function ProfilePage({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: {
   profile: string
  }
}>)
{
  return (
    <div className="flex">
      <div className="sm:inline-block">
        <Sidebar />
      </div>
      <div className="w-full max-w-full mx-auto">
        {children}
      </div>
    </div>
  );
}