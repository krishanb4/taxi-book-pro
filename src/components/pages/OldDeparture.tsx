import React from "react";
import '../../styles/booking-style.css';
import OldPersonalDetailsForm from "../forms/OldPersonalDetailsForm";
import OldDepartureDetailsForm from "../forms/OldDepartureDetailsForm";
import OldSecondPage from "./OldSecondPage";

const OldDeparture = () => {
    return <OldSecondPage>
        <div className="row">
            <OldPersonalDetailsForm/>
            <OldDepartureDetailsForm/>
        </div>
    </OldSecondPage>
}

export default OldDeparture;
