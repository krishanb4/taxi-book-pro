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
import {useTranslation} from "react-i18next";

export const HomePage = () => {
    const reservationService = useService(ReservationService);
    const uiService = useService(UiService);
    const navigate = useNavigate();
    const {t} = useTranslation();

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
                        {t('main-content')}
                    </p>
                    <form>
                        <div className="tab-content home-form">
                            <div className="home-form-outer">
                                <div className={'home-form-header-bar'}>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        {buildModeButton(JourneyType.ARRIVAL_ONE_WAY, t('arrival'), '/assets/road.svg')}
                                        {buildModeButton(JourneyType.DEPARTURE, t('departure'), '/assets/plane.svg')}
                                        {buildModeButton(JourneyType.ROUND_TRIP, t('round-trip'), '/assets/van.svg')}
                                    </div>
                                </div>
                                <div className={'home-form-inner'}>
                                    <div className="row g-4 mt-2">
                                        <div className="col-md py-3">
                                            <p className="subTitles">{t('pickup-location')}</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...reservationService.homeFormHook.register('pickUpPoint')} >
                                                <option value={'NONE'}>{t('select-pickup-location')}</option>
                                                {data.locations.map((item, key) => {
                                                    return (<option value={item.value}
                                                                    key={item.value}>{item.display}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md py-3">
                                            <p className="subTitles">{t('drop-location')}</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...reservationService.homeFormHook.register('dropPoint')}>
                                                <option value={'NONE'}>{t('select-drop-location')}</option>
                                                {data.locations.map((item, key) => {
                                                    return (<option value={item.value}
                                                                    key={item.value}>{item.display}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-md py-3">
                                            <p className="subTitles">{t('adult-riders')}</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...reservationService.homeFormHook.register('adultCount')}>
                                                {data.adultCounts.map((item, key) => {
                                                    return (<option value={item} key={item}>{item}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md py-3">
                                            <p className="subTitles">{t('child-riders')}</p>
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
                                            <div>{t('your-travel-fare')} - <span
                                                className={"price"}> {reservationService.homePageTripPrice} </span>
                                            </div>
                                        </div>
                                        <button type="button" className="btn booknow-btn" onClick={onBookNowClick}>
                                            {t('book-now')}
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
                        <h3 className={'pb-4'}>{t('our-service')}</h3>
                        <Row className={'justify-content-md-center'}>
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-1.png'),
                                title: t('efficient'),
                                subtitle: t('efficient-desc'),
                            })}
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-2.png'),
                                title: t('worthy'),
                                subtitle: t('worthy-desc'),
                            })}
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-3.png'),
                                title: t('safe'),
                                subtitle: t('safe-desc'),
                            })}
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-4.png'),
                                title: t('professional'),
                                subtitle: t('professional-desc'),
                            })}
                            {buildServiceItem({
                                image: require('../../assets/icons/service-icon-5.png'),
                                title: t('support'),
                                subtitle: t('support-desc'),
                            })}
                        </Row>
                    </Row>
                    <Row className={'pt-5'}>
                        <h3 className={'pb-4'}>{t('special-packages')}</h3>
                        <Row>
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-2.jpg'),
                                title: 'CDG TO DISNEYLAND',
                                subtitle: t('package-1'),
                                price: '€70',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-3.jpg'),
                                title: 'ORLY TO PARIS',
                                subtitle: t('package-2'),
                                price: '€65',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-4.jpg'),
                                title: 'ORLY TO DISNEYLAND',
                                subtitle: t('package-3'),
                                price: '€80',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-1.jpg'),
                                title: 'CDG TO PARIS',
                                subtitle: t('package-4'),
                                price: '€80',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-6.jpg'),
                                title: 'BEAUVAIS TO DISNEYLAND',
                                subtitle: t('package-5'),
                                price: '€150',
                            })}
                            {buildPackageItem({
                                image: require('../../assets/thumbnails/package-thumb-5.jpg'),
                                title: 'BEAUVAIS TO PARIS',
                                subtitle: t('package-6'),
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

