import React from "react";
import '../../styles/booking-style.css';
import OldPersonalDetailsForm from "../forms/OldPersonalDetailsForm";
import DepartureDetailsForm from "../forms/DepartureDetailsForm";
import OldSecondPage from "./OldSecondPage";

const Departure = () => {
    return <OldSecondPage>
        <div className="row">
            <OldPersonalDetailsForm/>
            <DepartureDetailsForm/>
        </div>
    </OldSecondPage>
}

export default Departure;
