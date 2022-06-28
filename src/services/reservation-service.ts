import {Inject, Service, StatefulService} from "react-service-locator";
import {RecaptchaService} from "./recaptcha-service";
import {IHomeData} from "../definitions/i-home-data";
import {IPersonData} from "../definitions/i-person-data";

export interface IReservationServiceState {
    homeFormData: IHomeData | null;
    personalFormData: IPersonData | null;
}

@Service()
export class ReservationService extends StatefulService<IReservationServiceState> {


    static readonly initialState: IReservationServiceState = {
        homeFormData: null,
        personalFormData: null
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

}
