import Footer from "@/components/Footer/Footer";
import Sign from "../../components/Login/Sign/Sign";
import { SignEnum } from "@/enum/SignEnum";

export default function SignUpPage() {
    return (   
        <Sign pageType={SignEnum.SignUp}/>
    )
}