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
import {Col, Container, Image, Row} from "react-bootstrap";

export const HomePage = () => {
    const reservationService = useService(ReservationService);
    const uiService = useService(UiService);
    const navigate = useNavigate();

    const gotoArrivalPage = useCallback(() => navigate(`/arrival`, {
        replace: false
    }), [navigate]);
    const gotoDeparturePage = useCallback(() => navigate(`/departure`, {
        replace: false
    }), [navigate]);
    const gotoRoundTripPage = useCallback(() => navigate(`/round-trip`, {
        replace: false
    }), [navigate]);

    useEffect(() => {
        reservationService.syncSecondPageDataToHomePage();
    }, [])

    async function onBookNowClick(e: any) {
        e.preventDefault();

        await reservationService.homeFormHook.handleSubmit((data) => {
            const isValid = reservationService.validateHomeForm();
            if (!isValid) {
                uiService.addMessageAlert({
                    title: 'Invalid Trip Information',
                    subtitle: 'Please correctly fill the trip details before continuing.',
                })
                return;
            }
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


    function buildServiceItem() {
        return <Col className={'service-item'}>
            <Image src={require('../../assets/icons/service-icon-1.png')}></Image>
            <h5>Efficient</h5>
            <p>Our service is highly focused on your satisfaction thus we provide flawless journey.</p>
        </Col>;
    }

    function buildPackageItem() {
        return <Col>
            <div className={'package-item'}>
                <Image src={require('../../assets/thumbnails/package-thumb-1.png')}></Image>
                <div className="content-box">
                    <h5 className={'item-title'}>Efficient</h5>
                    <p>Our service is highly focused on your satisfaction thus we provide flawless journey.</p>
                    <div className="price-box">
                        50$
                    </div>
                </div>
            </div>
        </Col>;
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
                             className="pb-5 logo m-auto"/>
                    </div>
                    <p className={'text-white'} style={{
                        paddingBottom: 120
                    }}>
                        'Disney Paris Transfer' is a private transfer service approved by the French Government. It
                        is renowned for being one of the friendliest and most cost-effective airport shuttle around.
                        We provide transport services to and from Charles de Gaulle Roissy (CDG), Orly (ORY), le
                        Bourget (LBG), Beauvals Airport (BVA), Disneyland and from your hotel, office or house in
                        France.
                    </p>
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
                                                <option value={'NONE'}>Select Pickup Place...</option>
                                                {data.locations.map((item, key) => {
                                                    return (<option value={item} key={item}>{item}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md py-3">
                                            <p className="subTitles">Drop-off Location</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...reservationService.homeFormHook.register('dropPoint')}>
                                                <option value={'NONE'}>Select Drop Place...</option>
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
            <section className={'home-content'}>
                <Container>
                    <Row>
                        <h3 className={'pb-4'}>OUR SERVICE</h3>
                        <Row>
                            {buildServiceItem()}
                            {buildServiceItem()}
                            {buildServiceItem()}
                            {buildServiceItem()}
                            {buildServiceItem()}
                        </Row>
                    </Row>
                    <Row className={'pt-5'}>
                        <h3 className={'pb-4'}>Special Packages</h3>
                        <Row>
                            {buildPackageItem()}
                            {buildPackageItem()}
                            {buildPackageItem()}
                            {buildPackageItem()}
                            {buildPackageItem()}
                        </Row>
                    </Row>
                </Container>
            </section>
        </div>


    );
}

