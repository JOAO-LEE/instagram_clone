"use client"

import { FormFields } from "@/model/Profile/Settings/SettingsFormFields";
import UsernameError from "./UsernameError";

export default function SettingsFormFields(formFieldProps: FormFields) {

   const {
        formErrors, 
        formSettings, 
        handleFieldBlur,
        handleSettingsForm, 
        touchedFields
    } = formFieldProps;

    console.log(formErrors);
  
    return (
        <section className="flex flex-col gap-2 md:gap-4 flex-1 w-2/3 md:w-full p-1">
            <div className="flex flex-col">
                <label className={`font-light text-sm sm:text-lg ${touchedFields.username && formErrors.username ? "text-red-600" : ""}`}>Username</label>
                <input type="text" spellCheck={false} name="username" onBlur={() => handleFieldBlur("username")} value={formSettings?.username} onChange={(e) => handleSettingsForm(e)} className={`rounded ${touchedFields.username && formErrors.username ? "border-red-500" : "border-gray-200"} focus:ring-0`} />
                {
                    formErrors!.username
                    &&
                    (
                        <UsernameError />
                    ) 
                }
            </div>
            <div className="flex flex-col">
                <label className="font-light text-sm sm:text-lg">Name</label>
                <input type="text" spellCheck={false} name="name" value={formSettings.name!} onChange={(e) => handleSettingsForm(e)} className="rounded border-gray-200 focus:ring-0" />
            </div>
            <div className="flex flex-col">
                <label className={`font-light text-sm sm:text-lg ${touchedFields.site && formErrors.site && "text-red-600"}`}>Website</label>
                <input type="text" name="site" value={formSettings.site} onChange={(e) => handleSettingsForm(e)} onBlur={() => handleFieldBlur("site")} className={`rounded ${touchedFields.site && formErrors.site ? "border-red-500" : "border-gray-200"} focus:ring-0`} />
                {
                    touchedFields.site && formErrors.site 
                    &&
                        (
                            <span className="mt-1 text-xs text-red-400">Website format required (eg: "https://...").</span>
                        ) 
                }
            </div>
            <div className="flex flex-col">
                <label className="font-light text-sm sm:text-lg">Bio</label>
                    <textarea maxLength={80} name="biography" value={formSettings.biography} onChange={(e) => handleSettingsForm(e)} className="rounded border-gray-200 focus:ring-0 resize-none" />
                    <p className="text-sm  text-gray-400 self-end">{formSettings.biography?.length ?? 0} \ 80</p>
            </div>
            
        </section>
    )
}