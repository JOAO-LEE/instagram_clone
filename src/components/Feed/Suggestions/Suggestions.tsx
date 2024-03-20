'use client'
import { SuggestionsDTO } from '@/model/Suggestions.dto';
import minifaker from 'minifaker';
import "minifaker/locales/en";
import { useEffect, useState } from 'react';
import Suggestion from './Suggestion/Suggestion';

export default function Suggestions() {
    const [suggestions, setSuggestions] = useState<SuggestionsDTO[]>([]);

    useEffect(() => {
        const searchedSuggestions = minifaker.array(5, (i) => {
            return {
                username: minifaker.username({locale: 'en'}),
                jobTitle: minifaker.jobTitle({locale: 'en'}),
                id: i
            }
        });
        setSuggestions(searchedSuggestions);
    }, [])

    return (
        <section className="mt-4 p-1">
            <div className="flex justify-between mb-5 text-xs">
                <h3 className="font-bold text-gray-400">Suggested for you</h3>
                <button className="text-gray-600 font-semibold">See all</button>
            </div>
            {suggestions.map((suggestion:SuggestionsDTO) => (
                <Suggestion key={suggestion.id} jobTitle={suggestion.jobTitle} username={suggestion.username} />
            ))}
        </section>
    )
}