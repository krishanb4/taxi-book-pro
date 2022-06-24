import React, {useCallback, useEffect} from "react";
import '../styles/detailed-form.css';
import {collection} from 'firebase/firestore';
import {useCollection,} from 'react-firebase-hooks/firestore';
import {db} from "../../config/firebase-config";
import {useService} from "react-service-locator";
import {BookingService} from "../../services/booking-service";
import NoteBanner from "../banners/NoteBanner";
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import DepartureDetailsForm from "../forms/DepartureDetailsForm";
import ArrivalDetailsForm from "../forms/ArrivalDetailsForm";
import PriceBanner from "../banners/PriceBanner";
import RecaptchaItem from "../items/RecaptchaItem";
import ReservationButton from "../items/ReservationButton";
import {useNavigate} from "react-router-dom";

const RoundTrip = () => {

    const navigate = useNavigate();
    const gotoHomePage = useCallback(() => navigate(`/`, {
        replace: false
    }), [navigate]);

    useEffect(() => {
    }, [])

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
        <div>
            {/* Title Bar */}
            <section className="bg-dark text-light p-3">
                <div className="container">
                    <div className="titleBar">
                        <div>
                            <h1 className="titleBooking">Booking (Round Trip)</h1>
                        </div>
                        <div>
                            <p><a href="src/components/pages/RoundTrip#" className="btn-home">Home</a> / Booking</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Note Banner */}
            <NoteBanner/>

            {/* Forms */}
            <form id={"booking-details-round-trip"} onSubmit={(e) => {
                sendDoc();
                clear(e);
            }}>
                <section className="forms-main">
                    <div className="container p-5">
                        <div className="row g-4">
                            <PersonalDetailsForm/>
                            <ArrivalDetailsForm/>
                        </div>
                        <div className="row g-4 row-cols-2">
                            <div>

                            </div>
                            <DepartureDetailsForm/>
                        </div>

                    </div>
                </section>
            </form>

            <section className="travel-fare-banner  text-center">
                <PriceBanner/>
                <RecaptchaItem/>
                <ReservationButton formId={"booking-details-round-trip"}/>
            </section>
        </div>
    );


}

export default RoundTrip;