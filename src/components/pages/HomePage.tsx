import React, {useCallback, useEffect} from "react";
import '../../styles/style.scss'
import {useService} from "react-service-locator";
import {JourneyType} from "../../enums/journey-type";
import data from "../../data/data.json"
import {MainNavbar} from "../banners/MainNavbar";
import {ReservationService} from "../../services/reservation-service";
import {TripProcessor} from "../../data/json/trip-processor";
import {useNavigate} from "react-router-dom";
import {UiService} from "../../services/ui-service";

export const HomePage = () => {
    const reservationService = useService(ReservationService);
    const uiService = useService(UiService);
    const navigate = useNavigate();

    const gotoArrivalPage = useCallback(() => navigate(`/reroutearrival`, {
        replace: false
    }), [navigate]);
    const gotoDeparturePage = useCallback(() => navigate(`/reroutedeparture`, {
        replace: false
    }), [navigate]);
    const gotoRoundTripPage = useCallback(() => navigate(`/rerouteround-trip`, {
        replace: false
    }), [navigate]);

    useEffect(() => {
        reservationService.syncSecondPageDataToHomePage();
    }, [])

    async function onBookNowClick(e: any) {
        e.preventDefault();

        await reservationService.homeFormHook.handleSubmit((data) => {
            reservationService.syncHomeDataToSecondPageData();
            if (reservationService.state.journeyType === JourneyType.DEPARTURE) {
                gotoDeparturePage();
            } else if (reservationService.state.journeyType === JourneyType.ARRIVAL_ONE_WAY) {
                gotoArrivalPage();
            } else {
                gotoRoundTripPage();
            }
        })();
    }

    async function onModeSelect(mode: JourneyType) {
        await TripProcessor.findPrice(reservationService.state.homeFormData, reservationService.state.journeyType);
    }

    async function selectMode(mode: JourneyType) {
        reservationService.setJourneyType(mode);
        await onModeSelect(mode);
    }

    function buildModeButton(mode: JourneyType, title: string, image: string) {
        let isActive = reservationService.state.journeyType === mode;
        return <button
            className={"nav-link nav-mode-tab" + (isActive ? " active" : "")}
            data-bs-toggle="tab"
            onClick={async (e) => {
                e.preventDefault();
                await selectMode(mode);
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
                    <form>
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
                                            <select className="form-select"
                                                    aria-label="Default select example" {...reservationService.homeFormHook.register('pickUpPoint')} >
                                                <option disabled={true}>Select Drop Place...</option>
                                                {data.locations.map((item, key) => {
                                                    return (<option value={item} key={item}>{item}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md py-3">
                                            <p className="subTitles">Drop-off Location</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...reservationService.homeFormHook.register('dropPoint')}>
                                                <option disabled={true}>Select Drop Place...</option>
                                                {data.locations.map((item, key) => {
                                                    return (<option value={item} key={item}>{item}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-md py-3">
                                            <p className="subTitles">Adult Riders</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...reservationService.homeFormHook.register('adultCount')}>
                                                {data.adultCounts.map((item, key) => {
                                                    return (<option value={item} key={item}>{item}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md py-3">
                                            <p className="subTitles">Child</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...reservationService.homeFormHook.register('childCount')}>
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
                                            <div>Your Travel Fare - <span
                                                className={"price"}> {reservationService.homePageTripPrice} </span>
                                            </div>
                                        </div>
                                        <button type="button" className="btn booknow-btn" onClick={onBookNowClick}>
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </section>
        </div>


    );
}

