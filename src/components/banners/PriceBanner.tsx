import "../../styles/booking-style.css"
import React, {useCallback} from "react";
import {useService} from "react-service-locator";
import {RecaptchaService} from "../../services/recaptcha-service";
import {ReservationService} from "../../services/reservation-service";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const PriceBanner = (params: any) => {
    const recaptchaService = useService(RecaptchaService);
    const reservationService = useService(ReservationService);
    const navigate = useNavigate();
    const {t} = useTranslation();

    const gotoHomePage = useCallback(() => navigate(`/`, {
        replace: true
    }), [navigate]);

    return (
        <div className="price-info-bar">
            <div className="container fare-main">
                <div className="row g-4">
                    <div className="col-md">
                        <span
                            className="your-travel-fare">{t('travel-fare-is')} - {reservationService.secondPageTripPrice}<span
                            className="fare">{}</span></span><br/>
                        <span className="nighttime-charge">{t('night-charge-notice')}</span>
                    </div>
                    <button type="button" className="btn btn-reservation-button"
                            disabled={recaptchaService.isTokenExpired()} onClick={async (e) => {
                        e.preventDefault();
                        const success = await reservationService.onSecondPageSubmit();
                        if (!success) return;
                        gotoHomePage();
                    }}>{t('submit-reservation')}</button>
                </div>
            </div>
        </div>
    );
}
