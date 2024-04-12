import { CameraSlash } from "@phosphor-icons/react/dist/ssr";

export default function NoPosts({ username }: { username: string }) {
    return (
        <div className="w-full flex flex-col text-gray-400 justify-center items-center h-1/2 max-h-dvh">
            <CameraSlash size={100} weight="thin"/>
            <p>{username} haven't posted yet.</p>
        </div>
    )
}