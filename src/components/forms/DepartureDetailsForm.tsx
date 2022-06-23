import data from "../../data/data.json";
import React, {useEffect} from "react";
import {useService} from "react-service-locator";
import {StateService} from "../../services/state-service";
import {BookingService} from "../../services/booking-service";

const DepartureDetailsForm = (params: any) => {

    useEffect(() => {
    }, [])

    const stateService = useService(StateService);
    const bookingService = useService(BookingService);

    return (
        <div className="col-md text-light">
            <div className="title-bar-bg">
                <h5 className="p-1 text-center">Departure or Pickup Details</h5>
            </div>
            <div className="booking-form">
                <div className="mb-3">
                    <div className="py-2">
                        Pickup From:
                    </div>
                    <select className="form-select" required={true}
                            defaultValue={bookingService.departureBookingDetails.getPickUpPoint() ?? "SELECTED"}
                            aria-label="Default select example" onChange={async (e) => {
                        bookingService.departureBookingDetails.setPickUpPoint(e.target.value);
                        console.log(bookingService.departureBookingDetails.getPickUpPoint())
                    }}>
                        <option value={"SELECTED"} disabled={true}>Select Drop Place...</option>
                        {data.locations.map((item, key) => {
                            return (<option value={item} key={item}>{item}</option>)
                        })}
                    </select>
                    <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="pickup-address"
                                                      placeholder="Type your pickup address (Optional)" rows={3}
                                                      defaultValue={""} onChange={(e) => {
                                                bookingService.departureBookingDetails.setPickUpPointOptionalAddress(e.target.value);
                                            }}/>
                    </div>
                    <div className="py-2">
                        Drop To:
                    </div>
                    <select className="form-select" required={true}
                            defaultValue={bookingService.departureBookingDetails.getDropPoint() ?? "SELECTED"}
                            aria-label="Default select example" onChange={async (e) => {
                        bookingService.departureBookingDetails.setDropPoint(e.target.value);
                    }}>
                        <option value={"SELECTED"} disabled={true}>Select Drop Place...</option>
                        {data.locations.map((item, key) => {
                            return (<option value={item} key={key}>{item}</option>)
                        })}
                    </select>
                    <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="destination-address"
                                                      placeholder="Type your destination address (Optional)" rows={3}
                                                      defaultValue={""} onChange={(e) => {
                                                bookingService.departureBookingDetails.setDropPointOptionalAddress(e.target.value);
                                            }}/>
                    </div>
                    <label htmlFor="date" className="col-form-label">
                        Pickup Date:
                    </label>
                    <input type="date" className="form-control" id="date" required={true}
                           placeholder="Select Pickup Date..." onChange={(e) => {
                        bookingService.departureBookingDetails.setPickUpDate(new Date(e.target.value));
                    }}/>
                    <label htmlFor="time" className="col-form-label">
                        Pickup Time: *
                    </label>
                    <input type="time" className="form-control" id="time" required={true} onChange={(e) => {
                        let time = e.target.value.split(":");
                        bookingService.departureBookingDetails.setPickUpTime(parseInt(time[0]), parseInt(time[1]));
                    }}/>


                </div>
            </div>
        </div>
    );
}

export default DepartureDetailsForm;