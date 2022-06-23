import {Service, StatefulService} from "react-service-locator";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../config/firebase-config";
import {BookingDetails, PersonalDetails} from "../models/booking-details";
import {JourneyType} from "../enums/journey-type";

export interface IBookingServiceState {
    isBusy: boolean;
}

@Service()
export class BookingService extends StatefulService<IBookingServiceState> {

    public journeyType: JourneyType = JourneyType.ARRIVAL_ONE_WAY;
    public arrivalBookingDetails = new BookingDetails();
    public departureBookingDetails = new BookingDetails();
    public personalDetails = new PersonalDetails();

    static readonly initialState: IBookingServiceState = {
        isBusy: false,
    };

    constructor() {
        super(BookingService.initialState);
    }

    public createBooking() {
        const bookingRef = collection(db, 'bookings');
        return addDoc(bookingRef, {
            personalDetails: this.personalDetails.parseJson(),
            arrival: this.arrivalBookingDetails.parseJson(),
            departure: this.departureBookingDetails.parseJson()
        });
    };

    public resetBookingDetails() {
        this.arrivalBookingDetails = new BookingDetails();
        this.departureBookingDetails = new BookingDetails();
        this.personalDetails = new PersonalDetails();
    }

    public getBookingDetails(): BookingDetails {
        return this.arrivalBookingDetails;
    }

    public async getDestinations(): Promise<string[]> {
        return [""];
    }

    public async getPrice(): Promise<number> { // TODO - fetch prices from cloud
        if (this.journeyType === JourneyType.DEPARTURE) {
            return 25;
        } else if(this.journeyType === JourneyType.ARRIVAL_ONE_WAY){
            return 30;
        }else{
            return 40;
        }
    }

    public setArrivalPrice(){
        this.arrivalBookingDetails.setCost(25);
    }

    public setDeparturePrice(){
        this.departureBookingDetails.setCost(25);
    }

    public setJourneyType(value: JourneyType) {
        this.journeyType = value;
    }

    public getJourneyType(): JourneyType {
        return this.journeyType;
    }

}