import { SignEnum } from "@/enum/SignEnum";
import Sign from '@/components/Login/Sign/Sign'

export default function SignInPage() {
    return ( 
        <Sign pageType={SignEnum.SignIn}/>
    )
}