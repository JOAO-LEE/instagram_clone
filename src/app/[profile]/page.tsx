import Sidebar from "@/components/Sidebar/Sidebar";
import Profile from "@/components/Profile/Profile";

export default function ProfilePage() {
  return (
    <div className="flex md:gap-3">
      <div className="sm:inline-block">
        <Sidebar />
      </div>
      <div className="w-full">
        <Profile />
      </div>
    </div>
  )
}