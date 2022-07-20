import React from "react";
import {EnvelopeFill, GeoAltFill, PhoneFill} from "react-bootstrap-icons";
import {Container, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {SocialIcon} from 'react-social-icons';
import {SocialShare} from "./items/SocialShare";

export const Footer = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (<footer className="text-center text-lg-start text-white mt-5 page-footer">
            <Container>
                {/* Section: Links  */}
                <section className={'pt-3'}>
                    <div className="container text-center text-md-start mt-5">
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <Image src={require('../assets/logos/ppt-hor-logo.png')} width={'100%'}
                                       style={{maxWidth: 200}}/>
                                <p className={'pt-4'}>{t('footer-desc')}</p>
                                <SocialShare/>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
                                <h6 className={"text-uppercase fw-bold mb-4"}>
                                    OFFICIALLY APPROVED BY TRANSPORTATION IN FRANCE
                                </h6>
                                <img src={require('../assets/images/license.png')} alt={""}
                                     className={"footer-license-img"}/>
                                <p className={"pt-4"}>Our SIRET No: &nbsp; 83834195600012</p>

                                {/* Links
                                <h6 className="text-uppercase fw-bold mb-4">{t('quick-links')}</h6>
                                <p>
                                    <Nav.Link onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/')
                                    }}>{t('book-now')}</Nav.Link>
                                </p>
                                <p>
                                    <Nav.Link onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/rates')
                                    }}>{t('rates')}</Nav.Link>
                                </p>
                                <p>
                                    <Nav.Link onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/contact')
                                    }}>{t('contact')}</Nav.Link>
                                </p>*/}

                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-5 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    {t('contact')}
                                </h6>
                                {/*<p><PinMapFill/> &nbsp; New York, NY 10012, US</p>*/}
                                <div className={'pb-2'}>
                                    <EnvelopeFill/> &nbsp; bookings@prestigeparistransfers.com
                                </div>
                                <div className={'pb-2'}><PhoneFill/> &nbsp; +33 605 822 259</div>
                                <div className={'pb-2'}><SocialIcon network="facebook" bgColor="#ffffff" style={{
                                    height: 18,
                                    width: 18
                                }}/>  &nbsp; Prestige Paris Transfer
                                </div>
                                <div className={'pb-2'}><GeoAltFill/> &nbsp; 8 Parc des Courtilières, 93500 Pantin,
                                    France
                                </div>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links  */}
                {/* Copyright */}
                <div className="text-center p-4">
                    © 2022 Copyright Prestige Paris Transfer
                </div>
                {/* Copyright */}
            </Container>
        </footer>
    );
}
