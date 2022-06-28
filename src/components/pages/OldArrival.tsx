import React from "react";
import '../../styles/booking-style.css';
import OldPersonalDetailsForm from "../forms/OldPersonalDetailsForm";
import ArrivalDetailsForm from "../forms/ArrivalDetailsForm";
import OldSecondPage from "./OldSecondPage";

const OldArrival = (params: any) => {
    return <OldSecondPage>
        <div className="row">
            <OldPersonalDetailsForm/>
            <ArrivalDetailsForm/>
        </div>
    </OldSecondPage>
}

export default OldArrival;
