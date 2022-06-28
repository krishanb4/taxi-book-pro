import "../../styles/booking-style.css"
import React, {useCallback} from "react";
import {useService} from "react-service-locator";
import {RecaptchaService} from "../../services/recaptcha-service";
import {ReservationService} from "../../services/reservation-service";
import {useNavigate} from "react-router-dom";

export const PriceBanner = (params: any) => {
    const recaptchaService = useService(RecaptchaService);
    const reservationService = useService(ReservationService);
    const navigate = useNavigate();

    const gotoHomePage = useCallback(() => navigate(`/`, {
        replace: true
    }), [navigate]);

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
                            disabled={recaptchaService.isTokenExpired()} onClick={async (e) => {
                        e.preventDefault();
                        const success = await reservationService.onSecondPageSubmit();
                        if (!success) return;
                        gotoHomePage();
                    }}>Submit
                        Reservation
                    </button>
                </div>
            </div>
        </div>
    );
}
