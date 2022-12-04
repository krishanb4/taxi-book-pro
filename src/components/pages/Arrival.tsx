import React from "react";
import '../../styles/booking-style.css';
import {SecondPage} from "./SecondPage";
import {PersonalDetailsForm} from "../forms/PersonalDetailsForm";
import {ArrivalDetailsForm} from "../forms/ArrivalDetailsForm";

export const Arrival = (params: any) => {
    return <SecondPage>
        <div className="row">
            <PersonalDetailsForm/>
            <ArrivalDetailsForm/>
        </div>
    </SecondPage>

}

