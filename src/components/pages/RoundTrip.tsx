import React from "react";
import '../../styles/booking-style.css';
import OldPersonalDetailsForm from "../forms/OldPersonalDetailsForm";
import DepartureDetailsForm from "../forms/DepartureDetailsForm";
import OldArrivalDetailsForm from "../forms/OldArrivalDetailsForm";
import OldSecondPage from "./OldSecondPage";
import {useService} from "react-service-locator";
import {BookingService} from "../../services/booking-service";

const RoundTrip = () => {
    const bookingService = useService(BookingService);

    // function priceFetch() {
    //     if(bookingService.arrivalBookingDetails.getPickUpPoint()==)
    // }
    return <OldSecondPage>
        <div className="row">
            <OldPersonalDetailsForm/>
            <OldArrivalDetailsForm/>
        </div>
        <div className="row row-cols-2">
            <DepartureDetailsForm/>
        </div>
    </OldSecondPage>

}

export default RoundTrip;
