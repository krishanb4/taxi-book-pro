import "../../styles/style.css"
import React from "react";
import {useService} from "react-service-locator";
import {RecaptchaService} from "../../services/recaptcha-service";

const ReservationButton = (params: { formId: string | undefined; }) => {

    const recaptchaService = useService(RecaptchaService);

    return(
        <div className="btn-reservation py-5">
            <button type="submit" form={params.formId} className="btn btn-reservation-button" disabled={recaptchaService.isTokenExpired()}>Submit
                Reservation
            </button>

        </div>
    );
}

export default ReservationButton;