import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "@/components/Feed/Feed";

export default function Home() {
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