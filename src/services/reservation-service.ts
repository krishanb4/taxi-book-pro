import {Inject, Service, StatefulService} from "react-service-locator";
import {RecaptchaService} from "./recaptcha-service";
import {IHomeData} from "../definitions/i-home-data";
import {IPersonData} from "../definitions/i-person-data";
import {JourneyType} from "../enums/journey-type";

export interface IReservationServiceState {
    homeFormData: IHomeData | null;
    personalFormData: IPersonData | null;
    journeyType: JourneyType;
}

@Service()
export class ReservationService extends StatefulService<IReservationServiceState> {


    static readonly initialState: IReservationServiceState = {
        homeFormData: null,
        personalFormData: null,
        journeyType: JourneyType.ARRIVAL_ONE_WAY
    };

    @Inject(RecaptchaService)
    private readonly recaptchaService?: RecaptchaService;

    constructor() {
        super(ReservationService.initialState);
    }

    public setFormData(data: {
        homeFormData?: IHomeData,
        personalFormData?: IPersonData
    }): void {
        const homeData = data.homeFormData ?? this.state.homeFormData;
        const personalData = data.personalFormData ?? this.state.personalFormData;

        this.setState({homeFormData: homeData, personalFormData: personalData})
    }

    public setJourneyType(mode: JourneyType): void {
        this.setState({
            ...this.state,
            journeyType: mode
        })
    }
}
