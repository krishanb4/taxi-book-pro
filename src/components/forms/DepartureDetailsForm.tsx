import data from "../../data/data.json";
import React from "react";
import {useService} from "react-service-locator";
import SectionFrame from "../frames/SectionFrame";
import {ReservationService} from "../../services/reservation-service";

export const DepartureDetailsForm = (params: any) => {
    const reservationService = useService(ReservationService);

    return <form>
        <SectionFrame title={'Departure or Pickup Detail'}>
            <div className=" form-sub-title">
                <div className="py-2">
                    Pickup From:
                </div>
                <select className="form-select" required={true}
                        aria-label="Default select example" {...reservationService.departureFormHook.register("pickUpPoint", {required: true})}>
                    {data.locations.map((item, key) => {
                        return (<option value={item} key={item}>{item}</option>)
                    })}
                </select>

                <div className="mb-3 pt-3">
                <textarea className="form-control" id="pickup-address"
                          placeholder="Type your pickup address (Optional)" rows={3}
                          defaultValue={""} {...reservationService.departureFormHook.register("pickUpPointOptionalAddress")}/>
                </div>

                <div className="py-2">
                    Drop To:
                </div>
                <select className="form-select" required={true}
                        aria-label="Default select example" {...reservationService.departureFormHook.register("dropPoint", {required: true})}>
                    {data.locations.map((item, key) => {
                        return (<option value={item} key={key}>{item}</option>)
                    })}
                </select>

                <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="destination-address"
                                                      placeholder="Type your destination address (Optional)" rows={3}
                                                      defaultValue={""} {...reservationService.departureFormHook.register("dropPointOptionalAddress")}/>
                </div>

                <label htmlFor="date" className="col-form-label">
                    Pickup Date:
                </label>
                <input type="date" className="form-control" id="date"
                       placeholder="Select Pickup Date..."  {...reservationService.departureFormHook.register("pickUpDate", {required: true})}/>

                <label htmlFor="time" className="col-form-label">
                    Pickup Time (CET): *
                </label>
                <input type="time" className="form-control"
                       id="time" {...reservationService.departureFormHook.register("pickUpTime", {required: true})} />

            </div>
        </SectionFrame>
    </form>
}

