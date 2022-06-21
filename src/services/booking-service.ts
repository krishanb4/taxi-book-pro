import {Service, StatefulService} from "react-service-locator";
import {BookingDetails} from "../models/booking-details";

export interface IBookingServiceState {
    isBusy: boolean;
}

@Service()
export class BookingService extends StatefulService<IBookingServiceState> {

    // public bookingRecord :BookingDetails ;

    static readonly initialState: IBookingServiceState = {
        isBusy: false,
    };

    constructor() {
        super(BookingService.initialState);
    }
    //
    // public getBookingDetails(){
    //     return this.bookingRecord;
    // }
    //
    // public setBookingRecord(name:string){
    //     this.bookingRecord.name =  name;
    // }
}