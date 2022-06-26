import "../../styles/booking-style.css"
import React from "react";
import {useService} from "react-service-locator";
import {BookingService} from "../../services/booking-service";
import ReservationButton from "../items/ReservationButton";

const PriceBanner = (params: { formId: string | undefined; }) => {
    const bookingService = useService(BookingService);

    return(
        <div className="pb-5 fare-section">
            <div className="container fare-main">
                <div className="row g-4">
                    <div className="col-md">
                        <span className="your-travel-fare">Your Travel Fare is <span
                            className="fare">{bookingService.arrivalBookingDetails.isBooked()? bookingService.arrivalBookingDetails.getCost():bookingService.departureBookingDetails.getCost()}</span></span><br/>
                        <span className="nighttime-charge">Night Time Charge (Between 22:00 and 06:00) : € 15</span>
                    </div>
                    <ReservationButton formId={params.formId}/>
                </div>
            </div>
        </div>
    );
}

export default PriceBanner;