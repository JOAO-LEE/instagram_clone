import { User } from "@phosphor-icons/react/dist/ssr";

export function ProfileActionsLoadingNotLogged() {
    return (
        <>
            <div className="grow">
                <div className="animate-pulse h-5 w-32 bg-gray-200"></div>
            </div>
            <div className="text-xs bg-gray-200 animate-pulse p-2 rounded-md">
                <div className="flex items-center gap-2">
                    <User weight="thin" className="text-gray-600 animate-pulse w-4 h-4" />
                    <div className="bg-gray-400 animate-pulse w-10 h-3"></div>
                </div>
            </div>
        </>
    )
}