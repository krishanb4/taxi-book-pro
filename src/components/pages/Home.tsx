import React, {useCallback, useEffect, useState} from "react";
import '../styles/short-form.css'
import {useService} from "react-service-locator";
import {JourneyType} from "../../enums/journey-type";
import {BookingService} from "../../services/booking-service";
import data from "../../data/data.json"
import Helpers from "../../utils/helpers";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const bookingService = useService(BookingService);
    const [journeyType, setJourneyType] = useState<JourneyType>(bookingService.arrivalBookingDetails.getJourneyType());
    const [priceMessage, setPriceMessage] = useState<string>("");
    const [adultCount, setAdultCount] = useState<number>(1);
    const [kidsCount, setKidsCount] = useState<number>(0);
    const [buttonState, setButtonState] = useState<boolean>(true);

    useEffect(() => {
        bookingService.personalDetails.setAdultCount(adultCount);
        if (bookingService.getJourneyType() === JourneyType.ROUND_TRIP) {
            bookingService.arrivalBookingDetails.setBookStatus(true);
            bookingService.departureBookingDetails.setBookStatus(true);
        } else if (bookingService.getJourneyType() === JourneyType.ARRIVAL_ONE_WAY) {
            bookingService.arrivalBookingDetails.setBookStatus(true);
            bookingService.departureBookingDetails.setBookStatus(false);
        } else {
            bookingService.arrivalBookingDetails.setBookStatus(false);
            bookingService.departureBookingDetails.setBookStatus(true);
        }
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


    function clear(event: any) {
        event.preventDefault();
    }

    // TODO - fetch prices separately for arrival and departure
    async function fetchPrice() {
        let priceStr = await Helpers.fetchPrice(bookingService);
        if (priceStr === undefined) {
            setPriceMessage("Price cannot display at this moment");
        } else {
            setPriceMessage("Your Travel Fare: "+priceStr);
            setButtonState(false);
        }
    }

    return (
        <div>
            <section className="form">
                <div className="container p-5">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link" id="nav-arrival-tab" data-bs-toggle="tab"
                                    onClick={async () => {
                                        bookingService.resetBookingDetails();
                                        setJourneyType(JourneyType.ARRIVAL_ONE_WAY);
                                        bookingService.setJourneyType(JourneyType.ARRIVAL_ONE_WAY);
                                        bookingService.arrivalBookingDetails.setBookStatus(true);
                                        bookingService.departureBookingDetails.setBookStatus(false);
                                        await fetchPrice();
                                    }}
                                    data-bs-target="#nav-arrival" type="button" role="tab" aria-controls="nav-home"
                                    aria-selected="true">ARRIVAL
                            </button>
                            <button className="nav-link" id="nav-departure-tab" data-bs-toggle="tab"
                                    onClick={async () => {
                                        bookingService.resetBookingDetails();
                                        setJourneyType(JourneyType.DEPARTURE);
                                        bookingService.setJourneyType(JourneyType.DEPARTURE);
                                        bookingService.departureBookingDetails.setBookStatus(true);
                                        bookingService.arrivalBookingDetails.setBookStatus(false);
                                        await fetchPrice();
                                    }}
                                    data-bs-target="#nav-departure" type="button" role="tab" aria-controls="nav-profile"
                                    aria-selected="false">DEPARTURE
                            </button>
                            <button className="nav-link" id="nav-round-trip-tab" data-bs-toggle="tab"
                                    onClick={async () => {
                                        bookingService.resetBookingDetails();
                                        setJourneyType(JourneyType.ROUND_TRIP);
                                        bookingService.setJourneyType(JourneyType.ROUND_TRIP);
                                        bookingService.arrivalBookingDetails.setBookStatus(true);
                                        bookingService.departureBookingDetails.setBookStatus(true);
                                        await fetchPrice();
                                    }}
                                    data-bs-target="#nav-round-trip" type="button" role="tab" aria-controls="nav-contact"
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
                            <h5 className="text-center py-3 formEnd">{priceMessage}</h5>
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

export default Home;