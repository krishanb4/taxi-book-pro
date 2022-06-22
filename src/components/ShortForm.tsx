import React, {useEffect, useState} from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './short-form.css'
import {useService} from "react-service-locator";
import {StateService} from "../services/state-service";
import {JourneyType} from "../enums/journey-type";
import {BookingService} from "../services/booking-service";
import data from "../data/data.json"
import {StateType} from "../enums/state-type";

const ShortForm = () => {
    const stateService = useService(StateService);
    const bookingService = useService(BookingService);
    const [journeyType, setJourneyType] = useState<JourneyType>(bookingService.bookingDetails.getJourneyType());
    const [price, setPrice] = useState<number>(0);
    const [adultCount, setAdultCount] = useState<number>(1);
    const [kidsCount, setKidsCount] = useState<number>(0);
    const [buttonState, setButtonState] = useState<boolean>(true);

    useEffect(() => {
        bookingService.bookingDetails.setAdultCount(adultCount);
    }, []);

    const radios = [
        {name: 'Arrival', value: JourneyType.ARRIVAL_ONE_WAY},
        {name: 'Departure', value: JourneyType.DEPARTURE},
        {name: 'Round Trip', value: JourneyType.ROUND_TRIP},
    ];

    function clear(event: any) {
        event.preventDefault();
    }

    async function fetchPrice() {
        if (bookingService.bookingDetails.getAdultCount() !== 0 && bookingService.bookingDetails.getPickUpPoint() !== null && bookingService.bookingDetails.getDropPoint() !== null) {
            bookingService.bookingDetails.setCost(await bookingService.getPrice())
            setPrice(bookingService.bookingDetails.getCost()??0);
            setButtonState(false);
        } else {
            setPrice(0);
            console.log("Didnt fetch");
        }
    }

    return (
        <div>
            <section className="form">
                <div className="container p-5">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link" id="nav-home-tab" data-bs-toggle="tab" defaultChecked={true}
                                    onClick={async () => {
                                        setJourneyType(JourneyType.ARRIVAL_ONE_WAY);
                                        bookingService.bookingDetails.setJourneyType(JourneyType.ARRIVAL_ONE_WAY);
                                        await fetchPrice();
                                    }}
                                    data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                                    aria-selected="true">ARRIVAL
                            </button>
                            <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab"
                                    onClick={async () => {
                                        setJourneyType(JourneyType.DEPARTURE);
                                        bookingService.bookingDetails.setJourneyType(JourneyType.DEPARTURE);
                                        await fetchPrice();
                                    }}
                                    data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                                    aria-selected="false">DEPARTURE
                            </button>
                            <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab"
                                    onClick={async () => {
                                        setJourneyType(JourneyType.ROUND_TRIP);
                                        bookingService.bookingDetails.setJourneyType(JourneyType.ROUND_TRIP);
                                        await fetchPrice();
                                    }}
                                    data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact"
                                    aria-selected="false">ROUND TRIP
                            </button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                             aria-labelledby="nav-home-tab" tabIndex={0}>

                        </div>
                        <div className="tab-pane fade" id="nav-profile" role="tabpanel"
                             aria-labelledby="nav-profile-tab"
                             tabIndex={0}>

                        </div>
                        <div className="tab-pane fade" id="nav-contact" role="tabpanel"
                             aria-labelledby="nav-contact-tab"
                             tabIndex={0}>

                        </div>
                        <div className="container">
                            <div className="row g-4">
                                <div className="col-md py-3">
                                    <p className="subTitles">PICKUP FROM</p>
                                    <select className="form-select" defaultValue={"SELECTED"}
                                            aria-label="Default select example" onChange={async (e) => {
                                        bookingService.bookingDetails.setPickUpPoint(e.target.value);
                                        await fetchPrice();
                                    }}>
                                        <option value={"SELECTED"} disabled={true}>Select Drop Place...</option>
                                        {data.locations.map((item, key) => {
                                            return (<option value={item} key={item}>{item}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="col-md py-3">
                                    <p className="subTitles">DROP TO</p>
                                    <select className="form-select" defaultValue={"SELECTED"}
                                            aria-label="Default select example" onChange={async (e) => {
                                        bookingService.bookingDetails.setDropPoint(e.target.value);
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
                                    <p className="subTitles">ADULTS</p>
                                    <select className="form-select" aria-label="Default select example"
                                            onChange={async (e) => {
                                                setAdultCount(parseInt(e.target.value));
                                                bookingService.bookingDetails.setAdultCount(parseInt(e.target.value));
                                                await fetchPrice();
                                            }}>
                                        {data.adultCounts.map((item, key) => {
                                            return (<option value={item} key={item}>{item}</option>)
                                        })}
                                    </select>
                                </div>
                                <div className="col-md py-3">
                                    <p className="subTitles">KIDS</p>
                                    <select className="form-select" aria-label="Default select example"
                                            onChange={async (e) => {
                                                setKidsCount(parseInt(e.target.value));
                                                bookingService.bookingDetails.setChildCount(parseInt(e.target.value));
                                                await fetchPrice();
                                            }}>
                                        {data.kidCounts.map((item, key) => {
                                            return (<option value={item} key={item}>{item}</option>)
                                        })}
                                    </select>
                                </div>
                            </div>
                            <h5 className="text-center py-3 formEnd">Please choose your Pickup Place and
                                Destination!</h5>
                            <h5 className="text-center py-3 formEnd">Your Travel Fare: € {price}</h5>
                            <div className="btn-book">
                                <button type="button" className="btn btn-light" disabled={buttonState} onClick={(e) => {
                                    stateService.setCurrentStatus(StateType.DETAILED_FORM);
                                    clear(e);
                                    console.log(stateService.getCurrentStatus())
                                }}>Book My Transfer Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    );
}

export default ShortForm;