'use client'
import { BookmarkSimple, Gear, GridNine, Heart, IdentificationBadge } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import { useModalState } from '../../../store/modalState';
import UploadModal from '../Modals/UploadModal/UploadModal';
import { useEffect, useState } from 'react';
import { query, collection, where, getDocs, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase';
import ProfileLoadingSkeleton from '../Loadings/ProfileLoadingSkeleton';

export default function Profile() {
    const { data: session } = useSession();
    const { isOpen } = useModalState();
    const [userPosts, setUserPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (session && (session.user.username && session.user.uid)) {

                    const q = query(collection(db, "posts"),
                        where("username", "==", session.user.username), 
                        where("uid", "==", session.user.uid));

                    const querySnapshot = await getDocs(q);
                    const postsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        stats: false,
                        ...doc.data()
                    }));
                    setUserPosts(postsData);

                    // if (userPosts) {
                    //     userPosts.map(async (post: any) => {
                    //         const q = query(collection(db, "posts", post.id, "likes"));
                    //         const querySnapshot = await getDocs(q);
                    //         console.log(querySnapshot)
                            
                    //     });
                    // }
                   
                }
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }


        };

        if (session) {
            fetchUserPosts();
        }
    }, [session, db]);

    // const handleMouseOver = (index: number) => {
    //     setUserPosts(prevPosts => {
    //         const updatedPosts = [...prevPosts];
    //         updatedPosts[index].stats = true;
    //         return updatedPosts;
    //     });
    // };

    // const handleMouseLeave = (index: number) => {
    //     setUserPosts(prevPosts => {
    //         const updatedPosts = [...prevPosts];
    //         updatedPosts[index].stats = false;
    //         return updatedPosts;
    //     });
    // };

    return (
        <>
            {
                userPosts.length === 0 && !(session?.user.username && session.user.uid)
                ?
                    (
                    <ProfileLoadingSkeleton />

                    ) 
                :   
                    (
                        <main className='flex gap-1 flex-col items-center '>
                            <header className='flex gap-4 p-4'>
                                <section className='p-2'>
                                    <img src={session?.user.image!} alt="" className='rounded-full' />
                                </section>
                                <section className='flex flex-col w-full p-2'>
                                    <section className='flex gap-2 items-center p-4 w-full '>
                                        <div className='grow'>
                                            <p className='font-semibold text-lg'>{session?.user.username}</p>
                                        </div>
                                        <div>
                                            <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400">Edit Profile</button>
                                        </div>
                                        <div>
                                            <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400">View Archive</button>
                                        </div>
                                        <div className="">
                                            <Gear size={'30px'} weight="light" />
                                        </div>
                                    </section>
                                    <section className='flex gap-8 p-2 text-lg'>  
                                        <span className=''><p className='font-semibold inline'>{userPosts.length}</p> post{userPosts.length > 1 ? "s" : ""}</span>
                                        <span className=''><p className='font-semibold inline'>123</p> followers</span>
                                        <span className='grow'><p className='font-semibold inline' >100</p> following</span>
                                    </section>
                                </section>
                            </header>
                            <div className='flex gap-8 justify-center p-2 text-gray-300 text-xs border-t border-gray-200 w-1/2'>
                                    <div className='flex items-center gap-2 p-1'>
                                        <GridNine weight="light" className='text-xl'  />
                                        <p className='uppercase font-semibold'>posts</p>
                                    </div>
                                    <div className='flex  items-center gap-2 p-1'>
                                        <IdentificationBadge weight="light" className='text-xl' />
                                        <p className='uppercase font-semibold'>tagged</p>
                                    </div>
                                    <div className='flex  items-center gap-2 p-1'>
                                        <BookmarkSimple weight="light"  className='text-xl'/>
                                        <p className='uppercase font-semibold'>saved</p>
                                    </div>
                            </div>
                            <section className='grid grid-cols-3 gap-2'>
                                {
                                    userPosts.length ? userPosts.map((userPost, index) => (
                                        <div className='w-fit relative' key={index} 
                                        //  onMouseOver={() => handleMouseOver(index)}
                                        // onMouseLeave={() => handleMouseLeave(index)}
                                        >
                                            <img src={userPost.image} alt="" className='h-64 object-cover w-64 hover:opacity-70 transition-all duration-500 hover:scale-110 hover:shadow-lg shadow-black p-1' />
                                            {/* {
                                                userPost.stats 
                                                ?
                                                (
                                                    <div className='absolute top-1/2 left-1/2 flex gap-2 text-white'>
                                                        <Heart 
                                                        weight="fill" 
                                                        className="text-white text-xl"/>
                                                        <p>{userPost.likes?.length}</p>
                                                    </div>
                                                ) 
                                                :
                                                <></>
                                            } */}
                                        </div>
                                    ))
                                    :
                                <></>
                                }
                            </section>
                        </main> 
                    )
            }
        
        {
            isOpen && 
            (
                <UploadModal />

            )
        }
        </>
    )
                      
            
}


// {
//     isOpen 
//     && 
//         (
//             <UploadModal />
//         )
// }
        
// }