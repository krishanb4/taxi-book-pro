import React, {useEffect} from "react";
import '../../styles/booking-style.css';
import {SecondPage} from "./SecondPage";
import {PersonalDetailsForm} from "../forms/PersonalDetailsForm";
import {FieldValue, useForm, UseFormReturn} from "react-hook-form";
import {useService} from "react-service-locator";
import {ReservationService} from "../../services/reservation-service";
import {TripProcessor} from "../../data/json/trip-processor";
import {IPersonData} from "../../definitions/i-person-data";
import {ArrivalDetailsForm} from "../forms/ArrivalDetailsForm";
import {IBookingInfo} from "../../definitions/i-booking-info";

export const Arrival = (params: any) => {
    const formHook: UseFormReturn<FieldValue<any>> = useForm();
    const reservationService = useService(ReservationService);

    useEffect(() => {
        console.log(reservationService.state);
        console.log(TripProcessor.findPrice(reservationService.state.homeFormData, reservationService.state.journeyType))
    }, [reservationService.state]);

    const onChangeForm = () => {
        reservationService.setFormData({
            personalFormData: formHook.getValues() as IPersonData,
            arrivalFromDetails: formHook.getValues() as IBookingInfo
        })

    };

    const onSubmitForm = () => {

    }

    return <form id={"booking-details-arrival"} onChange={onChangeForm}>
        <SecondPage formHook={formHook}>
            <div className="row">
                <PersonalDetailsForm formHook={formHook}/>
                <ArrivalDetailsForm formHook={formHook}/>
            </div>
        </SecondPage>
    </form>
}

