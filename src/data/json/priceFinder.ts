import {PersonalDetails} from "../../models/booking-details";

// import {BookingService} from "../../services/booking-service";

function getPersonVerification(personalDetails: PersonalDetails) {
    return personalDetails.getAdultCount() + personalDetails.getChildCount() === 1 || personalDetails.getAdultCount() + personalDetails.getChildCount() === 2 || personalDetails.getAdultCount() + personalDetails.getChildCount() === 3;
}


export {};

