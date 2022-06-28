import data from "../../data/data.json";
import React, {useState} from "react";
import {useService} from "react-service-locator";
import {BookingService} from "../../services/booking-service";
import SectionFrame from "../frames/SectionFrame";
import {JourneyType} from "../../enums/journey-type";

const OldDepartureDetailsForm = (params: any) => {
    const bookingService = useService(BookingService);
    const [currentPickup, setCurrentPickup] = useState<string>();
    const [currentDrop, setCurrentDrop] = useState<string>("€ 0");
    // let currentPickup:string;
    // let currentDrop:string;
    function checkJourneyType() {
        if (bookingService.getJourneyType() !== JourneyType.DEPARTURE) {
            // setCurrentPickup(bookingService.)
        }
    }

    return <SectionFrame title={'Departure or Pickup Detail'}>
        <div className=" form-sub-title">
            <div className="py-2">
                Pickup From:
            </div>
            <select className="form-select" required={true}
                    defaultValue={bookingService.departureBookingDetails.getPickUpPoint() ?? "SELECTED"}
                    aria-label="Default select example" onChange={async (e) => {
                bookingService.departureBookingDetails.setPickUpPoint(e.target.value);
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
    </SectionFrame>
}

export default OldDepartureDetailsForm;
