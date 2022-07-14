import {Button, Col, Container, Row} from "react-bootstrap";

export function FeaturesSection() {

    return (
        <div className={'py-5'}>
            <Container>
                <Row>
                    <Col md={6} lg={3}>
                        <img src={require("../assets/icons/features-section/castle.png")} width={70}
                             className={"features-main-icon"} alt=""/>
                        <div className="py-4 feature-card-main">
                            <div className={"text-center feature-card-title"}>
                                <div className={'py-3 text-light '}>DISNEYLAND TRANSFER</div>
                            </div>
                            <div className="feature-card-content-main">
                                <div className="feature-card-content">
                                    <div className="py-5">
                                        <Button className={"px-5 py-2 features-book-btn"}>BOOK NOW</Button>
                                        <div className={'pt-5'}>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/payment.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Reserve now pay later</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/baggage.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Free of extra luggage charges</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/airplane.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Can transfer from all main airports in Paris</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/baby-boy.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Free booster seats and baby car seats</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/delay.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Free of flight delay charges</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/cart.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Animal transport</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/music-notes.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Can select your own in-car entertainment system</Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3}>
                        <img src={require("../assets/icons/features-section/paris.png")} width={70}
                             className={"features-main-icon"} alt=""/>
                        <div className="py-4 feature-card-main">
                            <div className={"text-center feature-card-title"}>
                                <div className={'py-3 text-light '}>CITY TOUR</div>
                            </div>
                            <div className="feature-card-content-main">
                                <div className="feature-card-content">
                                    <div className="py-5">
                                        <Button className={"px-5 py-2 features-book-btn"}>ENQUIRE NOW</Button>
                                        <div className={'pt-5'}>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/payment.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Book now pay later</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/translate.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Chauffeurs with a fine English proficiency</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/repeat.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>From three hours up-to whole day tour duration</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/tour-guide.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Discounts for school groups and other</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/mini-van.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Can request guides tours</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/baby-boy.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Free booster seats and baby seats</Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3}>
                        <img src={require("../assets/icons/features-section/globe.png")} width={70}
                             className={"features-main-icon"} alt=""/>
                        <div className="py-4 feature-card-main">
                            <div className={"text-center feature-card-title"}>
                                <div className={'py-3 text-light '}>LONG DISTANCE JOURNEY</div>
                            </div>
                            <div className="feature-card-content-main">
                                <div className="feature-card-content">
                                    <div className="py-5">
                                        <Button className={"px-5 py-2 features-book-btn"}>ENQUIRE NOW</Button>
                                        <div className={'pt-5'}>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/globe.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Private transfer facilities across the European union,
                                                    France, Switzerland and The United Kingdom </Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/different-currencies.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Acknowledgement of the price in advance</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/debit-card.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Accept both cash and card payments</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/clock.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Free short stops</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/taxi-stop.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>One way and return transfers</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/payment.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Book now pay later</Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3}>
                        <img src={require("../assets/icons/features-section/vip.png")} width={70}
                             className={"features-main-icon"} alt=""/>
                        <div className="py-4 feature-card-main">
                            <div className={"text-center feature-card-title"}>
                                <div className={'py-3 text-light '}>VIP AND CUSTOMIZED TRANSFERS</div>
                            </div>
                            <div className="feature-card-content-main">
                                <div className="feature-card-content">
                                    <div className="py-5">
                                        <Button className={"px-5 py-2 features-book-btn"}>ENQUIRE NOW</Button>
                                        <div className={'pt-5'}>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/interview.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Customized arrangements for special occasions (on
                                                    request)</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/flower.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Arranging flowers, Magazines, newspapers, champagne and
                                                    other beverages (on request)</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/car.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Mercedes Benz vehicles</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/driver.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Experienced drivers</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/multiple-users-silhouette.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Individuals, couples and group transfers</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col md={3}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/payment.png")}
                                                        width={25} className={"features-main-icon"} alt=""/>
                                                </Col>
                                                <Col md={9}>Reserve now and pay later</Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}