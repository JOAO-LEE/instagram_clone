import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Settings from "@/components/Profile/components/Settings/Settings";
import SettingsForm from "@/components/Profile/components/Settings/components/SettingsForm";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";
import { getServerSession } from "next-auth";

export default async function SettingsPage() {
    let loadingSettings: boolean = true;

    const user = await getServerSession(authOptions);
    if (user) {
        loadingSettings = false;
    }

    return (
        <Settings>
             {
                loadingSettings 
                ? 
                    (
                        <CircleNotch size={32}  className="text-5xl text-sky-400 animate-spin" />
                    )
                :
                    (
                        <SettingsForm session={user} />
                    )
            }
        </Settings>
    )
}