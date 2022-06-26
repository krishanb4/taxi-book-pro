import "../../styles/style.scss"
import React from "react";
import {useService} from "react-service-locator";
import {RecaptchaService} from "../../services/recaptcha-service";

const ReservationButton = (params: { formId: string | undefined; }) => {

    const recaptchaService = useService(RecaptchaService);

    return (
        <button type="submit" form={params.formId} className="btn btn-reservation-button"
                disabled={recaptchaService.isTokenExpired()}>Submit
            Reservation
        </button>
    );
}

export default ReservationButton;
