import {BookingDetails, PersonalDetails} from "../models/booking-details";
import {findPrice} from "../data/json/priceFinder";
import {BookingService} from "../services/booking-service";

class Helpers {
    public static validationBeforeFetchPrice(bookingDetails: BookingDetails, personalDetails: PersonalDetails): boolean {
        return personalDetails.getAdultCount() !== 0 && bookingDetails.getPickUpPoint() !== null && bookingDetails.getDropPoint() !== null;
    }

    public static async fetchPrice(bookingService: BookingService) {
        if (Helpers.validationBeforeFetchPrice(bookingService.arrivalBookingDetails, bookingService.personalDetails) ||
            Helpers.validationBeforeFetchPrice(bookingService.departureBookingDetails, bookingService.personalDetails)) {
            let p: any;
            if (bookingService.arrivalBookingDetails.isBooked()) {
                p = findPrice(bookingService.arrivalBookingDetails, bookingService.personalDetails, bookingService);
            } else {
                p = findPrice(bookingService.departureBookingDetails, bookingService.personalDetails, bookingService);
            }

            if (p === undefined) {
                return undefined;
            } else {
                if (bookingService.arrivalBookingDetails.isBooked() && bookingService.departureBookingDetails.isBooked()) {
                    bookingService.arrivalBookingDetails.setCost(parseInt(p.replace("€ ", "")))
                    bookingService.departureBookingDetails.setCost(parseInt(p.replace("€ ", "")))
                } else if (bookingService.arrivalBookingDetails.isBooked()) {
                    bookingService.arrivalBookingDetails.setCost(parseInt(p.replace("€ ", "")))
                } else {
                    bookingService.departureBookingDetails.setCost(parseInt(p.replace("€ ", "")))
                }
                return p;
            }
        } else {
            console.log("Didnt Fetch Yet");
        }
    }
}

export default Helpers;
