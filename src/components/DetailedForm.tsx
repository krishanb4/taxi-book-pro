import React from "react";
import {Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore, collection ,addDoc,serverTimestamp} from 'firebase/firestore';
import { useCollection, } from 'react-firebase-hooks/firestore';
import {db} from "../config/firebase-config";

function DetailedForm() {

    const [value, loading, error] = useCollection(
        collection(db, 'bookings'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    const temp = {
        name: "fjkfg",
        email: "fgjfgy@gmail.com",
        phone: "56456",
        cost: 27
    };

    function createBooking (params: any) {
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

    function clear(event:any){
        event.preventDefault();
    }


    return (
        <div className={"col-2"}>
            <Form onSubmit={clear}>
                <Form.Group className="mb-2"  id={"email"}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicName">
                    <Form.Label>Cost</Form.Label>
                    <Form.Control type="number" placeholder="Cost" />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicName">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="phone" placeholder="Phone" />
                </Form.Group>


                <Button variant="primary" type="submit" onClick={()=>createBooking(temp)}>
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