import React, {useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {collection} from 'firebase/firestore';
import {useCollection,} from 'react-firebase-hooks/firestore';
import {db} from "../config/firebase-config";
import {useService} from "react-service-locator";
import {BookingService} from "../services/booking-service";

const DetailedForm = (params: any) => {

    const bookingService = useService(BookingService);

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const costRef = useRef<HTMLInputElement>(null);
    const commentsRef = useRef<HTMLInputElement>(null);
    const journeyTypeRef = useRef<HTMLInputElement>(null);

    const journeyDetails = {
        adultCount: 0,
        childrenCount: 0,
        route: '',
        pickupDate: '',
        pickupTime: ''
    }
    const [formDetails, setFormDetails] = useState(journeyDetails);

    const [value, loading, error] = useCollection(
        collection(db, 'bookings'),
        {
            snapshotListenOptions: {includeMetadataChanges: true},
        }
    );

    function clear(event: any) {
        event.preventDefault();
        event.target.reset();
    }

    function mapBookingDetails() {
        bookingService.bookingDetails.setCost(parseFloat(costRef.current?.value ?? '0'));
        bookingService.bookingDetails.setName(nameRef.current?.value ?? '');
        bookingService.bookingDetails.setEmail(emailRef.current?.value ?? '');
        bookingService.bookingDetails.setPhone(phoneRef.current?.value ?? '');
        bookingService.bookingDetails.setComment(commentsRef.current?.value ?? '');
    }

    function sendDoc() {
        mapBookingDetails();
        bookingService.createBooking().then(r => {
            console.log("Created Doc");
        });
    }

    return (
        <div className={"col-2"}>
            <Form onSubmit={(e) => {
                sendDoc();
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