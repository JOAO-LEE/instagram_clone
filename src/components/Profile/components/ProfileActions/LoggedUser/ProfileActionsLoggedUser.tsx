import { Gear } from "@phosphor-icons/react/dist/ssr";

export default function ProfileActionsLogged() {
    return (
        <>
            <div>
                <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400">Edit Profile</button>
            </div>
            <div>
                <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400">View Archive</button>
            </div>
            <div className="">
                <Gear size={"30px"} weight="light" />
            </div>
        </>
    )
}