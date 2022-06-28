import {Inject, Service, StatefulService} from "react-service-locator";
import {RecaptchaService} from "./recaptcha-service";
import {IHomeData} from "../definitions/i-home-data";
import {IPersonData} from "../definitions/i-person-data";
import {JourneyType} from "../enums/journey-type";
import {IBookingInfo} from "../definitions/i-booking-info";
import {FieldValue, UseFormReturn} from "react-hook-form";
import {TripProcessor} from "../data/json/trip-processor";

export interface IReservationServiceState {
    homeFormData: IHomeData | null;
    personalFormData: IPersonData | null;
    journeyType: JourneyType;
    arrivalFromDetails: IBookingInfo | null;
    departureFormDetails: IBookingInfo | null;
    isFormsReady: boolean;
}

@Service()
export class ReservationService extends StatefulService<IReservationServiceState> {

    static readonly initialState: IReservationServiceState = {
        homeFormData: null,
        personalFormData: null,
        journeyType: JourneyType.ARRIVAL_ONE_WAY,
        arrivalFromDetails: null,
        departureFormDetails: null,
        isFormsReady: false
    };

    @Inject(RecaptchaService)
    private readonly recaptchaService?: RecaptchaService;
    private _homeFormHook: UseFormReturn<FieldValue<any>> | null = null;
    private _personalDetailFormHook: UseFormReturn<FieldValue<any>> | null = null;
    private _arrivalFormHook: UseFormReturn<FieldValue<any>> | null = null;
    private _departureFormHook: UseFormReturn<FieldValue<any>> | null = null;

    constructor() {
        super(ReservationService.initialState);
    }

    public setFormData(data: {
        homeFormData?: IHomeData,
        personalFormData?: IPersonData,
        arrivalFromDetails?: IBookingInfo,
        departureFormDetails?: IBookingInfo

    }): void {
        this.setState({
            ...this.state,
            ...data,
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

    public setFormHooks(hooks: {
        homeFormHook: UseFormReturn<FieldValue<any>>,
        personalDetailFormHook: UseFormReturn<FieldValue<any>>,
        arrivalFormHook: UseFormReturn<FieldValue<any>>,
        departureFormHook: UseFormReturn<FieldValue<any>>,
    }): void {
        this._homeFormHook = hooks.homeFormHook;
        this._personalDetailFormHook = hooks.personalDetailFormHook;
        this._arrivalFormHook = hooks.arrivalFormHook;
        this._departureFormHook = hooks.departureFormHook;

        this.setState({
            ...this.state,
            isFormsReady: true
        })
    }

    get homeFormHook(): UseFormReturn<FieldValue<any>> {
        if (!this._homeFormHook) throw Error("Home Form Hook Not Found!.");
        return this._homeFormHook;
    }

    get personalDetailFormHook(): UseFormReturn<FieldValue<any>> {
        if (!this._personalDetailFormHook) throw Error("Home Form Hook Not Found!.");
        return this._personalDetailFormHook;
    }

    get arrivalFormHook(): UseFormReturn<FieldValue<any>> {
        if (!this._arrivalFormHook) throw Error("Home Form Hook Not Found!.");
        return this._arrivalFormHook;
    }

    get departureFormHook(): UseFormReturn<FieldValue<any>> {
        if (!this._departureFormHook) throw Error("Home Form Hook Not Found!.");
        return this._departureFormHook;
    }

    public submitReservation(): void {

    }

    get tripPrice(): string | null {
        let fetchPrice = TripProcessor.findPrice(this.state.homeFormData, this.state.journeyType);
        if (!fetchPrice) {
            return "N/A";
        } else {
            return fetchPrice;
        }
    }

    public syncHomeDataToSecondPageData() {
        this.personalDetailFormHook.setValue("adultCount", this.state.homeFormData?.adultCount);
        this.personalDetailFormHook.setValue("childCount", this.state.homeFormData?.childCount);

        switch (this.state.journeyType) {
            case JourneyType.ARRIVAL_ONE_WAY:
                this.arrivalFormHook.setValue("pickUpPoint", this.state.homeFormData?.pickUpPoint);
                this.arrivalFormHook.setValue("dropPoint", this.state.homeFormData?.dropPoint);
                break;
            case JourneyType.DEPARTURE:
                this.departureFormHook.setValue("pickUpPoint", this.state.homeFormData?.pickUpPoint);
                this.departureFormHook.setValue("dropPoint", this.state.homeFormData?.dropPoint);
                break;
            case JourneyType.ROUND_TRIP:
                this.arrivalFormHook.setValue("pickUpPoint", this.state.homeFormData?.pickUpPoint);
                this.arrivalFormHook.setValue("dropPoint", this.state.homeFormData?.dropPoint);
                this.departureFormHook.setValue("pickUpPoint", this.state.homeFormData?.dropPoint);
                this.departureFormHook.setValue("dropPoint", this.state.homeFormData?.pickUpPoint);
                break;
        }
    }

    public syncSecondPageDataToHomePage() {
        if (this.state.personalFormData?.adultCount) this.homeFormHook.setValue("adultCount", this.state.personalFormData.adultCount);
        if (this.state.personalFormData?.childCount) this.homeFormHook.setValue("childCount", this.state.personalFormData.childCount);
    }
}
