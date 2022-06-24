import React, {useCallback, useEffect} from "react";
import '../styles/detailed-form.css';
import {collection} from 'firebase/firestore';
import {useCollection,} from 'react-firebase-hooks/firestore';
import {db} from "../../config/firebase-config";
import {useService} from "react-service-locator";
import {BookingService} from "../../services/booking-service";
import {StateService} from "../../services/state-service";
import data from "../../data/data.json"
import NoteBanner from "../banners/NoteBanner";
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import DepartureDetailsForm from "../forms/DepartureDetailsForm";
import PriceBanner from "../banners/PriceBanner";
import RecaptchaItem from "../items/RecaptchaItem";
import ReservationButton from "../items/ReservationButton";
import {useNavigate} from "react-router-dom";

const Departure = () => {

    const navigate = useNavigate();
    const gotoHomePage = useCallback(() => navigate(`/`, {
        replace: false
    }), [navigate]);

    useEffect(()=>{
    },[])

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
                            <h1 className="titleBooking">Booking (Departure)</h1>
                        </div>
                        <div>
                            <p><a href="src/components/pages/Departure#" className="btn-home">Home</a> / Booking</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Note Banner */}
            <NoteBanner/>

            {/* Forms */}
            <form id={"booking-details-departure"} onSubmit={(e) => {
                sendDoc();
                clear(e);
            }}>
                <section className="forms-main">
                    <div className="container p-5">
                        <div className="row g-4">
                            <PersonalDetailsForm/>
                            <DepartureDetailsForm/>
                        </div>
                    </div>
                </section>
            </form>

            <section className="travel-fare-banner  text-center">
                <PriceBanner/>
                <RecaptchaItem/>
                <ReservationButton formId={"booking-details-departure"}/>
            </section>
        </div>
    );


}

export default Departure;