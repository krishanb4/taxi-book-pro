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

    public static getTripDate(snap: QueryDocumentSnapshot): string {
        if (snap.data().journeyType === 0) {
            return `${snap.data().arrival.pickUpDate} ${snap.data().arrival.pickUpTime}`;
        } else if (snap.data().journeyType === 1) {
            return `${snap.data().arrival.pickUpDate} ${snap.data().arrival.pickUpTime}`;
        } else {
            return `${snap.data().departure.pickUpDate} ${snap.data().departure.pickUpTime}`;
        }
    }
}
