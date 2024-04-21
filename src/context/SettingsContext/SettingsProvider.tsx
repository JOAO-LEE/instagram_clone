import { regexUsername, regexWebSite } from "@/utils/regex/formSettingsRegex";
import { Session } from "next-auth";
import { SettingsContext } from "./SettingsContext";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { FormErrors, SettingsFormProps } from "@/model/Profile/Settings/SettingsContext";
import { collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { getUser } from "@/utils/getUser";
import { useSession } from "next-auth/react";

export default function SettingsProvider ({ children, session }: { children: ReactNode, session: Session }) {
    const [formSettings, setFormSettings] = useState<Session["user"]>({...session?.user!, biography: session?.user?.biography ?? "", site: session?.user?.site ?? "", name: session?.user?.name ?? "" });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const [selectedPhoto, setSelectedPhoto] = useState<any>("");
    const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
    const {update} = useSession()
    
    const handleFieldBlur = (name: string): void => {
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        verifyFormErrors(name, formSettings);
    };
    
    const chooseProfileImage = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e?.target?.files![0];
        const fileReader = new FileReader();
        if (file) {
            fileReader.readAsDataURL(file);

            fileReader.onload = (readerEvent) => {
                setSelectedPhoto(readerEvent.target?.result)
            }
        }
        console.log(selectedPhoto)
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
                isValid = regexUsername.test(settings.username!) || (!touchedFields.username || settings.username! === "");
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
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (loadingUpdate) return;

        const userFetchedUser = await getUser(session.user.uid!);

        let updateSettings: any = {
            username: formSettings.username!.trim(),
            biography: formSettings.biography!.trim(),
            site: formSettings.site!.trim(),
            name: formSettings.name!.trim()
        }

        if (!session.user.image && selectedPhoto) {
            console.log(selectedPhoto)
            const fileName = `${new Date().getDate()}-${session.user.uid}`;
            const storageRef = ref(storage, `/user_photos/${fileName}`);
            await uploadString(storageRef, selectedPhoto, "data_url");
            const photoUrl = await getDownloadURL(storageRef);
            updateSettings.profileImage = photoUrl;
        }

        await updateDoc(doc(db, "users", userFetchedUser.id), {...updateSettings});
        await update();
        console.log(session.user)
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
        }
    }

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>

    )
}