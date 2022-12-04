import data from "../../data/data.json";
import React from "react";
import {useService} from "react-service-locator";
import SectionFrame from "../frames/SectionFrame";
import {ReservationService} from "../../services/reservation-service";
import {useTranslation} from "react-i18next";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export const PersonalDetailsForm = (params: any) => {
    const reservationService = useService(ReservationService);
    const {t} = useTranslation();

    return <form>
        <SectionFrame title={t('personal-details')}>
            <label htmlFor="name" className="mb-3 form-sub-title">{t('your-name')}</label>
            <input type="text" required={true} className="form-control" id="name"
                   placeholder={t('your-name-ph')} {...reservationService.personalDetailFormHook.register("name", {required: true})}/>
            <label htmlFor="last-name" className="mb-3 form-sub-title">{t('phone')}</label>
            <PhoneInput
                className={'mb-3 form-control'}
                placeholder="Your Phone Number"
                value={reservationService.personalDetailFormHook.watch('phone')}
                defaultCountry={"US"}
                international={false}
                onChange={(value) => reservationService.personalDetailFormHook.setValue('phone', value)}
            />
            <label htmlFor="email" className="mb-3 form-sub-title">{t('email')}</label>
            <input type="email" required={true} className="form-control" id="email"
                   placeholder={t('email-ph')} {...reservationService.personalDetailFormHook.register("email", {required: true})}/>
            <div className="py-3 mb-3 form-sub-title">{t('number-of-passengers')}</div>
            <div className="row g-4 mb-3 form-sub-title">
                <div className="col-md">
                    {t('adult-riders')}
                </div>
                <div className="col-md">
                    <select className="form-select" required={true}
                            {...reservationService.personalDetailFormHook.register("adultCount", {required: true})}
                    >
                        {data.adultCounts.map((item, key) => {
                            return (<option value={item} key={item}>{item}</option>)
                        })}
                    </select>
                </div>
                <div className="col-md"> {t('child-riders')}</div>
                <div className="col-md">
                    <select className="form-select" required={true}
                            aria-label="Default select example"
                            {...reservationService.personalDetailFormHook.register("childCount", {required: true})}
                    >
                        {data.kidCounts.map((item, key) => {
                            return (<option value={item} key={item}>{item}</option>)
                        })}
                    </select>
                </div>
            </div>
            <div className="mb-3 py-3 mb-3 form-sub-title">
                <label htmlFor="additionalNote" className="form-label">{t('additional-notes')}</label>
                <textarea className="form-control" id="additionalNote" rows={3}
                          defaultValue={""} {...reservationService.personalDetailFormHook.register("comment",)}/>
            </div>
        </SectionFrame>
    </form>;
}

