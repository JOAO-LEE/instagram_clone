import Sign from "../../components/Login/Sign/Sign";
import { SignEnum } from "@/enum/SignEnum.enum";

export default function SignUpPage() {
    return (   
        <Sign pageType={SignEnum.SignUp}/>
    )
}