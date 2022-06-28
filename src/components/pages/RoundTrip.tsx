import React from "react";
import '../../styles/booking-style.css';
import {PersonalDetailsForm} from "../forms/PersonalDetailsForm";
import {SecondPage} from "./SecondPage";
import {ArrivalDetailsForm} from "../forms/ArrivalDetailsForm";
import {DepartureDetailsForm} from "../forms/DepartureDetailsForm";

export const RoundTrip = () => {

    return <SecondPage>
        <div className="row">
            <PersonalDetailsForm/>
            <ArrivalDetailsForm/>
        </div>
        <div className="row row-cols-2">
            <DepartureDetailsForm/>
        </div>
    </SecondPage>

}

