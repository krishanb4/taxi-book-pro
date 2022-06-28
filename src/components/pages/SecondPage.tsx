import React from "react";
import '../../styles/booking-style.css';
import '../../styles/second-page.scss';
import NoteBanner from "../banners/NoteBanner";
import RecaptchaItem from "../items/RecaptchaItem";
import {MainNavbar} from "../banners/MainNavbar";
import {PriceBanner} from "../banners/PriceBanner";
import {BusyOverlay} from "../BusyOverlay";
import {useService} from "react-service-locator";
import {ReservationService} from "../../services/reservation-service";

export const SecondPage = (props: any) => {
    const reservationService = useService(ReservationService);
    return (
        <div className={'second-page'}>
            <section className="nav-bar-main">
                <section className="nav-bar-main">
                    <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
                </section>
            </section>

            <section className="forms-main">
                <NoteBanner/>
                <div className="container">
                    {props.children}
                </div>
            </section>

            <BusyOverlay isBusy={reservationService.state.isSubmitting} text={'Submitting Reservation'}>
                <section className="travel-fare-banner text-center fare-section">
                    <RecaptchaItem/>
                    <PriceBanner/>
                </section>
            </BusyOverlay>
        </div>
    );

}

