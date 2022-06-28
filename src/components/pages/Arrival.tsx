import React, {useEffect} from "react";
import '../../styles/booking-style.css';
import {SecondPage} from "./SecondPage";
import {PersonalDetailsForm} from "../forms/PersonalDetailsForm";
import {useService} from "react-service-locator";
import {ReservationService} from "../../services/reservation-service";
import {TripProcessor} from "../../data/json/trip-processor";
import {ArrivalDetailsForm} from "../forms/ArrivalDetailsForm";

export const Arrival = (params: any) => {
    const reservationService = useService(ReservationService);

    useEffect(() => {
        console.log(reservationService.state);
        console.log(TripProcessor.findPrice(reservationService.state.homeFormData, reservationService.state.journeyType))
    }, [reservationService.state]);


    return <SecondPage>
        <div className="row">
            <PersonalDetailsForm/>
            <ArrivalDetailsForm/>
        </div>
    </SecondPage>

}

