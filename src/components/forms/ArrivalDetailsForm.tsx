import React, {useEffect} from "react";
import {useService} from "react-service-locator";
import {StateService} from "../../services/state-service";
import {BookingService} from "../../services/booking-service";
import data from "../../data/data.json";


const ArrivalDetailsForm = (params: any) => {

    useEffect(() => {
    }, [])

    const stateService = useService(StateService);
    const bookingService = useService(BookingService);

    return (
        <div className="col-md text-light">
            <div className="title-bar-bg">
                <h5 className="p-2 text-center main-titles">Arrival or Pickup Details</h5>
            </div>
            <div className="px-5 pb-4 pt-5 booking-form">
                <div className="mb-3 form-sub-title">
                    <div className="py-2">
                        Pickup From:
                    </div>
                    <select className="form-select" required={true} defaultValue={bookingService.arrivalBookingDetails.getPickUpPoint()??"SELECTED"}
                            aria-label="Default select example" onChange={async (e) => {
                        bookingService.arrivalBookingDetails.setPickUpPoint(e.target.value);
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
                                                bookingService.arrivalBookingDetails.setPickUpPointOptionalAddress(e.target.value);
                                            }}/>
                    </div>
                    <div className="py-2">
                        Drop To:
                    </div>
                    <select className="form-select" required={true} defaultValue={bookingService.arrivalBookingDetails.getDropPoint()??"SELECTED"}
                            aria-label="Default select example" onChange={async (e) => {
                        bookingService.arrivalBookingDetails.setDropPoint(e.target.value);
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
                                                bookingService.arrivalBookingDetails.setDropPointOptionalAddress(e.target.value);
                                            }}/>
                    </div>
                    <label htmlFor="date" className="col-form-label">
                        Pickup Date:
                    </label>
                    <input type="date" className="form-control" id="date" required={true}
                           placeholder="Select Pickup Date..." onChange={(e) => {
                        bookingService.arrivalBookingDetails.setPickUpDate(new Date(e.target.value));
                    }}/>
                    <label htmlFor="time" className="col-form-label">
                        Pickup Time: *
                    </label>
                    <input type="time" className="form-control" id="time" required={true} onChange={(e) => {
                        let time = e.target.value.split(":");
                        bookingService.arrivalBookingDetails.setPickUpTime(parseInt(time[0]), parseInt(time[1]));
                    }}/>
                    <label htmlFor="date" className="col-form-label">
                        Flight/Train Arrival Date:
                    </label>
                    <input type="date" className="form-control" id="date"
                           placeholder="Select Pickup Date..." onChange={(e)=>{
                        bookingService.arrivalBookingDetails.setFlightArrivalDate(new Date(e.target.value));
                    }}/>
                    <label htmlFor="time" className="col-form-label">
                        Flight/Train Arrival Time: *
                    </label>
                    <input type="time" className="form-control" id="time" onChange={(e)=>{
                        let time = e.target.value.split(":");
                        bookingService.arrivalBookingDetails.setFlightArrivalTime(parseInt(time[0]),parseInt(time[1]));
                    }}/>
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
    );
}

export default ArrivalDetailsForm;