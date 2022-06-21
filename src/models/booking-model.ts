import {firestore} from "firebase-admin/lib";
import DocumentSnapshot = firestore.DocumentSnapshot;
import DocumentReference = firestore.DocumentReference;
import FieldValue = firestore.FieldValue;


export class BookingModel{
    readonly doc: DocumentSnapshot | undefined;
    static readonly NAME: string = 'firstName';
    static readonly EMAIL: string = 'email';
    static readonly ADDRESS: string = 'address';
    static readonly PHONE: string = 'phone';
    static readonly CREATED: string = 'created';

    get id(): string | undefined {
        return this.doc?.id;
    }

    get name(): string {
        return this.doc?.get(BookingModel.NAME) ?? '';
    }

    get email(): string {
        return this.doc?.get(BookingModel.EMAIL) ?? '';
    }

    get phone(): string {
        return this.doc?.get(BookingModel.PHONE) ?? '';
    }

    get address(): string {
        return this.doc?.get(BookingModel.ADDRESS) ?? '';
    }

    get timeStamp(): FieldValue {
        return this.doc?.get(BookingModel.CREATED) ?? '';
    }
}


