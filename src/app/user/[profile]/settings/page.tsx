import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Settings from "@/components/Profile/components/Settings/Settings";
import SettingsContainer from "@/components/Profile/components/Settings/components/SettingsContainer";
import SettingsProvider from "@/context/SettingsContext/SettingsProvider";
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
                <SettingsProvider session={user!}>
                {
                    loadingSettings 
                    ? 
                        (
                            <CircleNotch size={32}  className="text-5xl text-sky-400 animate-spin" />
                        )
                    :
                        (
                            <SettingsContainer session={user!}/>
                        )
                }
            </SettingsProvider>
        </Settings>
    )
}