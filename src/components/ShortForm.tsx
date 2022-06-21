import React from "react";
import {Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ShortForm = () => {

    return (
        <div className={"col-2"}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">

                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default ShortForm;