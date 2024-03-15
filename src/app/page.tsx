import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "@/components/Feed/Feed";
import './globals.css'
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Home() {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/sign-up')
  }

  return (
    <div className="flex md:gap-3">
      <div className="sm:inline-block">
        <Sidebar />
      </div>
      <div className="w-full">
        <Feed />
      </div>
    </div>
  )
}