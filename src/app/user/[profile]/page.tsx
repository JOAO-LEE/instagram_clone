import Sidebar from "@/components/Sidebar/Sidebar";
import Profile from "@/components/Profile/Profile";

export default function ProfilePage({ params: { profile } }: { params: { profile: string } }) {

  return (
    <div className="flex md:gap-3">
      <div className="sm:inline-block">
        <Sidebar />
      </div>
      <div className="w-full">
        <Profile username={profile} />
      </div>
    </div>
  )
}