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
import {Footer} from "../Footer";

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


    function buildServiceItem(params: {
        image: string,
        title: string,
        subtitle: string,
    }) {
        return <Col lg={2} md={4} xs={6} className={'service-item'}>
            <Image src={params.image}></Image>
            <h5>{params.title}</h5>
            <p>{params.subtitle}</p>
        </Col>;
    }

    function buildPackageItem(params: {
        image: string,
        title: string,
        subtitle: string,
        price: string,
    }) {
        return <Col className={'package-item-col'} xl={3} lg={4} md={6} xs={12}>
            <div className={'package-item'}>
                <Image src={params.image}></Image>
                <div className="content-box">
                    <h5 className={'item-title'}>{params.title}</h5>
                    <p>{params.subtitle}</p>
                </div>
                <div className="price-box-wrapper w-100">
                    <div className="price-box">
                        {params.price}
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
                        'Prestige Paris Transfer' is a private shuttle transfer company approved by the French government.
                        It is reputed to be one of the most user-friendly and cost-effective shuttle transfer services.
                        We provide transport services to and from Charles de Gaulle Roissy (CDG), Orly (ORY), Le Bourget (LBG), Beauvais Airport (BVA), Disneyland and from any where in France.
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
                        <Row className={'justify-content-md-center'}>
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-1.png'),
                                title: 'Efficient',
                                subtitle: 'You will be provided with a faster, comfortable and reliable journey.',
                            })}
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-2.png'),
                                title: 'Worthy',
                                subtitle: 'Best services with affordable prices.',
                            })}
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-3.png'),
                                title: 'Safe Travel',
                                subtitle: 'Safe journey for you and your family.',
                            })}
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-4.png'),
                                title: 'Professional Drivers',
                                subtitle: 'Excellent service with well trained professionals.',
                            })}
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-5.png'),
                                title: 'Customer Support',
                                subtitle: 'Best customer service with well trained customer support staff.',
                            })}
                        </Row>
                    </Row>
                    <Row className={'pt-5'}>
                        <h3 className={'pb-4'}>Special Packages</h3>
                        <Row>
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-2.png'),
                                title: 'CDG TO DISNEYLAND',
                                subtitle: 'Book Prestige Paris Transfer for a comfortable trip from CDG to Disneyland Paris. Amazing offers for single and round trips and you are facilitated with no extra charges for your luggage. Need a visit to Disneyland? Book now!',
                                price: '€70',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-3.png'),
                                title: 'ORLY TO PARIS',
                                subtitle: 'For reliable travel between Orly Airport and Paris, book us now! Prestige Paris Transfer offers you the best service. No extra charges for luggage and no credit cards are required for the booking. You are privileged with the best cost saving offers for single and round trip transfers.',
                                price: '€65',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-4.png'),
                                title: 'ORLY TO DISNEYLAND',
                                subtitle: 'Want a comfortable journey in luxury vehicles? Prestige Paris Transfer is your choice. We ensure a comfortable travel between the ORLY Airport and Disneyland Paris. No extra charges for luggage and you can choose single or round trip transfers. Want to visit Disneyland? Book us now!',
                                price: '€80',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-1.png'),
                                title: 'CDG TO PARIS',
                                subtitle: 'For a fast, reliable journey between CDG and Paris, book Prestige Paris Transfer. You can comfortably travel in our luxury vehicles and you can have your luggage without any extra charges. We will give you the best offers for single and round trips. Want to transfer from Roissy-Charles de Gaulle Airport to Paris? Book Prestige Paris Transfer!',
                                price: '€80',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-6.png'),
                                title: 'BEAUVAIS TO DISNEYLAND',
                                subtitle: 'Need to visit Disneyland? Book Prestige Paris Transfer for your transfers between the Beauvais Airport and Disneyland Paris. No need to pay extra for your luggage and you can choose either single or round trip transfers. We provide toy faster and reliable transfers in our luxury vehicles. Book us now!',
                                price: '€150',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-5.png'),
                                title: 'BEAUVAIS TO PARIS',
                                subtitle: 'For affordable travel between Beauvais Airport and Paris, book Prestige Paris Transfer now! Best offers for your single and round trips. No extra charges for luggage and we provide you a better service than a regular taxi service. Save your time. Book us now!',
                                price: '€150',
                            })}
                        </Row>
                    </Row>
                </Container>
            </section>
            <Footer/>
        </div>
    );
}

