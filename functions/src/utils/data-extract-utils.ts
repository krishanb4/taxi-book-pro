// eslint-disable-next-line require-jsdoc
import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import _ from "lodash";
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;

// eslint-disable-next-line require-jsdoc
export class DataExtractUtils {

    public static getTripId(snap: QueryDocumentSnapshot): string {
        return snap.id;
    }

    public static getTrip(snap: QueryDocumentSnapshot): string {
        if (snap.data().journeyType === 0) {
            return "Arrival";
        } else if (snap.data().journeyType === 1) {
            return "Round Trip";
        } else {
            return "Departure";
        }
    }

    public static getCost(snap: QueryDocumentSnapshot): string {
        return snap.data().cost;
    }

    public static getCustomerName(snap: QueryDocumentSnapshot): string {
        return snap.data().personalDetails.name;
    }

    public static getPickupPoint(snap: QueryDocumentSnapshot): string {
        if (snap.data().journeyType === 0) {
            return snap.data().arrival.pickUpPoint;
        } else if (snap.data().journeyType === 1) {
            return snap.data().arrival.pickUpPoint;
        } else {
            return snap.data().departure.pickUpPoint;
        }
    }

    public static getDestinationPoint(snap: QueryDocumentSnapshot): string {
        if (snap.data().journeyType === 0) {
            return snap.data().arrival.dropPoint;
        } else if (snap.data().journeyType === 1) {
            return snap.data().arrival.dropPoint;
        } else {
            return snap.data().departure.dropPoint;
        }
    }

    public static getPersonCount(snap: QueryDocumentSnapshot): number {
        return _.toNumber(snap.data().personalDetails.adultCount) + _.toNumber(snap.data().personalDetails.childCount);
    }

    public static getBookedDate(snap: QueryDocumentSnapshot): string {
        const created: Timestamp = snap.data().created;
        return created.toDate().toUTCString();
    }

    public static getPhone(snap: QueryDocumentSnapshot): string {
        return snap.data().personalDetails.phone;
    }

    public static getEmail(snap: QueryDocumentSnapshot): string {
        return snap.data().personalDetails.email;
    }

    public static getComments(snap: QueryDocumentSnapshot): string {
        return snap.data().personalDetails.comment;
    }

    public static getTripDate(snap: QueryDocumentSnapshot): string {
        if (snap.data().journeyType === 0) {
            return `${snap.data().arrival.pickUpDate} ${snap.data().arrival.pickUpTime}`;
        } else if (snap.data().journeyType === 1) {
            return `${snap.data().arrival.pickUpDate} ${snap.data().arrival.pickUpTime}`;
        } else {
            return `${snap.data().departure.pickUpDate} ${snap.data().departure.pickUpTime}`;
        }
    }

    static getArrivalDropPoint(snap: QueryDocumentSnapshot) {
        return snap.data().arrival?.dropPoint ? snap.data().arrival.dropPoint : "";
    }

    static getArrivalDropPointAddress(snap: QueryDocumentSnapshot) {
        return snap.data().arrival?.dropPointOptionalAddress ? snap.data().arrival.dropPointOptionalAddress : "";
    }

    static getFlightArrivalDate(snap: QueryDocumentSnapshot) {
        return snap.data().arrival?.flightArrivalDate ? `${snap.data().arrival.flightArrivalDate} ${snap.data().arrival.flightArrivalTime}` : "";
    }

    static getArrivalFlightComeFrom(snap: QueryDocumentSnapshot) {
        return snap.data().arrival?.flightComeFrom ? snap.data().arrival.flightComeFrom : "";
    }

    static getArrivalFlightNumber(snap: QueryDocumentSnapshot) {
        return snap.data().arrival?.flightNumber ? snap.data().arrival.flightNumber : "";
    }

    static getArrivalPickupPointAddress(snap: QueryDocumentSnapshot) {
        return snap.data().arrival?.pickUpPointOptionalAddress ? snap.data().arrival.pickUpPointOptionalAddress : "";
    }

    static getArrivalPickupDate(snap: QueryDocumentSnapshot) {
        return snap.data().arrival?.pickUpDate ? `${snap.data().arrival.pickUpDate} ${snap.data().arrival.pickUpTime}` : "";
    }

    static getDepartureDropPoint(snap: QueryDocumentSnapshot) {
        return snap.data().departure?.dropPoint ? snap.data().departure.dropPoint : "";
    }

    static getDepartureDropPointAddress(snap: QueryDocumentSnapshot) {
        return snap.data().departure?.dropPointOptionalAddress ? snap.data().departure.dropPointOptionalAddress : "";
    }

    static getDeparturePickupDate(snap: QueryDocumentSnapshot) {
        return snap.data().departure?.pickUpDate ? `${snap.data().departure.pickUpDate} ${snap.data().departure.pickUpTime}` : "";
    }

    static getDeparturePickupPointAddress(snap: QueryDocumentSnapshot) {
        return snap.data().departure?.pickUpPointOptionalAddress ? snap.data().departure.pickUpPointOptionalAddress : "";
    }

    static getDeparturePickupPoint(snap: QueryDocumentSnapshot) {
        return snap.data().departure?.pickUpPoint ? snap.data().departure.pickUpPoint : "";
    }

}
