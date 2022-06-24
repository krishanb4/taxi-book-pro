import "../styles/detailed-form.css"
import {useService} from "react-service-locator";
import {RecaptchaService} from "../../services/recaptcha-service";
import ReCAPTCHA from "react-google-recaptcha";
import React from "react";

const RecaptchaItem = () => {

    const recaptchaService = useService(RecaptchaService);

    function onChangeRecaptcha(value: any) {
        recaptchaService.setToken(value);
    }

    return(
        <div className={"text-center d-inline-block py-3"}>
            <ReCAPTCHA
                sitekey="6Lf-RpggAAAAAEpewUZmQatyj2Y5wHrOFmCRNyQK"
                onChange={onChangeRecaptcha}
            />
            {/*    secret key - 6Lf-RpggAAAAAJz-tPbFnggfio4QUpsuskKcbDo_*/}
        </div>
    );
}

export default RecaptchaItem;