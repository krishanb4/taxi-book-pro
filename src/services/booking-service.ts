import {Service, StatefulService} from "react-service-locator";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../config/firebase-config";
import {BookingDetails} from "../models/booking-details";

export interface IBookingServiceState {
    isBusy: boolean;
}

@Service()
export class BookingService extends StatefulService<IBookingServiceState> {

    public bookingDetails = new BookingDetails();

    static readonly initialState: IBookingServiceState = {
        isBusy: false,
    };

    constructor() {
        super(BookingService.initialState);
    }

    public createBooking() {
        const bookingRef = collection(db, 'bookings');
        return addDoc(bookingRef, this.bookingDetails.parseJson());
    };

    public resetBookingDetails(){
        this.bookingDetails = new BookingDetails();
    }

    public getBookingDetails():BookingDetails{
        return this.bookingDetails;
    }

    public async getDestinations():Promise<string[]>{
        return [""];
    }

    public async getPrice():Promise<number>{
        return 25;
    }


}