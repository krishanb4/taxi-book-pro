import React, {useCallback, useEffect, useState} from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './short-form.css'
import {useService} from "react-service-locator";
import {StateService} from "../services/state-service";
import {JourneyType} from "../enums/journey-type";
import {BookingService} from "../services/booking-service";
import data from "../data/data.json"
import Helpers from "../utils/helpers";
import {useNavigate} from "react-router-dom";
import {findPrice2} from "../data/json/fakePriceFinder";

const ShortForm = () => {
    const navigate = useNavigate();
    const stateService = useService(StateService);
    const bookingService = useService(BookingService);
    const [journeyType, setJourneyType] = useState<JourneyType>(bookingService.arrivalBookingDetails.getJourneyType());
    const [price, setPrice] = useState<string>("0");
    const [adultCount, setAdultCount] = useState<number>(1);
    const [kidsCount, setKidsCount] = useState<number>(0);
    const [buttonState, setButtonState] = useState<boolean>(true);

    useEffect(() => {
        bookingService.personalDetails.setAdultCount(adultCount);
    }, []);

    const gotoArrivalPage = useCallback(() => navigate(`/arrival`, {
        replace: false
    }), [navigate]);
    const gotoDeparturePage = useCallback(() => navigate(`/departure`, {
        replace: false
    }), [navigate]);
    const gotoRoundTripPage = useCallback(() => navigate(`/round-trip`, {
        replace: false
    }), [navigate]);

    const radios = [
        {name: 'Arrival', value: JourneyType.ARRIVAL_ONE_WAY},
        {name: 'Departure', value: JourneyType.DEPARTURE},
        {name: 'Round Trip', value: JourneyType.ROUND_TRIP},
    ];

    function clear(event: any) {
        event.preventDefault();
    }

    async function fetchPrice() { // TODO - fetch prices separately for arrival and departure
        if (Helpers.validationBeforeFetchPrice(bookingService.arrivalBookingDetails, bookingService.personalDetails) ||
            Helpers.validationBeforeFetchPrice(bookingService.departureBookingDetails, bookingService.personalDetails)) {
            let p: any;
            if (bookingService.arrivalBookingDetails.isBooked()) {
                p = findPrice2(bookingService.arrivalBookingDetails, bookingService.personalDetails, bookingService);
            } else {
                p = findPrice2(bookingService.departureBookingDetails, bookingService.personalDetails, bookingService);
            }

            if (p === undefined) {
                setPrice("Price cannot display at this moment");
            } else {
                if (bookingService.arrivalBookingDetails.isBooked() && bookingService.departureBookingDetails.isBooked()) {
                    bookingService.arrivalBookingDetails.setCost(parseInt(p.replace("€ ", "")))
                    bookingService.departureBookingDetails.setCost(parseInt(p.replace("€ ", "")))
                } else if (bookingService.arrivalBookingDetails.isBooked()) {
                    bookingService.arrivalBookingDetails.setCost(parseInt(p.replace("€ ", "")))
                } else {
                    bookingService.departureBookingDetails.setCost(parseInt(p.replace("€ ", "")))
                }
                setPrice(p);
            }
            setButtonState(false);
        } else {
            setPrice("0");
            console.log("Didnt fetch");
        }
    }

    return (
        <div>
            <section className="form">
                <div className="container p-5">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link" id="nav-home-tab" data-bs-toggle="tab" defaultChecked={true}
                                    onClick={async () => {
                                        setJourneyType(JourneyType.ARRIVAL_ONE_WAY);
                                        bookingService.setJourneyType(JourneyType.ARRIVAL_ONE_WAY);
                                        bookingService.arrivalBookingDetails.setBookStatus(true);
                                        await fetchPrice();
                                    }}
                                    data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                                    aria-selected="true">ARRIVAL
                            </button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab"
                                    onClick={async () => {
                                        setJourneyType(JourneyType.DEPARTURE);
                                        bookingService.setJourneyType(JourneyType.DEPARTURE);
                                        bookingService.departureBookingDetails.setBookStatus(true);
                                        await fetchPrice();
                                    }}
                                    data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                                    aria-selected="false">DEPARTURE
                            </button>
                            <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab"
                                    onClick={async () => {
                                        setJourneyType(JourneyType.ROUND_TRIP);
                                        bookingService.setJourneyType(JourneyType.ROUND_TRIP);
                                        bookingService.arrivalBookingDetails.setBookStatus(true);
                                        bookingService.departureBookingDetails.setBookStatus(true);
                                        await fetchPrice();
                                    }}
                                    data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact"
                                    aria-selected="false">ROUND TRIP
                            </button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                             aria-labelledby="nav-home-tab" tabIndex={0}>

                        </div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel"
                             aria-labelledby="nav-profile-tab"
                             tabIndex={0}>

                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                             aria-labelledby="nav-contact-tab"
                             tabIndex={0}>

                        </div>
                        <div className="container">
                            <div className="row g-4">
                                <div className="col-md py-3">
                                    <p className="subTitles">PICKUP FROM</p>
                                    <select className="form-select" defaultValue={"SELECTED"}
                                            aria-label="Default select example" onChange={async (e) => {
                                        if (bookingService.getJourneyType() === JourneyType.DEPARTURE) {
                                            bookingService.departureBookingDetails.setPickUpPoint(e.target.value);
                                        } else {
                                            bookingService.arrivalBookingDetails.setPickUpPoint(e.target.value);
                                        }
                                        await fetchPrice();
                                    }}>
                                        <option value={"SELECTED"} disabled={true}>Select Drop Place...</option>
                                        {data.locations.map((item, key) => {
                                            return (<option value={item} key={item}>{item}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="col-md py-3">
                                    <p className="subTitles">DROP TO</p>
                                    <select className="form-select" defaultValue={"SELECTED"}
                                            aria-label="Default select example" onChange={async (e) => {
                                        if (bookingService.getJourneyType() === JourneyType.DEPARTURE) {
                                            bookingService.departureBookingDetails.setDropPoint(e.target.value);
                                        } else {
                                            bookingService.arrivalBookingDetails.setDropPoint(e.target.value);
                                        }
                                        await fetchPrice();
                                    }}>
                                        <option value={"SELECTED"} disabled={true}>Select Drop Place...</option>
                                        {data.locations.map((item, key) => {
                                            return (<option value={item} key={item}>{item}</option>)
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-md py-3">
                                    <p className="subTitles">ADULTS</p>
                                    <select className="form-select" aria-label="Default select example"
                                            onChange={async (e) => {
                                                setAdultCount(parseInt(e.target.value));
                                                bookingService.personalDetails.setAdultCount(parseInt(e.target.value));
                                                await fetchPrice();
                                            }}>
                                        {data.adultCounts.map((item, key) => {
                                            return (<option value={item} key={item}>{item}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="col-md py-3">
                                    <p className="subTitles">KIDS</p>
                                    <select className="form-select" aria-label="Default select example"
                                            onChange={async (e) => {
                                                setKidsCount(parseInt(e.target.value));
                                                bookingService.personalDetails.setChildCount(parseInt(e.target.value));
                                                await fetchPrice();
                                            }}>
                                        {data.kidCounts.map((item, key) => {
                                            return (<option value={item} key={item}>{item}</option>)
                                        })}
                                    </select>
                                </div>
                            </div>
                            <h5 className="text-center py-3 formEnd">Please choose your Pickup Place and
                                Destination!</h5>
                            <h5 className="text-center py-3 formEnd">Your Travel Fare: {price}</h5>
                            <div className="btn-book">
                                <button type="button" className="btn btn-light" disabled={buttonState} onClick={(e) => {
                                    if (bookingService.journeyType === JourneyType.DEPARTURE) {
                                        gotoDeparturePage();
                                    } else if (bookingService.journeyType === JourneyType.ARRIVAL_ONE_WAY) {
                                        gotoArrivalPage();
                                    } else {
                                        gotoRoundTripPage();
                                    }
                                }}>
                                    Book My Transfer Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    );
}

export default ShortForm;