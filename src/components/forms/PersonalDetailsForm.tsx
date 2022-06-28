import data from "../../data/data.json";
import React, {FC} from "react";
import {useService} from "react-service-locator";
import SectionFrame from "../frames/SectionFrame";
import {ReservationService} from "../../services/reservation-service";
import {FieldValue, UseFormReturn} from "react-hook-form";
import {IHomeData} from "../../definitions/i-home-data";
import {IPersonData} from "../../definitions/i-person-data";


export const PersonalDetailsForm: FC<{ formHook: UseFormReturn<FieldValue<any>> }> = (params) => {

    const reservationService = useService(ReservationService);
    // useEffect(() => {
    //     console.log(reservationService.state);
    //     console.log(TripProcessor.findPrice(reservationService.state.homeFormData, reservationService.state.journeyType))
    // }, [reservationService.state]);

    const onChangeForm = () => {
        reservationService.setFormData({
            homeFormData: params.formHook.getValues() as IHomeData,
            personalFormData: params.formHook.getValues() as IPersonData
        })
    };

    return <SectionFrame title={'Personal Details'}>
        <label htmlFor="name" className="mb-3 form-sub-title">
            Your Name:
        </label>
        <input type="text" required={true} className="form-control" id="name"
               placeholder="Enter your name" {...params.formHook.register("name", {required: true})}/>
        <label htmlFor="last-name" className="mb-3 form-sub-title">
            Phone:
        </label>
        <input type="text" required={true} className="form-control"
               id="phone" {...params.formHook.register("phone", {required: true})}/>
        <label htmlFor="email" className="mb-3 form-sub-title">
            Email:
        </label>
        <input type="email" required={true} className="form-control" id="email"
               placeholder="Your Email Address" {...params.formHook.register("email", {required: true})}/>
        <div className="py-3 mb-3 form-sub-title">
            Number of Passengers
        </div>
        <div className="row g-4 mb-3 form-sub-title">
            <div className="col-md">
                Adults
            </div>
            <div className="col-md">
                <select className="form-select" required={true}
                        aria-label="Default select example"
                        {...params.formHook.register("adultCount", {required: true})}
                >
                    {data.adultCounts.map((item, key) => {
                        return (<option value={item} key={item}>{item}</option>)
                    })}
                </select>
            </div>
            <div className="col-md">
                Kids
            </div>
            <div className="col-md">
                <select className="form-select" required={true}
                        aria-label="Default select example"
                        {...params.formHook.register("childCount", {required: true})}
                >
                    {data.kidCounts.map((item, key) => {
                        return (<option value={item} key={item}>{item}</option>)
                    })}
                </select>
            </div>
        </div>
        <div className="mb-3 py-3 mb-3 form-sub-title">
            <label htmlFor="additionalNote" className="form-label"> Additional
                Notes:</label>
            <textarea className="form-control" id="additionalNote" rows={3}
                      defaultValue={""} {...params.formHook.register("comment",)}/>
        </div>
    </SectionFrame>;
}

