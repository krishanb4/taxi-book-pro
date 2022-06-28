export interface IBookingInfo {
    created: any,
    cost: number,
    pickUpPoint: string,
    pickUpPointOptionalAddress: string,
    dropPoint: string,
    dropPointOptionalAddress: string,
    flightDetailsNote: string,
    flightArrivalDate: Date,
    flightArrivalTime: string,
    isBooked: boolean,
    pickUpDate: Date,
    pickUpTime: string
    flightComeFrom: string,
    flightNumber: string
}