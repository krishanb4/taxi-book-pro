import React from "react";
import '../../styles/booking-style.css';
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import DepartureDetailsForm from "../forms/DepartureDetailsForm";
import SecondPage from "./SecondPage";

const Departure = () => {
    return <SecondPage>
        <div className="row">
            <PersonalDetailsForm/>
            <DepartureDetailsForm/>
        </div>
    </SecondPage>
}

export default Departure;
