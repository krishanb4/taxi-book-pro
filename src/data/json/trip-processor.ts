import {JourneyType} from "../../enums/journey-type";
import {allTrips} from "../../definitions/all-trip-data";

export interface ITripDataUnit {
    "trip": string;
    "mode": string;
    "from": string;
    "to": string;
    list: Record<string, any>;
}

export interface IPriceCalculation {
    pickUpPoint: string;
    dropPoint: string;
    adultCount: string;
    childCount: string;
}

export class TripProcessor {
    public static findPrice(homeData: IPriceCalculation | null, journeyType: JourneyType): string | null {
        if (!homeData) return null;
        let selectedPrice: any;
        const trip = this.getJourneyTypeString(journeyType);

        let selected: ITripDataUnit | undefined = allTrips.find((value: ITripDataUnit) => {
            if (value.trip !== trip) return false;
            const isForwardMatch = value.from === homeData.pickUpPoint && value.to === homeData.dropPoint;
            const isBackwardMatch = value.to === homeData.pickUpPoint && value.from === homeData.dropPoint;
            return isForwardMatch || isBackwardMatch;
        });
        selectedPrice = selected?.list[this.getPriceKey(homeData)];
        console.log(trip)
        return selectedPrice;
    }

    private static getJourneyTypeString(journeyType: JourneyType) {
        if (journeyType === JourneyType.ARRIVAL_ONE_WAY) {
            return "ONE WAY";
        } else if (journeyType === JourneyType.DEPARTURE) {
            return "ONE WAY";
        } else {
            return "ROUND TRIP";
        }
    }

    private static getPriceKey(personCounts: {
        adultCount: string;
        childCount: string;
    }) {
        const adultCount = parseInt(personCounts.adultCount ?? '0');
        const childCount = parseInt(personCounts.childCount ?? '0');
        if (adultCount + childCount <= 3) {
            return "1-3 P.";
        } else {
            return (adultCount + childCount).toString() + " P."
        }
    }
}




