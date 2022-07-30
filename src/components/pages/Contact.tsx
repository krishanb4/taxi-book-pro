import React from "react";
import '../../styles/contact-style.scss';
import {MainNavbar} from "../banners/MainNavbar";
import {useTranslation} from "react-i18next";
import {Col, Container, Row} from "react-bootstrap";
import {EnvelopeFill, Facebook, GeoAltFill, Globe2, Server, TelephoneFill} from "react-bootstrap-icons";

export const Contact = () => {
    const {t} = useTranslation();

    return (
        <div>
            <section className="nav-bar-main">
                <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
            </section>

            <section className="py-5 px-3">
                <div className="container contact-main">
                    <div className="p-2 text-center contact-main-title">{t('contact-us')}</div>
                    <Container>
                        <Row>
                            <Col md={6} sm={12} className={"contact-img pb-4 pt-3"}>
                                <img src={require('../../assets/images/contact.png')} className={"img-fluid"}/>
                            </Col>
                            <Col md={1}></Col>
                            <Col md={5} sm={12}>
                                <div className={"pt-3"}>
                                    <h1 className="pb-5 contact-title">{t('get-in-touch')}</h1>
                                    <div className="contact-details-main">
                                        <div className="contact-sub-title">
                                            <TelephoneFill/> &nbsp; <a href="tel:+33605822259">+33 605 822 259</a>
                                        </div>
                                        <div className=" contact-sub-title">
                                            <div className="contact-details">
                                                <EnvelopeFill/> &nbsp; <a
                                                href="mailto:bookings@espressoparistransfer.com">bookings@espressoparistransfer.com</a>
                                            </div>
                                        </div>
                                        <div className="contact-sub-title">
                                            <div className="contact-details">
                                                <Globe2/> &nbsp; <a
                                                href="https://espressoparistransfer.com">https://espressoparistransfer.com</a>
                                            </div>
                                        </div>
                                        <div className="contact-sub-title">
                                            <div className="contact-details">
                                                <GeoAltFill/> &nbsp; 8 Parc des Courtilières, 93500 Pantin, France
                                            </div>
                                        </div>
                                        <div className="contact-sub-title">
                                            <div className="contact-details">
                                                <Facebook/> &nbsp; <a
                                                href="https://www.facebook.com/Espresso-Paris-Transfer-103291185784885/">Espresso
                                                Paris Transfer</a>
                                            </div>
                                        </div>
                                        <div className="contact-sub-title">
                                            <div className="contact-details">
                                                <Server/> &nbsp; <a href="https://plebs.studio/">Powered by Pleb Studio
                                                (https://plebs.studio)</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </Container>
                </div>

            </section>
        </div>
    );
}
