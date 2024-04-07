'use client'
import { Gear } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import { useModalState } from '../../../store/modalState';
import UploadModal from '../Modals/UploadModal/UploadModal';

export default function Profile() {
    const {data: session } = useSession();
     const { isOpen, action } = useModalState();



    return (
        <>
            <main className='flex flex-col items-center '>
                <header className='flex gap-4 p-4 bg-yellow-300'>
                    <section className='p-2 bg-blue-400'>
                        <img src={session?.user.image!} alt="" className='rounded-full' />
                    </section>
                    <section className='flex flex-col w-full0 p-2'>
                        <section className='flex gap-2 items-center p-4 w-full bg-orange-600'>
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
                            <span className=''><p className='font-semibold inline'>15</p> posts</span>
                            <span className=''><p className='font-semibold inline'>123</p> followers</span>
                            <span className='grow'><p className='font-semibold inline' >100</p> following</span>
                        </section>

                    </section>
                    {/* <section className='flex gap-2 p-1 '>
                        <div className=''>
                            <p className='font-semibold'>{session?.user.username}</p>
                        </div>
                        <div>
                            <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400">Edit Profile</button>
                        </div>
                        <div>
                            <button className="text-xs font-semibold bg-gray-300 p-2 rounded-md hover:bg-gray-400">View Archive</button>
                        </div>
                        <div className="">
                            <GearFine  weight="thin" size={'30px'} />
                        </div>
                    </section> */}


                </header>
                <section className=''>
                
                </section>
            </main>
            {
                isOpen 
                && 
                    (
                        <UploadModal />
                    )
            }
        </>
    )
}
