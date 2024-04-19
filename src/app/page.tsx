import Sidebar from "../components/Sidebar/Sidebar";
import Feed from "@/components/Feed/Feed";

export default function HomePage() {
  return (
    <div className="flex flex-col-reverse sm:flex-row md:gap-3">
      <div className="z-10 sm:z-0">
        <Sidebar />
      </div>
      <div className="w-full">
        <Feed />
      </div>
    </div>
  )
}