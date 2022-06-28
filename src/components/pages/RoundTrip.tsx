import React from "react";
import '../../styles/booking-style.css';
import OldPersonalDetailsForm from "../forms/OldPersonalDetailsForm";
import DepartureDetailsForm from "../forms/DepartureDetailsForm";
import ArrivalDetailsForm from "../forms/ArrivalDetailsForm";
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
            <ArrivalDetailsForm/>
        </div>
        <div className="row row-cols-2">
            <DepartureDetailsForm/>
        </div>
    </OldSecondPage>

}

export default RoundTrip;
