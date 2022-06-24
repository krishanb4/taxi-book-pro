import {BookingDetails, PersonalDetails} from "../../models/booking-details";
import {JourneyType} from "../../enums/journey-type";
import data2 from "./all-trips.json"
import * as _ from "lodash";
import {BookingService} from "../../services/booking-service";

function findPrice2(bookingDetails: BookingDetails, personalDetails: PersonalDetails, bookingService: BookingService): any {
    let trip: string;
    if (bookingService.getJourneyType() === JourneyType.ARRIVAL_ONE_WAY) {
        trip = "ONE WAY";
    } else if (bookingService.getJourneyType() === JourneyType.DEPARTURE) {
        trip = "ONE WAY";
    } else {
        trip = "ROUND TRIP";
    }

    let selected = _.find(data2, function (value, key, collection) {
        return value.trip === trip && value.from === bookingDetails.getPickUpPoint() && value.to === bookingDetails.getDropPoint();
    });

    if (personalDetails.getAdultCount() + personalDetails.getChildCount() === 1 || personalDetails.getAdultCount() + personalDetails.getChildCount() === 2 || personalDetails.getAdultCount() + personalDetails.getChildCount() === 3) {
        return eval(`selected?.list["1-3 P."]`);
    } else {
        return eval(`selected?.list[(personalDetails.getAdultCount() + personalDetails.getChildCount()).toString() + " P."]`);
    }
}

export {findPrice2};

