import {JourneyType} from "../enums/journey-type";

interface PersonalDetails extends Record<string, any> {
    name: string | undefined;
    email: string | undefined,
    phone: number | undefined,
}

export class BookingDetails {

    private _name: string | null = null;
    private _email: string | null = null;
    private _phone: string | null = null;
    private _comments: string | null = null;
    private _cost: number | null = null;
    private _adultCount: number = 0;
    private _childCount: number = 0;
    private _journeyType: JourneyType = JourneyType.ARRIVAL_ONE_WAY;
    private _pickUpPoint: string | null = null;
    private _pickUpPointOptionalAddress: string | null = null;
    private _dropPoint: string | null = null;
    private _dropPointOptionalAddress: string | null = null;
    private _flightDetailsNote: string | null = null;

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

    public setCost(cost: number): void {
        this._cost = cost;
    }

    public setComment(comments: string | null): void {
        this._comments = comments;
    }

    public get getName(): string | null {
        return this._name;
    }

    public get getEmail(): string | null {
        return this._email;
    }

    public get getPhone(): string | null {
        return this._phone;
    }

    public get getCost(): number | null {
        return this._cost;
    }

    public get getComment(): string | null {
        return this._comments;
    }


}
