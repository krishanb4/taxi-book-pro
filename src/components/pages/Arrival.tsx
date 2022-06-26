import React from "react";
import '../../styles/booking-style.css';
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import ArrivalDetailsForm from "../forms/ArrivalDetailsForm";
import SecondPage from "./SecondPage";

const Arrival = (params: any) => {
    return <SecondPage>
        <div className="row">
            <PersonalDetailsForm/>
            <ArrivalDetailsForm/>
        </div>
    </SecondPage>
}

export default Arrival;
