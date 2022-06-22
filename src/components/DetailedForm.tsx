import React, {useEffect, useRef} from "react";
import './detailed-form.css';
import {collection} from 'firebase/firestore';
import {useCollection,} from 'react-firebase-hooks/firestore';
import {db} from "../config/firebase-config";
import {useService} from "react-service-locator";
import {BookingService} from "../services/booking-service";
import {StateService} from "../services/state-service";
import data from "../data/data.json"
import NoteBanner from "./NoteBanner";

const DetailedForm = (params: any) => {

    useEffect(()=>{
    },[])

    const stateService = useService(StateService);
    const bookingService = useService(BookingService);

    const [value, loading, error] = useCollection(
        collection(db, 'bookings'),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );

    function clear(event: any) {
        event.preventDefault();
        event.target.reset();
    }

    function sendDoc() {
        bookingService.createBooking().then(r => {
            console.log("Created Doc");
        });
    }

    return (
        <div>
            {/* Title Bar */}
            <section className="bg-dark text-light p-3">
                <div className="container">
                    <div className="titleBar">
                        <div>
                            <h1 className="titleBooking">Booking (Arrival)</h1>
                        </div>
                        <div>
                            <p><a href="#" className="btn-home">Home</a> / Booking</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Note Banner */}
            <NoteBanner></NoteBanner>

            {/* Forms */}
            <form id={"booking-details"} onSubmit={(e) => {
                sendDoc();
                clear(e);
            }}>
                <section className="forms-main">
                    <div className="container p-5">
                        <div className="row g-4">
                            <div className="col-md text-light">
                                <div className="title-bar-bg">
                                    <h5 className="p-1 text-center">Personal Details</h5>
                                </div>
                                <div className="booking-form">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="col-form-label">
                                            Your Name:
                                        </label>
                                        <input type="text" required={true} className="form-control" id="name"
                                               placeholder="Enter your name" onChange={(e)=>{
                                            bookingService.bookingDetails.setName(e.target.value);
                                        }}/>
                                        <label htmlFor="last-name" className="col-form-label">
                                            Phone:
                                        </label>
                                        <input type="text" required={true} className="form-control" id="phone" onChange={(e)=>{
                                            bookingService.bookingDetails.setPhone(e.target.value);
                                        }}/>
                                        <label htmlFor="email" className="col-form-label">
                                            Email:
                                        </label>
                                        <input type="email" required={true} className="form-control" id="email"
                                               placeholder="Your Email Address" onChange={(e)=>{
                                            bookingService.bookingDetails.setEmail(e.target.value);
                                        }}/>
                                        <div className="py-3">
                                            Number of Passengers
                                        </div>
                                        <div className="row g-4">
                                            <div className="col-md">
                                                Adults
                                            </div>
                                            <div className="col-md">
                                                <select className="form-select" required={true} defaultValue={bookingService.bookingDetails.getAdultCount()} aria-label="Default select example"
                                                        onChange={async (e) => {
                                                            bookingService.bookingDetails.setAdultCount(parseInt(e.target.value));
                                                            // await fetchPrice();
                                                        }}>
                                                    {data.adultCounts.map((item, key) => {
                                                        return (<option value={key} key={key}>{item}</option>)
                                                    })}
                                                </select>
                                            </div>
                                            <div className="col-md">
                                                Kids
                                            </div>
                                            <div className="col-md">
                                                <select className="form-select" required={true} defaultValue={bookingService.bookingDetails.getChildCount()} aria-label="Default select example"
                                                        onChange={async (e) => {
                                                            bookingService.bookingDetails.setChildCount(parseInt(e.target.value));
                                                            // await fetchPrice();
                                                        }}>
                                                    {data.kidCounts.map((item, key) => {
                                                        return (<option value={key} key={key}>{item}</option>)
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3 py-3">
                                            <label htmlFor="additionalNote" className="form-label"> Additional
                                                Notes:</label>
                                            <textarea className="form-control" id="additionalNote" rows={3}
                                                      defaultValue={""} onChange={(e)=>{
                                                bookingService.bookingDetails.setComment(e.target.value);
                                            }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md text-light">
                                <div className="title-bar-bg">
                                    <h5 className="p-1 text-center">Arrival or Pickup Details</h5>
                                </div>
                                <div className="booking-form">
                                    <div className="mb-3">
                                        <div className="py-2">
                                            Pickup From:
                                        </div>
                                        <select className="form-select" required={true} defaultValue={bookingService.bookingDetails.getPickUpPoint()??"ORLY"}
                                                aria-label="Default select example" onChange={async (e) => {
                                            bookingService.bookingDetails.setPickUpPoint(e.target.value);
                                            console.log(bookingService.bookingDetails.getPickUpPoint())
                                        }}>
                                            <option value={"SELECTED"} disabled={true}>Select Drop Place...</option>
                                            {data.locations.map((item, key) => {
                                                return (<option value={item} key={item}>{item}</option>)
                                            })}
                                        </select>
                                        <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="pickup-address"
                                                      placeholder="Type your pickup address (Optional)" rows={3}
                                                      defaultValue={""} onChange={(e)=>{
                                                bookingService.bookingDetails.setPickUpPointOptionalAddress(e.target.value);
                                            }}/>
                                        </div>
                                        <div className="py-2">
                                            Drop To:
                                        </div>
                                        <select className="form-select" required={true} defaultValue={bookingService.bookingDetails.getDropPoint()??"SELECTED"}
                                                aria-label="Default select example" onChange={async (e) => {
                                            bookingService.bookingDetails.setDropPoint(e.target.value);
                                        }}>
                                            <option value={"SELECTED"} disabled={true}>Select Drop Place...</option>
                                            {data.locations.map((item, key) => {
                                                return (<option value={item} key={key}>{item}</option>)
                                            })}
                                        </select>
                                        <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="destination-address"
                                                      placeholder="Type your destination address (Optional)" rows={3}
                                                      defaultValue={""} onChange={(e)=>{
                                                bookingService.bookingDetails.setDropPointOptionalAddress(e.target.value);
                                            }}/>
                                        </div>
                                        <label htmlFor="date" className="col-form-label">
                                            Flight/Train Arrival Date:
                                        </label>
                                        <input type="date" className="form-control" id="date"
                                               placeholder="Select Pickup Date..." onChange={(e)=>{
                                            bookingService.bookingDetails.setFlightArrivalDate(new Date(e.target.value));
                                        }}/>
                                        <label htmlFor="time" className="col-form-label">
                                            Flight/Train Arrival Time: *
                                        </label>
                                        <input type="time" className="form-control" id="time"/>
                                        <label htmlFor="flight-coming-from" className="col-form-label">
                                            Flight/Train Coming From:
                                        </label>
                                        <input type="text" className="form-control" id="flight-coming-from"
                                               placeholder="From where your Flight/ Train is coming?"/>
                                        <label htmlFor="flight-num" className="col-form-label">
                                            Flight/Train Number:
                                        </label>
                                        <input type="text" className="form-control" id="flight-num"
                                               placeholder="Number of your Flight or Train"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>


            <section className="travel-fare-banner  text-center">
                <div className="container pt-5">
                    <h1>
                        Your Travel Fare is <span className="fare">€ {bookingService.bookingDetails.getCost()}</span>
                    </h1>
                    <div className="lead">
                        Night Time Charge (Between 22:00 and 06:00) : € 15
                    </div>
                </div>
                <div className="btn-reservation py-5">
                    <button type="submit" form={"booking-details"} className="btn btn-reservation-button" >Submit Reservation</button>
                </div>
            </section>
        </div>
    );


}

export default DetailedForm;