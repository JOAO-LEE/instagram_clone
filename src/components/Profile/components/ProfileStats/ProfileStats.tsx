import { ProfilePostDTO } from "@/model/ProfilePost.dto";
import { getUser } from "@/utils/getUser";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../../firebase";
import { StatsDto } from "@/model/Profile/Stats.dto";
import { ProfileInfo } from "@/model/Profile/ProfileInfo";
import { LoggedUser } from "@/enum/LoggedUser.enum";
import { useSession } from "next-auth/react";
import { StatsLoading } from "../Loadings/StatsLoading";

export default function ProfileStats({ userInfo, isLoggedUser }: ProfileInfo) {
    const [stats, setStats] = useState<StatsDto>();
    const [loadingStats, setLoadingStats] = useState(false)
    const {data: session} = useSession();

    useEffect(() => {

        const fetchedStats = async () => {
            console.log(LoggedUser.isLoggedUser === isLoggedUser)
            if  (LoggedUser.isLoggedUser === isLoggedUser) {
                await getUserStats(session?.user.uid!)
                return;
            }
            await getUserStats(userInfo.uid);
        };

        if (session && session?.user?.uid) {
            fetchedStats();
        }

    }, [session]);

       const getUserStats = async (uid: string) => {
            try {
                const loggedUser = await getUser(uid);
                onSnapshot(query(collection(db, "posts"), where("uid", "==", loggedUser.data().uid)), 
                (snapshot) => {
                    setStats(prev => ({...prev, posts: snapshot.docs.length } as StatsDto));
                });
    
                onSnapshot(query(collection(db, "users", loggedUser.id, "following")), 
                (snapshot) => {
                    setStats(prev => ({ ...prev, following: snapshot.docs.length } as StatsDto));
                });

                onSnapshot(query(collection(db, "users", loggedUser.id, "followers")), 
                (snapshot) => {
                    setStats(prev => ({ ...prev, followers: snapshot.docs.length } as StatsDto));
                });
            } catch (error) {
                setLoadingStats(false);
            }
            setLoadingStats(false);
        }

    return (
        <>
            {
                !loadingStats && stats
                ?
                (
                    <section className="flex gap-8 p-2 text-lg w-full">  
                        <span className=""><p className="font-semibold inline">{stats?.posts}</p> post{stats && stats?.posts > 1 || stats && stats?.posts === 0 ? "s" : ""}</span>
                        <span className=""><p className="font-semibold inline">{stats?.followers}</p> follower{stats && stats?.followers > 1 || stats && stats?.followers === 0 ? "s" : ""}</span>
                        <span className="grow"><p className="font-semibold inline" >{stats?.following}</p> following</span>
                    </section>
                )
                :
                (
                    <StatsLoading />
                )
            }
           
        </>
    )
}