import { regexUsername, regexWebSite } from "@/utils/regex/formSettingsRegex";
import { Session } from "next-auth";
import { SettingsContext } from "./SettingsContext";
import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import { FormErrors, SettingsFormProps } from "@/model/Profile/Settings/SettingsContext";



export default function SettingsProvider ({ children, session }: { children: ReactNode, session: Session }) {
    const [formSettings, setFormSettings] = useState<Session["user"]>({...session?.user!, biography: session?.user?.biography ?? "", site: session?.user?.site ?? "", name: session?.user?.name ?? "" });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
    const [selectedPhoto, setSelectedPhoto] = useState<string>("");
    
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
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();


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