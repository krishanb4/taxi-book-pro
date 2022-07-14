import data from "../../data/data.json";
import React from "react";
import {useService} from "react-service-locator";
import SectionFrame from "../frames/SectionFrame";
import {ReservationService} from "../../services/reservation-service";
import {useTranslation} from "react-i18next";

export const DepartureDetailsForm = (params: any) => {
    const reservationService = useService(ReservationService);
    const {t} = useTranslation();

    return <form>
        <SectionFrame title={t('departure-or-pickup')}>
            <div className=" form-sub-title">
                <div className="py-2">{t('pickup-from')}</div>
                <select className="form-select" required={true}
                        {...reservationService.departureFormHook.register("pickUpPoint", {required: true})}>
                    {data.locations.map((item, key) => {
                        return (<option value={item.value} key={item.value}>{item.display}</option>)
                    })}
                </select>

                <div className="mb-3 pt-3">
                <textarea className="form-control" id="pickup-address"
                          placeholder={t('pickup-from-ph')} rows={3}
                          defaultValue={""} {...reservationService.departureFormHook.register("pickUpPointOptionalAddress")}/>
                </div>

                <div className="py-2">{t('drop-to')}</div>
                <select className="form-select" required={true}
                        {...reservationService.departureFormHook.register("dropPoint", {required: true})}>
                    {data.locations.map((item, key) => {
                        return (<option value={item.value} key={item.value}>{item.display}</option>)
                    })}
                </select>

                <div className="mb-3 pt-3">
                                            <textarea className="form-control" id="destination-address"
                                                      placeholder={t('drop-to-ph')} rows={3}
                                                      defaultValue={""} {...reservationService.departureFormHook.register("dropPointOptionalAddress")}/>
                </div>

                <label htmlFor="date" className="col-form-label">{t('pickup-date')}</label>
                <input type="date" className="form-control" id="date"
                       placeholder={t('pickup-date-ph')}  {...reservationService.departureFormHook.register("pickUpDate", {required: true})}/>

                <label htmlFor="time" className="col-form-label">
                    {t('pickup-time')}
                </label>
                <input type="time" className="form-control"
                       id="time" {...reservationService.departureFormHook.register("pickUpTime", {required: true})} />

            </div>
        </SectionFrame>
    </form>
}

