"use client"

import { regexUsername, regexWebSite } from "@/utils/regex/formSettingsRegex";
import { Session } from "next-auth";
import { SettingsContext } from "./SettingsContext";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { FormErrors, SettingsFormProps } from "@/model/Profile/Settings/SettingsContext";
import { collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { getUser } from "@/utils/getUser";
import { useSession } from "next-auth/react";

export default function SettingsProvider ({ children, session }: { children: ReactNode, session: Session }) {
    console.log(session?.user?.name)
    const [formSettings, setFormSettings] = useState<Session["user"]>({...session?.user!, biography: session?.user?.biography ?? "", site: session?.user?.site ?? "", name: session?.user?.name ?? "" });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const [selectedPhoto, setSelectedPhoto] = useState<string>("");
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const {update} = useSession()
    
    const handleFieldBlur = (name: string): void => {
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        verifyFormErrors(name, formSettings);
    };
    
    const chooseProfileImage = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e?.target?.files![0];
        if (file) {
            const imageChosen = URL.createObjectURL(file);
            setSelectedPhoto(imageChosen);
        }
    };

    const handleSettingsForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const { target: { value, name } } = event;
        setFormSettings(prev => {
            const updatedSettings = { ...prev, [name]: value };
            verifyFormErrors(name, updatedSettings);
            return updatedSettings;
        });
    };

    const verifyFormErrors = (name: string, settings: Session["user"]): void => {
        let isValid: boolean;
    
        switch (name) {
            case "username":
                isValid = regexUsername.test(settings.username!) && (!settings.username!.includes("..")) || settings.username!.length < 3;
                break;
            case "site":
                isValid = settings.site === "" ? true : regexWebSite.test(settings.site!);
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
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (loadingUpdate) return;
        const userFetchedUser = await getUser(session.user.uid!);
        console.log(userFetchedUser)

        // if()

        const updateSettings = {
            username: formSettings.username!.trim(),
            biography: formSettings.biography!.trim(),
            website: formSettings.site!.trim(),
            name: formSettings.name!.trim()
        }

        // setLoading(true);
    
        // const username = session?.user.username;
        // const profileImage = session?.user.image;
        // const timestamp = serverTimestamp();
        await updateDoc(doc(db, "users", userFetchedUser.id), {...updateSettings});
        await update();
        // const imageRef = ref(storage, `posts/${docRef.id}/image` )
        // await uploadString(imageRef, selectedFile, "data_url");
    };

    const settings: SettingsFormProps = {
        chooseProfileImage,
        handleFieldBlur,
        handleSettingsForm,
        handleSubmit,
        settingsFormState: {
            formSettings, 
            setFormSettings
        },
        selectedPhotoState: {
            selectedPhoto,
            setSelectedPhoto
        },
        settingsFormErrorState: {
            formErrors,
            setFormErrors
        },
        touchedFieldState: {
            touchedFields,
            setTouchedFields
        }
    }

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>

    )
}