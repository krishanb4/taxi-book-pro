import React from "react";
import {useService} from "react-service-locator";
import data from "../../data/data.json";
import SectionFrame from "../frames/SectionFrame";
import {ReservationService} from "../../services/reservation-service";
import {useTranslation} from "react-i18next";


export const ArrivalDetailsForm = (params: any) => {
    const reservationService = useService(ReservationService);
    const {t} = useTranslation();

    return <form>
        <SectionFrame title={t('arrival-or-pickup')}>
            <div className="form-sub-title">
                <div className="py-2">{t('pickup-from')}</div>
                <select className="form-select" required={true}
                        {...reservationService.arrivalFormHook.register("pickUpPoint", {required: true})}>
                    {data.locations.map((item, key) => {
                        return (<option value={item} key={item}>{item}</option>)
                    })}
                </select>
                <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="pickup-address"
                                                      placeholder={t("pickup-from-ph")} rows={3}
                                                      defaultValue={""} {...reservationService.arrivalFormHook.register("pickUpPointOptionalAddress")}/>
                </div>
                <div className="py-2">{t('drop-to')}</div>
                <select className="form-select" required={true}
                        {...reservationService.arrivalFormHook.register("dropPoint", {required: true})}>
                    {data.locations.map((item, key) => {
                        return (<option value={item} key={key}>{item}</option>)
                    })}
                </select>

                <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="destination-address"
                                                      placeholder={t('drop-to-ph')} rows={3}
                                                      defaultValue={""} {...reservationService.arrivalFormHook.register("dropPointOptionalAddress")}/>
                </div>
                <label htmlFor="date" className="col-form-label">{t('pickup-date')}</label>
                <input type="date" className="form-control" id="date" required={true}
                       placeholder={t('pickup-date-ph')} {...reservationService.arrivalFormHook.register("pickUpDate", {required: true})}/>

                <label htmlFor="time" className="col-form-label">
                    {t('pickup-time')}
                </label>
                <input type="time" className="form-control"
                       id="time" {...reservationService.arrivalFormHook.register("pickUpTime", {required: true})}/>

                <label htmlFor="date" className="col-form-label">
                    {t('flight-arrival-date')}
                </label>
                <input type="date" className="form-control" id="date"
                       placeholder={t('flight-arrival-date-ph')} {...reservationService.arrivalFormHook.register("flightArrivalDate")}/>

                <label htmlFor="time" className="col-form-label">
                    {t('flight-arrival-time')}
                </label>
                <input type="time" className="form-control"
                       id="time" {...reservationService.arrivalFormHook.register("flightArrivalTime")}/>

                <label htmlFor="flight-coming-from" className="col-form-label">
                    {t('flight-from')}
                </label>
                <input type="text" className="form-control" id="flight-coming-from"
                       placeholder={t('flight-from-ph')} {...reservationService.arrivalFormHook.register("flightComeFrom")}/>

                <label htmlFor="flight-num" className="col-form-label">
                    {t('flight-number')}
                </label>
                <input type="text" className="form-control" id="flight-num"
                       placeholder={t('flight-number-ph')} {...reservationService.arrivalFormHook.register("flightNumber")}/>
            </div>
        </SectionFrame>
    </form>
}
