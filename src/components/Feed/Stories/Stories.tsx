'use client'
import { UserStoryDTO } from '@/model/UserStory.dto';
import minifaker from 'minifaker';
import "minifaker/locales/en"
import { useEffect, useState } from 'react';
import Story from './Story/Story';

export default function Stories() {
    const [stories, setStories] = useState<Array<UserStoryDTO>>([]);

    useEffect(() => {
        const userStories = minifaker.array(20, (i) => {
            return {
                username: minifaker.username({locale: 'en'}).toLowerCase(),
                image: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 20)}`,
                id: i
            }
        })
        setStories(userStories)
    }, []);

    return (
        <section className='flex max-w-xl space-x-2 p-6 bg-blue-300 mt-8 border-gray-200 border overflow-x-scroll rounded-sm scrollbar-none'>
            {stories.map(story => (
                <Story key={story.id} username={story.username} image={story.image} />
            ))}
        </section>
    )
}
// flex 