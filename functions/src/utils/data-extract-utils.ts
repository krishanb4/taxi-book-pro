// eslint-disable-next-line require-jsdoc
import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";

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

    public static getCost(snap: QueryDocumentSnapshot): number {
        if (snap.data().journeyType === 0) {
            return snap.data().arrival.cost;
        } else if (snap.data().journeyType === 1) {
            return snap.data().arrival.cost;
        } else {
            return snap.data().departure.cost;
        }
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
        return snap.data().personalDetails.adultCount + snap.data().personalDetails.childCount;
    }

    public static getBookedDate(snap: QueryDocumentSnapshot): string {
        return snap.data().created.toString();
    }

    public static getPhone(snap: QueryDocumentSnapshot): string {
        return snap.data().personalDetails.phone;
    }

    public static getEmail(snap: QueryDocumentSnapshot): string {
        return snap.data().personalDetails.email;
    }

    public static getTripDate(snap: QueryDocumentSnapshot): string {
        if (snap.data().journeyType === 0) {
            return snap.data().arrival.pickUpDate;
        } else if (snap.data().journeyType === 1) {
            return snap.data().arrival.pickUpDate;
        } else {
            return snap.data().departure.pickUpDate;
        }
    }
}
