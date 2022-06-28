import React, {useEffect} from "react";
import '../../styles/booking-style.css';
import {PersonalDetailsForm} from "../forms/PersonalDetailsForm";
import {SecondPage} from "./SecondPage";
import {FieldValue, useForm, UseFormReturn} from "react-hook-form";
import {useService} from "react-service-locator";
import {ReservationService} from "../../services/reservation-service";
import {TripProcessor} from "../../data/json/trip-processor";
import {IPersonData} from "../../definitions/i-person-data";
import {IBookingInfo} from "../../definitions/i-booking-info";
import {DepartureDetailsForm} from "../forms/DepartureDetailsForm";

export const Departure = () => {
    const formHook: UseFormReturn<FieldValue<any>> = useForm();
    const reservationService = useService(ReservationService);

    useEffect(() => {
        console.log(reservationService.state);
        console.log(TripProcessor.findPrice(reservationService.state.homeFormData, reservationService.state.journeyType))
    }, [reservationService.state]);

    const onChangeForm = () => {
        reservationService.setFormData({
            personalFormData: formHook.getValues() as IPersonData,
            departureFormDetails: formHook.getValues() as IBookingInfo
        })

    };
    return <form id={"booking-details-departure"} onChange={onChangeForm}>
        <SecondPage formHook={formHook}>
            <div className="row">
                <PersonalDetailsForm formHook={formHook}/>
                <DepartureDetailsForm formHook={formHook}/>
            </div>
        </SecondPage>
    </form>
}

