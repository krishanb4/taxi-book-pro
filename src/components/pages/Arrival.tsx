import React, {useCallback} from "react";
import '../../styles/booking-style.css';
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
import {useNavigate} from "react-router-dom";

const Arrival = (params: any) => {

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
        <div>
            <section className="nav-bar-main">
                <div className="container">
                    <div className="navbar navbar-expand-lg">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navmenu">
                            <span className="navbar-toggler-icon navbar-dark"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navmenu">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item nav-item-custom">
                                    <a href="#" className="nav-link nav-link-ex">HOME</a>
                                </li>
                                <li className="nav-item nav-item-custom">
                                    <a href="#" className="nav-link nav-link-ex">BOOK NOW</a>
                                </li>
                                <li className="nav-item nav-item-custom">
                                    <a href="#" className="nav-link nav-link-ex">UPCOMING TRANSFERS</a>
                                </li>
                                <li className="nav-item nav-item-custom">
                                    <a href="#" className="nav-link nav-link-ex">RATES</a>
                                </li>
                                <li className="nav-item nav-item-custom">
                                    <a href="#" className="nav-link nav-link-ex">CONTACT</a>
                                </li>
                            </ul>
                        </div>
                        <form className="d-flex" role="search">
                            <button className="btn signup-btn" type="submit">SIGN UP</button>
                        </form>
                    </div>
                </div>
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
                        <div className="row">
                            <PersonalDetailsForm/>
                            <ArrivalDetailsForm/>
                        </div>
                    </div>
                </section>
            </form>

            <section className="travel-fare-banner  text-center">
                <RecaptchaItem/>
                <PriceBanner formId={"booking-details-arrival"}/>
            </section>
        </div>
    );

}

export default Arrival;
