import {BookingDetails, PersonalDetails} from "../models/booking-details";

class Helpers {
    public static validationBeforeFetchPrice(bookingDetails: BookingDetails, personalDetails:PersonalDetails): boolean {
        if (personalDetails.getAdultCount() !== 0 && bookingDetails.getPickUpPoint() !== null && bookingDetails.getDropPoint() !== null) {
            return true;
        } else {
            return false;
        }

    }
}
export default Helpers;