import React, {useEffect} from "react";
import '../../styles/booking-style.css';
import {useService} from "react-service-locator";
import {PersonalDetailsForm} from "../forms/PersonalDetailsForm";
import {SecondPage} from "./SecondPage";
import {ArrivalDetailsForm} from "../forms/ArrivalDetailsForm";
import {DepartureDetailsForm} from "../forms/DepartureDetailsForm";
import {FieldValue, useForm, UseFormReturn} from "react-hook-form";
import {ReservationService} from "../../services/reservation-service";
import {TripProcessor} from "../../data/json/trip-processor";

export const RoundTrip = () => {

    const formHook: UseFormReturn<FieldValue<any>> = useForm();
    const reservationService = useService(ReservationService);

    useEffect(() => {
        console.log(reservationService.state);
        console.log(TripProcessor.findPrice(reservationService.state.homeFormData, reservationService.state.journeyType))
    }, [reservationService.state]);

    return <SecondPage formHook={formHook}>
        <div className="row">
            <PersonalDetailsForm formHook={formHook}/>
            <ArrivalDetailsForm formHook={formHook}/>
        </div>
        <div className="row row-cols-2">
            <DepartureDetailsForm formHook={formHook}/>
        </div>
    </SecondPage>

}

