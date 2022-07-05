import React from "react";
import {EnvelopeFill, PhoneFill} from "react-bootstrap-icons";
import {Container, Image, Nav} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const Footer = () => {
    const navigate = useNavigate();
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
                                <p className={'pt-4'}>'Prestige Paris Transfer' is a private transfer service renowned
                                    for being one of the friendliest and most
                                    cost-effective airport shuttle around.</p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Quick Links
                                </h6>
                                <p>
                                    <Nav.Link onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/')
                                    }}>Book Now</Nav.Link>
                                </p>
                                <p>
                                    <Nav.Link onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/rates')
                                    }}>Rates</Nav.Link>
                                </p>
                                <p>
                                    <Nav.Link onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/contact')
                                    }}>Contact</Nav.Link>
                                </p>
                            </div>
                            {/* Grid column */}
                            {/* Grid column */}
                            {/* Grid column */}
                            {/* Grid column */}
                            <div className="col-md-5 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Contact
                                </h6>
                                {/*<p><PinMapFill/> &nbsp; New York, NY 10012, US</p>*/}
                                <p>
                                    <EnvelopeFill/> &nbsp; bookings@prestigeparistransfers.com
                                </p>
                                <p><PhoneFill/> &nbsp; +33 605 822 259</p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links  */}
                {/* Copyright */}
                <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                    © 2022 Copyright Prestige Paris Transfer
                </div>
                {/* Copyright */}
            </Container>
        </footer>
    );
}
