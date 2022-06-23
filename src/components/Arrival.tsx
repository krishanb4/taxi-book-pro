import React, {useEffect, useRef} from "react";
import './detailed-form.css';
import {collection} from 'firebase/firestore';
import {useCollection,} from 'react-firebase-hooks/firestore';
import {db} from "../config/firebase-config";
import {useService} from "react-service-locator";
import {BookingService} from "../services/booking-service";
import {StateService} from "../services/state-service";
import data from "../data/data.json"
import NoteBanner from "./NoteBanner";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import ArrivalDetailsForm from "./forms/ArrivalDetailsForm";

const Arrival = (params: any) => {

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
                            <p><a href="#" className="btn-home">Home</a> / Booking</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Note Banner */}
            <NoteBanner></NoteBanner>

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
                <div className="container pt-5">
                    <h1>
                        Your Travel Fare is <span className="fare">€ {bookingService.arrivalBookingDetails.getCost()}</span>
                    </h1>
                    <div className="lead">
                        Night Time Charge (Between 22:00 and 06:00) : € 15
                    </div>
                </div>
                <div className="btn-reservation py-5">
                    <button type="submit" form={"booking-details-arrival"} className="btn btn-reservation-button">Submit
                        Reservation
                    </button>
                </div>
            </section>
        </div>
    );


}

export default Arrival;