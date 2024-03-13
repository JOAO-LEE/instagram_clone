'use client'
import { UserStoryDTO } from '@/model/UserStory.dto';
import minifaker from 'minifaker';
import "minifaker/locales/en"
import { useEffect, useState } from 'react';
import Story from './Story/Story';
import { getSession } from 'next-auth/react';

export default function Stories() {
    const [stories, setStories] = useState<Array<UserStoryDTO>>([]);
    
    useEffect(() => {
        const userStories: Array<UserStoryDTO> = minifaker.array(20, (i) => {
            return {
                username: minifaker.username({locale: 'en'}).toLowerCase(),
                image: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 20)}`,
                id: i
            };
        });
        const getUser = async () => {
            const session = await getSession();
            if (session) {
                userStories.unshift({
                    image: session.user.image ?? '', username: session.user.username ?? '',
                })
            }
            setStories(userStories);
        }
        getUser();
    }, []);


    return (
        <section className="flex space-x-2 p-6 mt-8 rounded-sm overflow-x-scroll scrollbar-none max-w-full sm:max-w-max">
            {stories.map((story, index) => (
                <Story key={story.username} username={story.username} image={story.image} isUser={index === 0}/>
            ))}
        </section>
    )
}