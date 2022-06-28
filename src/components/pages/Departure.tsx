import React, {useEffect} from "react";
import '../../styles/booking-style.css';
import {PersonalDetailsForm} from "../forms/PersonalDetailsForm";
import {SecondPage} from "./SecondPage";
import {useService} from "react-service-locator";
import {ReservationService} from "../../services/reservation-service";
import {TripProcessor} from "../../data/json/trip-processor";
import {DepartureDetailsForm} from "../forms/DepartureDetailsForm";

export const Departure = () => {
    const reservationService = useService(ReservationService);

    useEffect(() => {
        console.log(reservationService.state);
        console.log(TripProcessor.findPrice(reservationService.state.homeFormData, reservationService.state.journeyType))
    }, [reservationService.state]);

    return <SecondPage>
        <div className="row">
            <PersonalDetailsForm/>
            <DepartureDetailsForm/>
        </div>
    </SecondPage>
}

