'use client'
import { UserStoryDTO } from '@/model/userStory.dto';
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
        console.log(userStories)
        setStories(userStories)
    }, []);

    return (
        <div>
            {stories.map(story => (
                <Story key={story.id} username={story.username} image={story.image} />
            ))}
        </div>
    )
}