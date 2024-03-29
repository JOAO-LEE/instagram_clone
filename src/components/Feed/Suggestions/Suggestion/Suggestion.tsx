import { SuggestionsDTO } from "@/model/Suggestions.dto";

export default function Suggestion({ jobTitle, username, id}: SuggestionsDTO) {
    return (
        <div className="flex items-center justify-between mt-3">
            <img src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`} alt={`${username} picture`} className="h-10 rounded-full border p-[2px]" />
            <div className="flex-1 ml-3">
                <h2 className="text-xs font-semibold">{username}</h2>
                <h3 className="text-xs text-gray-500">{jobTitle}</h3>
            </div>
                <button className="text-xs font-semibold text-blue-400">Follow</button>
        </div>
    )
} 