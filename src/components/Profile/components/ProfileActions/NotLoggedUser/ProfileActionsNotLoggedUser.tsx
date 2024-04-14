import { UserPlus, UserCheck } from "@phosphor-icons/react";

export default function ProfileActionsNotLoggedUser ({ follows, handleFollow }: { follows: boolean, handleFollow: () => Promise<void> }) {
    return (
        <div>
        <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400" onClick={handleFollow}>
            <div className="flex items-center gap-2">
                {
                    !follows 
                    ? 
                        ( 
                            <UserPlus weight="thin" className="inline text-xl" /> 
                        )
                    :  
                        ( 
                            <UserCheck weight="thin" className="inline text-xl" />
                        )
                }
                <p>{!follows ? "Follow" : "Following"}</p>
            </div>
        </button>
    </div>
    )
}