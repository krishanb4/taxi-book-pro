import {Inject, Service, StatefulService} from "react-service-locator";
import {RecaptchaService} from "./recaptcha-service";
import {IHomeData} from "../definitions/i-home-data";
import {IPersonData} from "../definitions/i-person-data";
import {JourneyType} from "../enums/journey-type";
import {IBookingInfo} from "../definitions/i-booking-info";
import {FieldValue, UseFormReturn} from "react-hook-form";
import {TripProcessor} from "../data/json/trip-processor";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "../config/firebase-config";
import {AppConfig} from "../config/app-config";
import Helpers from "../utils/helpers";
import {UiService} from "./ui-service";

export interface IReservationServiceState {
    homeFormData: IHomeData | null;
    personalFormData: IPersonData | null;
    journeyType: JourneyType;
    arrivalFromDetails: IBookingInfo | null;
    departureFormDetails: IBookingInfo | null;
    isFormsReady: boolean;
    isSubmitting: boolean;
}

interface IReservationSubmissionData {
    journeyType: JourneyType;
    arrival: IBookingInfo | null;
    created: any;
    recaptchaToken: string | null | undefined;
    personalDetails: IPersonData | null;
    departure: IBookingInfo | null
}

@Service()
export class ReservationService extends StatefulService<IReservationServiceState> {

    static readonly initialState: IReservationServiceState = {
        homeFormData: null,
        personalFormData: null,
        journeyType: JourneyType.ARRIVAL_ONE_WAY,
        arrivalFromDetails: null,
        departureFormDetails: null,
        isFormsReady: false,
        isSubmitting: false
    };

    @Inject(RecaptchaService)
    private readonly recaptchaService?: RecaptchaService;
    @Inject(UiService)
    private readonly uiService?: UiService;
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

    public async onSecondPageSubmit(): Promise<boolean> {
        this.syncSecondPageDataToHomePage();
        if (!await this.personalDetailFormHook.trigger(undefined, {shouldFocus: true})
            || !await this.arrivalFormHook.trigger(undefined, {shouldFocus: true})
            || !await this.departureFormHook.trigger(undefined, {shouldFocus: true})) {
            await this.uiService?.addMessageAlert({
                title: 'Your reservation is incomplete.',
                subtitle: 'Please fill out all the required fields.'
            })
            return false;
        }

        this.setState({
            ...this.state,
            isSubmitting: true
        })
        console.log("On Second Page Submit")
        const bookingRef = collection(db, 'bookings');
        const submissionData: IReservationSubmissionData = {
            created: serverTimestamp(),
            journeyType: this.state.journeyType,
            recaptchaToken: this.recaptchaService?.getToken(),
            personalDetails: this.state.personalFormData,
            arrival: this.state.arrivalFromDetails,
            departure: this.state.departureFormDetails
        };
        console.log(submissionData);
        if (AppConfig.isFakeSubmit) {
            await Helpers.sleep(5000);
        } else {
            await addDoc(bookingRef, submissionData);
        }
        this.setState({
            ...this.state,
            isSubmitting: false,
        })
        this.recaptchaService!.clearToken();
        await this.uiService?.addMessageAlert({
            title: 'Reservation Submitted!',
            subtitle: 'We will get back to you shortly. You will receive a mail with the details of the reservation.'
        })
        return true;
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

    get homePageTripPrice(): string | null {
        let fetchPrice = TripProcessor.findPrice(this.state.homeFormData, this.state.journeyType);
        if (!fetchPrice) {
            return "N/A";
        } else {
            return fetchPrice;
        }
    }

    get secondPageTripPrice(): string | null {
        let fetchedPrice: string | null = null;
        switch (this.state.journeyType) {
            case JourneyType.ARRIVAL_ONE_WAY:
                fetchedPrice = TripProcessor.findPrice({
                    dropPoint: this.state.arrivalFromDetails?.dropPoint ?? "",
                    pickUpPoint: this.state.arrivalFromDetails?.pickUpPoint ?? "",
                    childCount: this.state.personalFormData?.childCount ?? "",
                    adultCount: this.state.personalFormData?.adultCount ?? ""
                }, this.state.journeyType);
                break;
            case JourneyType.DEPARTURE:
                fetchedPrice = TripProcessor.findPrice({
                    dropPoint: this.state.departureFormDetails?.dropPoint ?? "",
                    pickUpPoint: this.state.departureFormDetails?.pickUpPoint ?? "",
                    childCount: this.state.personalFormData?.childCount ?? "",
                    adultCount: this.state.personalFormData?.adultCount ?? ""
                }, this.state.journeyType);
                break;
            case JourneyType.ROUND_TRIP:
                if (this.state.departureFormDetails?.dropPoint === this.state.arrivalFromDetails?.pickUpPoint && this.state.departureFormDetails?.pickUpPoint === this.state.arrivalFromDetails?.dropPoint) {
                    fetchedPrice = TripProcessor.findPrice({
                        dropPoint: this.state.arrivalFromDetails?.dropPoint ?? "",
                        pickUpPoint: this.state.arrivalFromDetails?.pickUpPoint ?? "",
                        childCount: this.state.personalFormData?.childCount ?? "",
                        adultCount: this.state.personalFormData?.adultCount ?? ""
                    }, this.state.journeyType);
                }
                break;
        }

        if (!fetchedPrice) {
            return "N/A";
        } else {
            return fetchedPrice;
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
