import React from "react";
import {useService} from "react-service-locator";
import data from "../../data/data.json";
import SectionFrame from "../frames/SectionFrame";
import {ReservationService} from "../../services/reservation-service";


export const ArrivalDetailsForm = (params: any) => {

    const reservationService = useService(ReservationService);

    return <form>
        <SectionFrame title={'Arrival or Pickup Details'}>
            <div className="form-sub-title">
                <div className="py-2">
                    Pickup From:
                </div>
                <select className="form-select" required={true}
                        aria-label="Default select example" {...reservationService.arrivalFormHook.register("pickUpPoint", {required: true})}>
                    {data.locations.map((item, key) => {
                        return (<option value={item} key={item}>{item}</option>)
                    })}
                </select>
                <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="pickup-address"
                                                      placeholder="Type your pickup address (Optional)" rows={3}
                                                      defaultValue={""} {...reservationService.arrivalFormHook.register("pickUpPointOptionalAddress")}/>
                </div>
                <div className="py-2">
                    Drop To:
                </div>
                <select className="form-select" required={true}
                        aria-label="Default select example" {...reservationService.arrivalFormHook.register("dropPoint", {required: true})}>
                    {data.locations.map((item, key) => {
                        return (<option value={item} key={key}>{item}</option>)
                    })}
                </select>

                <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="destination-address"
                                                      placeholder="Type your destination address (Optional)" rows={3}
                                                      defaultValue={""} {...reservationService.arrivalFormHook.register("dropPointOptionalAddress")}/>
                </div>
                <label htmlFor="date" className="col-form-label">
                    Pickup Date:
                </label>
                <input type="date" className="form-control" id="date" required={true}
                       placeholder="Select Pickup Date..." {...reservationService.arrivalFormHook.register("pickUpDate", {required: true})}/>

                <label htmlFor="time" className="col-form-label">
                    Pickup Time (CET): *
                </label>
                <input type="time" className="form-control"
                       id="time" {...reservationService.arrivalFormHook.register("pickUpTime", {required: true})}/>

                <label htmlFor="date" className="col-form-label">
                    Flight/Train Arrival Date:
                </label>
                <input type="date" className="form-control" id="date"
                       placeholder="Select Pickup Date..." {...reservationService.arrivalFormHook.register("flightArrivalDate")}/>

                <label htmlFor="time" className="col-form-label">
                    Flight/Train Arrival Time (CET): *
                </label>
                <input type="time" className="form-control"
                       id="time" {...reservationService.arrivalFormHook.register("flightArrivalTime")}/>

                <label htmlFor="flight-coming-from" className="col-form-label">
                    Flight/Train Coming From:
                </label>
                <input type="text" className="form-control" id="flight-coming-from"
                       placeholder="From where your Flight/ Train is coming?" {...reservationService.arrivalFormHook.register("flightComeFrom")}/>

                <label htmlFor="flight-num" className="col-form-label">
                    Flight/Train Number:
                </label>
                <input type="text" className="form-control" id="flight-num"
                       placeholder="Number of your Flight or Train" {...reservationService.arrivalFormHook.register("flightNumber")}/>
            </div>
        </SectionFrame>
    </form>
}
