import "../../styles/booking-style.css"
import React from "react";
import {useService} from "react-service-locator";
import {RecaptchaService} from "../../services/recaptcha-service";

export const PriceBanner = (params: { formId: string | undefined; onClick: () => {} }) => {
    const recaptchaService = useService(RecaptchaService);

    return (
        <div className="price-info-bar">
            <div className="container fare-main">
                <div className="row g-4">
                    <div className="col-md">
                        <span className="your-travel-fare">Your Travel Fare is <span
                            className="fare">{}</span></span><br/>
                        <span className="nighttime-charge">Night Time Charge (Between 22:00 and 06:00) : € 15</span>
                    </div>
                    <button type="button" form={params.formId} className="btn btn-reservation-button"
                            disabled={recaptchaService.isTokenExpired()} onClick={(e) => {
                        e.preventDefault();
                        params.onClick();
                    }}>Submit
                        Reservation
                    </button>
                </div>
            </div>
        </div>
    );
}
