import Profile from "@/components/Profile/Profile";

export default function ProfilePage({ params: { profile } }: { params: { profile: string } }) {
  return (
    <Profile username={profile} />
  )
}