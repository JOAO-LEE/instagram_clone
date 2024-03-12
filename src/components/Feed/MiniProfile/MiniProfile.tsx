import { Session, getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import SignOutButton from "@/components/Login/SignOutButton/SignOutButton";
import { redirect } from "next/navigation";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";

export default async function MiniProfile() {
    const session: Session | null = await getServerSession(authOptions);
    console.log(session)

    // if (!session) {
    //     redirect('/sign-up')
    // }
    // const {user: {}} = user ?? '';

    return (
        <div className="flex flex-wrap mt-14 justify-between p-1">
            <div className="flex">
           { session?.user?.image ? <img src={session?.user?.image} className="h-12 rounded-full object-cover border p-[2px]" /> : <UserCircle size={'48px'} className="text-neutral-500"/>}
                <div className="ml-4 max-w-fit">
                    <h2 className="font-bold text-sm">{session?.user?.username ?? 'username' }</h2>
                    <h3 className="text-xs  text-gray-400">{session?.user?.name ?? 'email' }</h3>
                </div>
            </div> 
            <SignOutButton />
     </div> 
    )
}

