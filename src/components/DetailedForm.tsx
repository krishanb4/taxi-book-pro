import React, {useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
import {useCollection,} from 'react-firebase-hooks/firestore';
import {db} from "../config/firebase-config";
import {useService} from "react-service-locator";
import {BookingService} from "../services/booking-service";

const DetailedForm = (params:any) => {

    const bookingService = useService(BookingService);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const costRef = useRef(null);
    const commentsRef = useRef(null);
    const journeyTypeRef = useRef(null);

    const journeyDetails = {
        adultCount:0,
        childrenCount:0,
        route:'',
        pickupDate:'',
        pickupTime:''
    }
    const [formDetails, setFormDetails] = useState(journeyDetails);

    const [value, loading, error] = useCollection(
        collection(db, 'bookings'),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );

    const temp = {
        name: "fjkfg",
        email: "fgjfgy@gmail.com",
        phone: "56456",
        cost: 27
    };

    function createBooking(params: any) {
        const bookingRef = collection(db, 'bookings');
        console.log("Called create");
        return addDoc(bookingRef, {
            created: serverTimestamp(),
            name: params.name,
            email: params.email,
            phone: params.phone,
            cost: params.cost
        });
    };

    function clear(event: any) {
        event.preventDefault();
    }


    return (
        <div className={"col-2"}>
            <Form onSubmit={(e)=> {
                createBooking(temp).then(r => console.log(r));
                clear(e);
            }}>
                <input className="mb-2" type="email" placeholder="Enter Email" ref={emailRef}>
                </input>

                <input className="mb-2" type="name" placeholder="Enter Name" ref={nameRef}>
                </input>

                <input className="mb-2" type="number" placeholder="Cost" ref={costRef}>
                </input>

                <input className="mb-2" type="phone" placeholder="Phone" ref={phoneRef}>
                </input>

                <input className="mb-2" type="text" placeholder="Comments" ref={commentsRef}>
                </input>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
            <div>
                <div>
                    <p>
                        {error && <strong>Error: {JSON.stringify(error)}</strong>}
                        {loading && <span>Collection: Loading...</span>}
                        {value && (
                            <span>
            Collection:{' '}
                                {value.docs.map((doc) => (
                                    <React.Fragment key={doc.id}>
                                        {JSON.stringify(doc.data())},{' '}
                                    </React.Fragment>
                                ))}
          </span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DetailedForm;