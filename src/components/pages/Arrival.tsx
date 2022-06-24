import React, {useEffect} from "react";
import '../styles/detailed-form.css';
import {collection} from 'firebase/firestore';
import {useCollection,} from 'react-firebase-hooks/firestore';
import {db} from "../../config/firebase-config";
import {useService} from "react-service-locator";
import {BookingService} from "../../services/booking-service";
import NoteBanner from "../banners/NoteBanner";
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import ArrivalDetailsForm from "../forms/ArrivalDetailsForm";
import PriceBanner from "../banners/PriceBanner";
import RecaptchaItem from "../items/RecaptchaItem";
import ReservationButton from "../items/ReservationButton";

const Arrival = (params: any) => {

    const bookingService = useService(BookingService);

    const [value, loading, error] = useCollection(
        collection(db, 'bookings'),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );

    useEffect(() => {
    }, [])

    function clear(event: any) {
        event.preventDefault();
        event.target.reset();
    }

    function sendDoc() {
        bookingService.createBooking().then(r => {
            console.log("Created Doc");
        });
    }

    return (
        <div>
            {/* Title Bar */}
            <section className="bg-dark text-light p-3">
                <div className="container">
                    <div className="titleBar">
                        <div>
                            <h1 className="titleBooking">Booking (Arrival)</h1>
                        </div>
                        <div>
                            <p><a href="/" className="btn-home">Home</a> / Booking</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Note Banner */}
            <NoteBanner/>

            {/* Forms */}
            <form id={"booking-details-arrival"} onSubmit={(e) => {
                sendDoc();
                clear(e);
            }}>
                <section className="forms-main">
                    <div className="container p-5">
                        <div className="row g-4">
                            <PersonalDetailsForm/>
                            <ArrivalDetailsForm/>
                        </div>
                    </div>
                </section>
            </form>

            <section className="travel-fare-banner  text-center">
                <PriceBanner/>
                <RecaptchaItem/>
                <ReservationButton formId={"booking-details-arrival"}/>
            </section>

        </div>
    );

}

export default Arrival;