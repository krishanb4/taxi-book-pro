import React, {useCallback} from "react";
import '../../styles/booking-style.css';
import '../../styles/second-page.scss';
import {collection} from 'firebase/firestore';
import {useCollection,} from 'react-firebase-hooks/firestore';
import {db} from "../../config/firebase-config";
import {useService} from "react-service-locator";
import {BookingService} from "../../services/booking-service";
import NoteBanner from "../banners/NoteBanner";
import OldPriceBanner from "../banners/OldPriceBanner";
import RecaptchaItem from "../items/RecaptchaItem";
import {useNavigate} from "react-router-dom";
import {MainNavbar} from "../banners/MainNavbar";

const OldSecondPage = (props: any) => {

    const navigate = useNavigate();
    const gotoHomePage = useCallback(() => navigate(`/`, {
        replace: false
    }), [navigate]);

    const bookingService = useService(BookingService);

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
        bookingService.createBooking().then(r => {
            console.log("Submitted Booking..");
            gotoHomePage();
        });
    }

    return (
        <div className={'second-page'}>
            <section className="nav-bar-main">
                <section className="nav-bar-main">
                    <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
                </section>
            </section>

            {/* Forms */}
            <form id={"booking-details-arrival"} onSubmit={(e) => {
                sendDoc();
                clear(e);
            }}>
                <section className="forms-main">
                    {/* Note Banner */}
                    <NoteBanner/>
                    <div className="container">
                        {props.children}
                    </div>
                </section>
            </form>

            <section className="travel-fare-banner text-center fare-section">
                <RecaptchaItem/>
                <OldPriceBanner formId={"booking-details-arrival"}/>
            </section>
        </div>
    );

}

export default OldSecondPage;
