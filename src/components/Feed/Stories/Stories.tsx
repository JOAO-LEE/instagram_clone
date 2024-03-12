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
        <section className="flex space-x-2 p-6 mt-8 rounded-sm overflow-x-scroll scrollbar-none w-full sm:max-w-full">
            {stories.map(story => (
                <Story key={story.id} username={story.username} image={story.image} />
            ))}
        </section>
    )
}