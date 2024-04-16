import Sidebar from "@/components/Sidebar/Sidebar";
import Profile from "@/components/Profile/Profile";

export default function ProfilePage({ params: { profile } }: { params: { profile: string } }) {

  return (
    <div className="flex sm:gap-3">
      <div className="sm:inline-block">
        <Sidebar />
      </div>
      <div className="max-w-full mx-auto">
        <Profile username={profile} />
      </div>
    </div>
  )
}