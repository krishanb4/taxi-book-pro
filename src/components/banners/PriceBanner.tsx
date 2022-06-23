import "../detailed-form.css"
import React from "react";
import {useService} from "react-service-locator";
import {BookingService} from "../../services/booking-service";

const PriceBanner = () => {
    const bookingService = useService(BookingService);

    return(
        <div className="container pt-5">
            <h1>
                Your Travel Fare is <span
                className="fare">€ {bookingService.arrivalBookingDetails.isBooked()? bookingService.arrivalBookingDetails.getCost():bookingService.departureBookingDetails.getCost()}</span>
            </h1>
            <div className="lead">
                Night Time Charge (Between 22:00 and 06:00) : € 15
            </div>
        </div>
    );
}

export default PriceBanner;