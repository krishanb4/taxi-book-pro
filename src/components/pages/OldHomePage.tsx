import React, {useCallback, useEffect, useState} from "react";
import '../../styles/style.scss'
import {useService} from "react-service-locator";
import {JourneyType} from "../../enums/journey-type";
import {BookingService} from "../../services/booking-service";
import data from "../../data/data.json"
import Helpers from "../../utils/helpers";
import {useNavigate} from "react-router-dom";
import {MainNavbar} from "../banners/MainNavbar";
import {UiService} from "../../services/ui-service";

const OldHomePage = () => {
    const navigate = useNavigate();
    const bookingService = useService(BookingService);
    const uiService = useService(UiService);
    const [journeyType, setJourneyType] = useState<JourneyType>(bookingService.arrivalBookingDetails.getJourneyType());
    const [priceMessage, setPriceMessage] = useState<string>("€ 0");
    const [isPriceLoading, setIsPriceLoading] = useState<boolean>(false);

    useEffect(() => {
        bookingService.personalDetails.setAdultCount(bookingService.personalDetails.getAdultCount());
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
        fetchPrice().then();
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
            setPriceMessage("N/A");
            setIsPriceLoading(false);
        } else {
            setPriceMessage(priceStr);
            setIsPriceLoading(false);
        }
        console.log(priceStr);
    }

    async function onBookNowClick(e: any) {
        const isDataValid = bookingService.validateInitialData();
        if (!isDataValid) {
            await uiService.addMessageAlert({
                title: 'Cannot proceed!',
                subtitle: 'Please complete booking details before continuing.'
            });
            return;
        }
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
        setJourneyType(mode);
        bookingService.setJourneyType(mode);
        if(mode===JourneyType.ARRIVAL_ONE_WAY){
            bookingService.arrivalBookingDetails.setBookStatus(true);
            bookingService.departureBookingDetails.setBookStatus(false);
        }else if(mode===JourneyType.DEPARTURE){
            bookingService.arrivalBookingDetails.setBookStatus(false);
            bookingService.departureBookingDetails.setBookStatus(true);
        }else{
            bookingService.arrivalBookingDetails.setBookStatus(true);
            bookingService.departureBookingDetails.setBookStatus(true);
        }

        await fetchPrice();
    }

    function buildModeButton(mode: JourneyType, title: string, image: string) {
        return <button className={"nav-link nav-mode-tab" + (bookingService.state.journeyType===mode?" active":"")} data-bs-toggle="tab"
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
                <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
            </section>

            <section className="form">
                <div className="container py-5">
                    <div className={'d-flex'}>
                        <img src={require("../../assets/logos/ppt-logo.png")} alt="pdtlogo"
                             className="pb-5 logo m-auto"/></div>
                    <br/><br/><br/><br/>
                    <div className="tab-content home-form">
                        <div className="home-form-outer">
                            <div className={'home-form-header-bar'}>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    {buildModeButton(JourneyType.ARRIVAL_ONE_WAY, 'Arrival', '/assets/road.svg')}
                                    {buildModeButton(JourneyType.DEPARTURE, 'Departure', '/assets/plane.svg')}
                                    {buildModeButton(JourneyType.ROUND_TRIP, 'Round Trip', '/assets/van.svg')}
                                </div>
                            </div>
                            <div className={'home-form-inner'}>
                                <div className="row g-4 mt-2">
                                    <div className="col-md py-3">
                                        <p className="subTitles">Pickup Location</p>
                                        <select className="form-select" defaultValue={"SELECTED"}
                                                aria-label="Default select example" onChange={async (e) => {
                                            if (bookingService.getJourneyType() === JourneyType.DEPARTURE) {
                                                bookingService.departureBookingDetails.setPickUpPoint(e.target.value);
                                            } else if(bookingService.getJourneyType() === JourneyType.ARRIVAL_ONE_WAY){
                                                bookingService.arrivalBookingDetails.setPickUpPoint(e.target.value);
                                            }else{
                                                bookingService.arrivalBookingDetails.setPickUpPoint(e.target.value);
                                                bookingService.departureBookingDetails.setDropPoint(e.target.value);
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
                                            } else if (bookingService.getJourneyType() === JourneyType.ARRIVAL_ONE_WAY){
                                                bookingService.arrivalBookingDetails.setDropPoint(e.target.value);
                                            }else{
                                                bookingService.arrivalBookingDetails.setDropPoint(e.target.value);
                                                bookingService.departureBookingDetails.setPickUpPoint(e.target.value);
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
                                                defaultValue={bookingService.personalDetails.getAdultCount()}
                                                onChange={async (e) => {
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
                                                defaultValue={bookingService.personalDetails.getChildCount()}
                                                onChange={async (e) => {
                                                    bookingService.personalDetails.setChildCount(parseInt(e.target.value));
                                                    await fetchPrice();
                                                }}>
                                            {data.kidCounts.map((item, key) => {
                                                return (<option value={item} key={item}>{item}</option>)
                                            })}
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className="home-form-footer-bar">
                                <div className="home-form-footer-bar-inner">
                                    <div className={"text-center travel-fare-group"}>
                                        <div>Your Travel Fare - <span className={"price"}> {priceMessage} </span></div>
                                    </div>
                                    <button type="button" className="btn booknow-btn"
                                            disabled={isPriceLoading} onClick={onBookNowClick}>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    );
}

export default OldHomePage;
