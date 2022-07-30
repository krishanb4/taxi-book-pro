import {Button, Col, Container, Row} from "react-bootstrap";
import "./FeaturesSection.scss";

export function FeaturesSection() {

    return (
        <div className={'py-5'}>
            <Container>
                <Row>
                    <Col md={6} lg={3}>
                        <img src={require("../assets/icons/features-section/castle.png")} width={70}
                             className={"features-main-icon"} alt="Castle"/>
                        <div className="py-4 feature-card-main">
                            <div className={"text-center feature-card-title"}>
                                <div className={'py-3 text-light '}>DISNEYLAND TRANSFER</div>
                            </div>
                            <div className="feature-card-content-main pb-3">
                                <div className="feature-card-content">
                                    <div className="py-3">
                                        <div>
                                            <div className={"py-4"}>
                                                <Button className={"px-5 py-2 features-book-btn"} href={"#book-now"}>BOOK
                                                    NOW</Button>
                                            </div>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/payment.png")}
                                                        width={25} className={"features-main-icon"} alt="payment"/>
                                                </Col>
                                                <Col xs={10}>Reserve now pay later</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/baggage.png")}
                                                        width={25} className={"features-main-icon"} alt="baggage"/>
                                                </Col>
                                                <Col xs={10}>Free of extra luggage charges</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/airplane.png")}
                                                        width={25} className={"features-main-icon"} alt="airplane"/>
                                                </Col>
                                                <Col xs={10}>Can transfer from all main airports in Paris</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/baby-boy.png")}
                                                        width={25} className={"features-main-icon"} alt="baby-boy"/>
                                                </Col>
                                                <Col xs={10}>Free booster seats and baby car seats</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/delay.png")}
                                                        width={25} className={"features-main-icon"} alt="delay"/>
                                                </Col>
                                                <Col xs={10}>Free of flight delay charges</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/cart.png")}
                                                        width={25} className={"features-main-icon"} alt="cart"/>
                                                </Col>
                                                <Col xs={10}>Animal transport</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/music-notes.png")}
                                                        width={25} className={"features-main-icon"} alt="music-notes"/>
                                                </Col>
                                                <Col xs={10}>Can select your own in-car entertainment system</Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3}>
                        <img src={require("../assets/icons/features-section/paris.png")} width={70}
                             className={"features-main-icon"} alt="paris"/>
                        <div className="py-4 feature-card-main">
                            <div className={"text-center feature-card-title"}>
                                <div className={'py-3 text-light '}>CITY TOUR</div>
                            </div>
                            <div className="feature-card-content-main pb-3">
                                <div className="feature-card-content">
                                    <div className="py-3">
                                        <div>
                                            <div className={"py-4"}>
                                                <Button className={"px-5 py-2 features-book-btn"}
                                                        href={"mailto:bookings@espressoparistransfer.com"}>ENQUIRE
                                                    NOW</Button>
                                            </div>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/payment.png")}
                                                        width={25} className={"features-main-icon"} alt="payment"/>
                                                </Col>
                                                <Col xs={10}>Book now pay later</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/translate.png")}
                                                        width={25} className={"features-main-icon"} alt="translate"/>
                                                </Col>
                                                <Col xs={10}>Chauffeurs with a fine English proficiency</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/repeat.png")}
                                                        width={25} className={"features-main-icon"} alt="repeat"/>
                                                </Col>
                                                <Col xs={10}>From three hours up-to whole day tour duration</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/tour-guide.png")}
                                                        width={25} className={"features-main-icon"} alt="tour-guide"/>
                                                </Col>
                                                <Col xs={10}>Discounts for school groups and other</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/mini-van.png")}
                                                        width={25} className={"features-main-icon"} alt="mini-van"/>
                                                </Col>
                                                <Col xs={10}>Can request guides tours</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/baby-boy.png")}
                                                        width={25} className={"features-main-icon"} alt="mini-van"/>
                                                </Col>
                                                <Col xs={10}>Free booster seats and baby seats</Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3}>
                        <img src={require("../assets/icons/features-section/globe.png")} width={70}
                             className={"features-main-icon"} alt="globe"/>
                        <div className="py-4 feature-card-main">
                            <div className={"text-center feature-card-title"}>
                                <div className={'py-3 text-light '}>LONG DISTANCE JOURNEY</div>
                            </div>
                            <div className="feature-card-content-main pb-3">
                                <div className="feature-card-content">
                                    <div className="py-3">
                                        <div>
                                            <div className={"py-4"}>
                                                <Button className={"px-5 py-2 features-book-btn"}
                                                        href={"mailto:bookings@espressoparistransfer.com"}>ENQUIRE
                                                    NOW</Button>
                                            </div>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/globe.png")}
                                                        width={25} className={"features-main-icon"} alt="globe"/>
                                                </Col>
                                                <Col xs={10}>Private transfer facilities across the European union,
                                                    France, Switzerland and The United Kingdom </Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/different-currencies.png")}
                                                        width={25} className={"features-main-icon"}
                                                        alt="different-currencies"/>
                                                </Col>
                                                <Col xs={10}>Acknowledgement of the price in advance</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/debit-card.png")}
                                                        width={25} className={"features-main-icon"} alt="debit-card"/>
                                                </Col>
                                                <Col xs={10}>Accept both cash and card payments</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/clock.png")}
                                                        width={25} className={"features-main-icon"} alt="clock"/>
                                                </Col>
                                                <Col xs={10}>Free short stops</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/taxi-stop.png")}
                                                        width={25} className={"features-main-icon"} alt="taxi-stop"/>
                                                </Col>
                                                <Col xs={10}>One way and return transfers</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/payment.png")}
                                                        width={25} className={"features-main-icon"} alt="payment"/>
                                                </Col>
                                                <Col xs={10}>Book now pay later</Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={3}>
                        <img src={require("../assets/icons/features-section/vip.png")} width={70}
                             className={"features-main-icon"} alt="vip"/>
                        <div className="py-4 feature-card-main">
                            <div className={"text-center feature-card-title"}>
                                <div className={'py-3 text-light '}>VIP TRANSFERS</div>
                            </div>
                            <div className="feature-card-content-main pb-3">
                                <div className="feature-card-content">
                                    <div className="py-3">
                                        <div>
                                            <div className={"py-4"}>
                                                <Button className={"px-5 py-2 features-book-btn"}
                                                        href={"mailto:bookings@espressoparistransfer.com"}>ENQUIRE
                                                    NOW</Button>
                                            </div>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/interview.png")}
                                                        width={25} className={"features-main-icon"} alt="interview"/>
                                                </Col>
                                                <Col xs={10}>Customized arrangements for special occasions (on
                                                    request)</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/flower.png")}
                                                        width={25} className={"features-main-icon"} alt="flower"/>
                                                </Col>
                                                <Col xs={10}>Arranging flowers, Magazines, newspapers, champagne and
                                                    other beverages (on request)</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/car.png")}
                                                        width={25} className={"features-main-icon"} alt="car"/>
                                                </Col>
                                                <Col xs={10}>Mercedes Benz vehicles</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/driver.png")}
                                                        width={25} className={"features-main-icon"} alt="driver"/>
                                                </Col>
                                                <Col xs={10}>Experienced drivers</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/multiple-users-silhouette.png")}
                                                        width={25} className={"features-main-icon"}
                                                        alt="multiple-users-silhouette"/>
                                                </Col>
                                                <Col xs={10}>Individuals, couples and group transfers</Col>
                                            </Row>
                                            <Row className={'pt-3'}>
                                                <Col xs={2}>
                                                    <img
                                                        src={require("../assets/icons/features-section/sub-icons/payment.png")}
                                                        width={25} className={"features-main-icon"} alt="payment"/>
                                                </Col>
                                                <Col xs={10}>Reserve now and pay later</Col>
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
