import Stories from "@/components/Feed/Stories/Stories";
import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "@/components/Feed/Feed";
import './globals.css'

export default function Home() {
  return ( 
    <div className="flex gap-3">
      <div className="md:w-[244px] sm:w-[72px]">
        <Sidebar />
      </div>
      <div className="mx-auto">
        <Feed />
      </div>
    </div>
  )
}