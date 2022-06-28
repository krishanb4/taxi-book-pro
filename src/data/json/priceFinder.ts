import {BookingDetails, PersonalDetails} from "../../models/booking-details";
import {JourneyType} from "../../enums/journey-type";
import data2 from "./all-trips.json"
import * as _ from "lodash";
import {BookingService} from "../../services/booking-service";

function getPersonVerification(personalDetails: PersonalDetails) {
    return personalDetails.getAdultCount() + personalDetails.getChildCount() === 1 || personalDetails.getAdultCount() + personalDetails.getChildCount() === 2 || personalDetails.getAdultCount() + personalDetails.getChildCount() === 3;
}

function findPrice(bookingDetails: BookingDetails, personalDetails: PersonalDetails, bookingService: BookingService): any {
    console.log("find price" +bookingService.getJourneyType() + " " + bookingDetails.getPickUpPoint() +" to " +bookingDetails.getDropPoint())
    let trip: string;
    let selectedPrice:any;
    if (bookingService.getJourneyType() === JourneyType.ARRIVAL_ONE_WAY) {
        trip = "ONE WAY";
    } else if (bookingService.getJourneyType() === JourneyType.DEPARTURE) {
        trip = "ONE WAY";
    } else {
        trip = "ROUND TRIP";
    }

    let selected : {list: Record<string, any>} | undefined = _.find(data2, function (value, key, collection) {
        return value.trip === trip && value.from === bookingDetails.getPickUpPoint() && value.to === bookingDetails.getDropPoint();
    });
    if (getPersonVerification(personalDetails)) {
        selectedPrice =  selected?.list["1-3 P."];
    } else {
        selectedPrice =  selected?.list[(personalDetails.getAdultCount() + personalDetails.getChildCount()).toString() + " P."];
    }

    if(!selectedPrice){
        selected  = _.find(data2, function (value, key, collection) {
            return value.trip === trip && value.to === bookingDetails.getPickUpPoint() && value.from === bookingDetails.getDropPoint();
        });
        if (getPersonVerification(personalDetails)) {
            selectedPrice =  selected?.list["1-3 P."];
        } else {
            selectedPrice =  selected?.list[(personalDetails.getAdultCount() + personalDetails.getChildCount()).toString() + " P."];
        }
    }

    console.log(trip)
    return selectedPrice;
}

export {findPrice};

