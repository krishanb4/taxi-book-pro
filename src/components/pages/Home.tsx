import React, {useCallback, useEffect, useState} from "react";
import '../../styles/style.scss'
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
    const [priceMessage, setPriceMessage] = useState<string>("€ 0");
    const [adultCount, setAdultCount] = useState<number>(1);
    const [kidsCount, setKidsCount] = useState<number>(0);
    const [isPriceLoading, setIsPriceLoading] = useState<boolean>(false);

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

    // TODO - fetch prices separately for arrival and departure
    async function fetchPrice() {
        setIsPriceLoading(true);
        let priceStr = await Helpers.fetchPrice(bookingService);
        if (priceStr === undefined) {
            setPriceMessage("€ 0");
            setIsPriceLoading(false);
        } else {
            setPriceMessage(priceStr);
            setIsPriceLoading(false);
        }
    }

    function onBookNowClick(e: any) {
        e.preventDefault();
        if (bookingService.journeyType === JourneyType.DEPARTURE) {
            gotoDeparturePage();
        } else if (bookingService.journeyType === JourneyType.ARRIVAL_ONE_WAY) {
            gotoArrivalPage();
        } else {
            gotoRoundTripPage();
        }
    }

    async function onModeSelect(mode: JourneyType) {
        bookingService.resetBookingDetails();
        setJourneyType(mode);
        bookingService.setJourneyType(mode);
        bookingService.arrivalBookingDetails.setBookStatus(true);
        bookingService.departureBookingDetails.setBookStatus(false);
        await fetchPrice();
    }

    function buildModeButton(mode: JourneyType, title: string, image: string) {
        return <button className={"nav-link nav-mode-tab"} data-bs-toggle="tab"
                       onClick={async (e) => {
                           e.preventDefault();
                           await onModeSelect(mode);
                       }}
                       data-bs-target="#nav-arrival" type="button" role="tab" aria-controls="nav-home"
                       aria-selected="true">
            <div className="col-md nav-mode-img"><img className={"form-btn-svg"} src={image}
                                                      alt=""/></div>
            <div className="col-md nav-mode-label">{title}</div>
        </button>;
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

            <section className="form">
                <div className="container p-5">
                    <img src={require("../../assets/images/pdt-logo-temp.png")} alt="pdtlogo" className="pb-5 logo"/>
                    <br/><br/><br/><br/>
                    <div className="tab-content home-form p-5">
                        <div className="container" style={{marginBottom: -100, marginTop: -140}}>
                            <div className="nav nav-tabs form-btn-main" id="nav-tab" role="tablist">
                                {buildModeButton(JourneyType.ARRIVAL_ONE_WAY, 'Arrival', '/assets/road.svg')}
                                {buildModeButton(JourneyType.DEPARTURE, 'Arrival', '/assets/plane.svg')}
                                {buildModeButton(JourneyType.ROUND_TRIP, 'Arrival', '/assets/van.svg')}
                            </div>
                            <div className="row g-4 mt-2">
                                <div className="col-md py-3">
                                    <p className="subTitles">Pickup Location</p>
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
                                    <p className="subTitles">Drop-off Location</p>
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
                                    <p className="subTitles">Adult Riders</p>
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
                                    <p className="subTitles">Child</p>
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
                            <div className="p-3 row g-0 travel-fare-group-main">
                                <div className={"p-3 col-md text-center travel-fare-group "}>
                                    <h4>Your Travel Fare -
                                        <span className={"price"}>
                                            {priceMessage}
                                        </span>
                                    </h4>
                                </div>
                                <button type="button" className="col-md p-3 btn booknow-btn"
                                        disabled={isPriceLoading} onClick={onBookNowClick}>
                                    Book Now
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
