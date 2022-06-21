import {Service, StatefulService} from "react-service-locator";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../config/firebase-config";
import {BookingDetails} from "../models/booking-details";

export interface IBookingServiceState {
    isBusy: boolean;
}

@Service()
export class BookingService extends StatefulService<IBookingServiceState> {

    static readonly initialState: IBookingServiceState = {
        isBusy: false,
    };

    constructor() {
        super(BookingService.initialState);
    }

    public createBooking(bookingDetails: BookingDetails) {
        const bookingRef = collection(db, 'bookings');
        console.log("Called create");
        return addDoc(bookingRef, {
            created: serverTimestamp(),
            name: bookingDetails.getName,
            email: bookingDetails.getEmail,
            phone: bookingDetails.getPhone,
            cost: bookingDetails.getCost,
            comments:bookingDetails.getComment
        });
    };


}