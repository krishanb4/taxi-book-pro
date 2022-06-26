import React from "react";
import '../../styles/booking-style.css';
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import DepartureDetailsForm from "../forms/DepartureDetailsForm";
import ArrivalDetailsForm from "../forms/ArrivalDetailsForm";
import SecondPage from "./SecondPage";

const RoundTrip = () => {
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

export default RoundTrip;
