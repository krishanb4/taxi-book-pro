import React, {useCallback} from "react";
import '../../styles/booking-style.css';
import '../../styles/second-page.scss';
import {collection} from 'firebase/firestore';
import {useCollection,} from 'react-firebase-hooks/firestore';
import {db} from "../../config/firebase-config";
import {useService} from "react-service-locator";
import NoteBanner from "../banners/NoteBanner";
import RecaptchaItem from "../items/RecaptchaItem";
import {useNavigate} from "react-router-dom";
import {MainNavbar} from "../banners/MainNavbar";
import {ReservationService} from "../../services/reservation-service";
import {PriceBanner} from "../banners/PriceBanner";

export const SecondPage = (props: any) => {

    const reservationService = useService(ReservationService);
    const navigate = useNavigate();
    const gotoHomePage = useCallback(() => navigate(`/`, {
        replace: false
    }), [navigate]);

    const [value, loading, error] = useCollection(
        collection(db, 'bookings'),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );

    function clear(event: any) {
        event.preventDefault();
        event.target.reset();
    }

    function sendDoc() {
        console.log("Submit booking..");
    }

    return (
        <div className={'second-page'}>
            <section className="nav-bar-main">
                <section className="nav-bar-main">
                    <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
                </section>
            </section>

            <section className="forms-main">
                {/* Note Banner */}
                <NoteBanner/>
                <div className="container">
                    {props.children}
                </div>
            </section>

            <section className="travel-fare-banner text-center fare-section">
                <RecaptchaItem/>
                <PriceBanner onClick={() => reservationService.submitReservation}
                             formId={undefined}/>
            </section>
        </div>
    );

}

