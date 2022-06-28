import React from "react";
import '../../styles/booking-style.css';
import OldPersonalDetailsForm from "../forms/OldPersonalDetailsForm";
import OldArrivalDetailsForm from "../forms/OldArrivalDetailsForm";
import OldSecondPage from "./OldSecondPage";

const OldArrival = (params: any) => {
    return <OldSecondPage>
        <div className="row">
            <OldPersonalDetailsForm/>
            <OldArrivalDetailsForm/>
        </div>
    </OldSecondPage>
}

export default OldArrival;
