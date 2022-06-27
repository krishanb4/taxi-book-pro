import {Inject, Service, StatefulService} from "react-service-locator";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../config/firebase-config";
import {BookingDetails, PersonalDetails} from "../models/booking-details";
import {JourneyType} from "../enums/journey-type";
import {RecaptchaService} from "./recaptcha-service";

export interface IBookingServiceState {
    isBusy: boolean;
    journeyType: JourneyType;
}

@Service()
export class BookingService extends StatefulService<IBookingServiceState> {

    public journeyType: JourneyType = JourneyType.ARRIVAL_ONE_WAY;
    public arrivalBookingDetails = new BookingDetails();
    public departureBookingDetails = new BookingDetails();
    public personalDetails = new PersonalDetails();

    static readonly initialState: IBookingServiceState = {
        isBusy: false,
        journeyType: JourneyType.ARRIVAL_ONE_WAY,
    };

    @Inject(RecaptchaService)
    private readonly recaptchaService?: RecaptchaService;

    constructor() {
        super(BookingService.initialState);
    }

    public createBooking() {
        const bookingRef = collection(db, 'bookings');
        return addDoc(bookingRef, {
            journeyType: this.journeyType,
            recaptchaToken: this.recaptchaService?.getToken(),
            personalDetails: this.personalDetails.parseJson(),
            arrival: this.arrivalBookingDetails.parseJson(),
            departure: this.departureBookingDetails.parseJson()
        }).then(
            // this.recaptchaService?.setToken(null);

        );
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


    public setArrivalPrice() {
        this.arrivalBookingDetails.setCost(25);
    }

    public setDeparturePrice() {
        this.departureBookingDetails.setCost(25);
    }

    public setJourneyType(value: JourneyType) {
        this.journeyType = value;
        this.setState({...this.state, journeyType:value})
    }

    public getJourneyType(): JourneyType {
        return this.journeyType;
    }

    public validateInitialData(): boolean {
        return true;
    }
}
