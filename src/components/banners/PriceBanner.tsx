import "../../styles/booking-style.css"
import React from "react";
import {useService} from "react-service-locator";
import {RecaptchaService} from "../../services/recaptcha-service";
import {ReservationService} from "../../services/reservation-service";

export const PriceBanner = (params: any) => {
    const recaptchaService = useService(RecaptchaService);
    const reservationService = useService(ReservationService);

    return (
        <div className="price-info-bar">
            <div className="container fare-main">
                <div className="row g-4">
                    <div className="col-md">
                        <span
                            className="your-travel-fare">Your Travel Fare is - {reservationService.secondPageTripPrice}<span
                            className="fare">{}</span></span><br/>
                        <span className="nighttime-charge">Night Time Charge (Between 22:00 and 06:00) : € 15</span>
                    </div>
                    <button type="button" className="btn btn-reservation-button"
                            disabled={recaptchaService.isTokenExpired()} onClick={(e) => {
                        e.preventDefault();
                        reservationService.onSecondPageSubmit();
                    }}>Submit
                        Reservation
                    </button>
                </div>
            </div>
        </div>
    );
}
