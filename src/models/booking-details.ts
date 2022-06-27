import {JourneyType} from "../enums/journey-type";
import {serverTimestamp} from "firebase/firestore";

export class BookingDetails {

    private _isBooked: boolean = false;
    private _cost: number | null = 0;
    private _journeyType: JourneyType = JourneyType.ARRIVAL_ONE_WAY;
    private _pickUpPoint: string | null = null;
    private _pickUpPointOptionalAddress: string | null = null;
    private _dropPoint: string | null = null;
    private _dropPointOptionalAddress: string | null = null;
    private _flightDetailsNote: string | null = null;
    private _flightArrivalDate: Date = new Date();
    private _pickUpDate: Date = new Date();
    private _flightNumberStr: string | null = null;
    private _flightComeFrom: string | null = null;


    public getFlightComeFrom(): string | null {
        return this._flightComeFrom;
    }

    public setFlightComeFrom(value: string) {
        this._flightComeFrom = value;
    }

    public getFlightNumberStr(): string | null {
        return this._flightNumberStr;
    }

    public setFlightNumberStr(value: string) {
        this._flightNumberStr = value;
    }

    public setPickUpTime(hrs: number, min: number) {
        this._pickUpDate.setHours(hrs);
        this._pickUpDate.setMinutes(min);
    }

    public isBooked(): boolean {
        return this._isBooked;
    }

    public setBookStatus(value: boolean) {
        this._isBooked = value;
    }

    public setFlightArrivalTime(hrs: number, min: number) {
        this._flightArrivalDate.setHours(hrs);
        this._flightArrivalDate.setMinutes(min);
    }

    public getPckUpDate(): Date {
        return this._pickUpDate;
    }

    public setPickUpDate(value: Date) {
        this._pickUpDate.setDate(value.getDate());
    }

    public getFlightArrivalDate(): Date {
        return this._flightArrivalDate;
    }

    public setFlightArrivalDate(value: Date) {
        this._flightArrivalDate.setDate(value.getDate());
    }

    public getFlightDetailsNote(): string | null {
        return this._flightDetailsNote;
    }

    public setFlightDetailsNote(value: string) {
        this._flightDetailsNote = value;
    }

    public getDropPointOptionalAddress(): string | null {
        return this._dropPointOptionalAddress;
    }

    public setDropPointOptionalAddress(value: string) {
        this._dropPointOptionalAddress = value;
    }

    public getPickUpPointOptionalAddress(): string | null {
        return this._pickUpPointOptionalAddress;
    }

    public setPickUpPointOptionalAddress(value: string) {
        this._pickUpPointOptionalAddress = value;
    }

    public getPickUpPoint(): string | null {
        return this._pickUpPoint;
    }

    public setPickUpPoint(value: string | null) {
        this._pickUpPoint = value;
    }

    public getDropPoint(): string | null {
        return this._dropPoint;
    }

    public setDropPoint(value: string | null) {
        this._dropPoint = value;
    }

    public getJourneyType(): JourneyType {
        return this._journeyType;
    }

    public setJourneyType(value: JourneyType) {
        this._journeyType = value;
    }

    public setCost(cost: number): void {
        this._cost = cost;
    }

    public getCost(): number | null {
        return this._cost;
    }

    public parseJson() {
        return {
            created: serverTimestamp(),
            cost: this._cost,
            journeyType: this._journeyType,
            pickUpPoint: this._pickUpPoint,
            pickUpPointOptionalAddress: this._pickUpPointOptionalAddress,
            dropPoint: this._dropPoint,
            dropPointOptionalAddress: this._dropPointOptionalAddress,
            flightDetailsNote: this._flightDetailsNote,
            flightArrivalDate: this._flightArrivalDate,
            isBooked: this._isBooked,
            pickUpDate: this._pickUpDate,
            flightComeFrom:this._flightComeFrom,
            flightNumber:this._flightNumberStr
        }
    }

}

export class PersonalDetails {
    private _name: string | null = null;
    private _email: string | null = null;
    private _phone: string | null = null;
    private _comments: string | null = null;
    private _adultCount: number = 1;
    private _childCount: number = 0;

    public getAdultCount(): number {
        return this._adultCount;
    }

    public setAdultCount(value: number) {
        this._adultCount = value;
    }

    public getChildCount(): number {
        return this._childCount;
    }

    public setChildCount(value: number) {
        this._childCount = value;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public setEmail(email: string | null): void {
        this._email = email;
    }

    public setPhone(phone: string | null): void {
        this._phone = phone;
    }

    public setComment(comments: string | null): void {
        this._comments = comments;
    }

    public getName(): string | null {
        return this._name;
    }

    public getEmail(): string | null {
        return this._email;
    }

    public getPhone(): string | null {
        return this._phone;
    }

    public getComment(): string | null {
        return this._comments;
    }

    public parseJson() {
        return {
            name: this._name,
            email: this._email,
            phone: this._phone,
            comments: this._comments,
            adultCount: this._adultCount,
            childCount: this._childCount,
            created: serverTimestamp(),
        }
    }

}
