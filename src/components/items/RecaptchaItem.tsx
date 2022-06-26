import "../../styles/style.css"
import {useService} from "react-service-locator";
import {RecaptchaService} from "../../services/recaptcha-service";
import ReCAPTCHA from "react-google-recaptcha";
import React from "react";
import {AppConfig} from "../../config/app-config";

const RecaptchaItem = () => {

    const recaptchaService = useService(RecaptchaService);

    function onChangeRecaptcha(value: any) {
        console.log(value);
        recaptchaService.setToken(value);
    }

    return(
        <div className={"pb-5 fare-section text-center"}>
            <ReCAPTCHA
                sitekey={AppConfig.recaptchaSiteKey}
                onChange={onChangeRecaptcha}
            />
        </div>
    );
}

export default RecaptchaItem;