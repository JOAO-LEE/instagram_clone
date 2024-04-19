"use client";

import { SettingsFormDto } from "@/model/SettingsForm.dto";
import { User as UserNoPhoto } from "@phosphor-icons/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface FormErrors {
    [key: string]: boolean;
}

export default function SettingsForm({ session }: { session: Session | null }) {
    const [formSettings, setFormSettings] = useState<Session["user"]>({...session?.user!, biography: session?.user?.biography ?? "", site: session?.user?.site ?? "" });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const router = useRouter();
    
    const regexUsername = /^(?!.*\.{2})[a-z0-9_]{3,30}$/;
    const regexWebSite = /^(https?|ftp):\/\/[^\s/$.?#]+(\/[^\s]*)?$/;

    const handleSettingsForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { target: { value, name } } = event;
        setFormSettings(prev => {
            const updatedSettings = { ...prev, [name]: value };
            verifyFormErrors(name, updatedSettings);
            return updatedSettings;
        });
    };
    
    const addImageToPost = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e?.target?.files![0];
        if (file) {
            console.log(URL.createObjectURL(file))
        }
      };

      const verifyFormErrors = (name: string, settings: Session["user"]): void => {
        let isValid: boolean;
    
        switch (name) {
            case "username":
                isValid = regexUsername.test(settings.username!) || (!touchedFields.username || settings.username! === "");
                console.log(formSettings.username)
                break;
            case "site":
                isValid = settings.site === "" ? true : regexWebSite.test(settings.site);
                break;
            default:
                isValid = true;
                break;
        }
    
        setFormErrors(prev => ({
            ...prev,
            [name]: !isValid
        }));
    };
    
    const handleFieldBlur = (name: string): void => {
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        verifyFormErrors(name, formSettings);
    };

    console.log(formErrors)

    return (
        <section className="w-full sm:w-3/4 p-2">
            <h1 className="text-xl font-semibold pb-4 bg-blue-300">Edit Profile</h1> 
            <form className="flex flex-col gap-8">
                <section className="flex justify-between items-center font-bold text-sm bg-gray-200 rounded-xl p-4">
                    <div className="w-fit items-center flex gap-2">
                        {
                            session?.user.image 
                            ?
                            <img src={session.user.image!} alt="User image" className="rounded-full w-20 object-contain" />
                            :
                            <UserNoPhoto size={80} weight="thin" className="border border-gray-400 rounded-full bg-zinc-100" />
                        }
                            <div>
                                <p>{session?.user?.username}</p>
                                <p className="text-gray-400 font-normal">{session?.user.name ?? ""}</p>
                            </div>
                    </div>
                    <div className="">
                        <input type="file" accept=".jpg, .jpeg, .png" hidden id="upload-user-image" onChange={(e) => addImageToPost(e)}/>
                        <label htmlFor="upload-user-image" className="bg-sky-500  hover:bg-blue-500 rounded p-2 text-white text-xs cursor-pointer">Change photo</label>
                    </div>
                </section>
                <section className="flex flex-col gap-4">
                    <div className="flex flex-col w-3/5">
                        <label className={`font-light text-lg ${touchedFields.username && formErrors.username ? "text-red-600" : ""}`}>Username</label>
                        <input type="text" name="username" onBlur={() => handleFieldBlur("username")} value={formSettings?.username} onChange={(e) => handleSettingsForm(e)} className={`rounded ${touchedFields.username && formErrors.username ? "border-red-500" : "border-gray-200"} focus:ring-0`} />
                    </div>
                    <div className="flex flex-col w-3/5">
                        <label className="font-light text-lg">Name</label>
                        <input type="text" name="name" value={formSettings.name!} onChange={(e) => handleSettingsForm(e)} className="rounded border-gray-200 focus:ring-0" />
                    </div>
                    <div className="flex flex-col w-3/5">
                        <label className={`font-light text-lg ${touchedFields.site && formErrors.site && "text-red-600"}`}>Website</label>
                        <input type="text" name="site" value={formSettings.site} onChange={(e) => handleSettingsForm(e)} onBlur={() => handleFieldBlur("site")} className={`rounded ${touchedFields.site && formErrors.site ? "border-red-500" : "border-gray-200"} focus:ring-0`} />
                        {
                           touchedFields.site && formErrors.site 
                            &&
                                (
                                    <span className="mt-1 text-xs text-red-400">Website format required (eg: "https://...").</span>
                                ) 
                        }
                    </div>
                    <div className="flex flex-col w-3/5">
                        <label className="font-light text-lg">Bio</label>
                            <textarea maxLength={80} name="biography" value={formSettings.biography} onChange={(e) => handleSettingsForm(e)} className="rounded border-gray-200 focus:ring-0 resize-none" />
                            <p className="text-sm  text-gray-400 self-end">{formSettings.biography?.length ?? 0} \ 80</p>
                    </div>
                    <div className="flex justify-end gap-2 text-xs font-bold">
                        <button className="p-2 rounded border border-gray-300 hover:bg-gray-100" onClick={() => router.back()}>Cancel</button>
                        <button className="p-2 rounded bg-sky-500  hover:bg-blue-500 text-white ">Save changes</button>
                    </div>
                </section>
            </form>
        </section> 
    )
}

