import {Inject, Service, StatefulService} from "react-service-locator";
import {RecaptchaService} from "./recaptcha-service";
import {IHomeData} from "../definitions/i-home-data";
import {IPersonData} from "../definitions/i-person-data";
import {JourneyType} from "../enums/journey-type";
import {IBookingInfo} from "../definitions/i-booking-info";

export interface IReservationServiceState {
    homeFormData: IHomeData | null;
    personalFormData: IPersonData | null;
    journeyType: JourneyType;
    arrivalFromDetails: IBookingInfo | null;
    departureFormDetails: IBookingInfo | null;
}

@Service()
export class ReservationService extends StatefulService<IReservationServiceState> {


    static readonly initialState: IReservationServiceState = {
        homeFormData: null,
        personalFormData: null,
        journeyType: JourneyType.ARRIVAL_ONE_WAY,
        arrivalFromDetails: null,
        departureFormDetails: null,
    };

    @Inject(RecaptchaService)
    private readonly recaptchaService?: RecaptchaService;

    constructor() {
        super(ReservationService.initialState);
    }

    public setFormData(data: {
        homeFormData?: IHomeData,
        personalFormData?: IPersonData,
        arrivalFromDetails?: IBookingInfo,
        departureFormDetails?: IBookingInfo

    }): void {
        const homeData = data.homeFormData ?? this.state.homeFormData;
        const personalData = data.personalFormData ?? this.state.personalFormData;
        const arrivalDetails = data.arrivalFromDetails ?? this.state.arrivalFromDetails;
        const departureDetails = data.departureFormDetails ?? this.state.departureFormDetails;

        this.setState({
            homeFormData: homeData,
            personalFormData: personalData,
            arrivalFromDetails: arrivalDetails,
            departureFormDetails: departureDetails
        })
    }

    public setJourneyType(mode: JourneyType): void {
        this.setState({
            ...this.state,
            journeyType: mode
        })
    }

    public onSecondPageSubmit() {
        console.log("On Second Page Submit")
    }
}
