"use client"

import { FormErrors } from "@/model/Profile/Settings/SettingsContext";
import { useRouter } from "next/navigation";

export default function SettingsActions(formErrors: FormErrors) {
    const router = useRouter();

    return (
        <div className="flex justify-end gap-2 text-xs font-bold">
            <button className="p-2 rounded border border-gray-300 hover:bg-gray-100" onClick={() => router.back()}>Cancel</button>
            <button type="submit" className="p-2 rounded bg-sky-500  hover:bg-blue-500 text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-600" title={`${formErrors && "Update changes has errors"}`} disabled={(formErrors.username || formErrors.site) && true}>Save changes</button>
        </div>
    )
}