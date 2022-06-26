import * as functions from "firebase-functions";
// eslint-disable-next-line import/default
import {MailUtils} from "./utils/mail-utils";
import {DBUtils} from "./utils/db-utils";
import {ApiUtils} from "./utils/api-utils";
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.helloWorld = functions.region("europe-west1").https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.status(200).send("Hello from Firebase!");
});

exports.sendEmail = functions.region("europe-west1").firestore
    .document("bookings/{bookingId}")
    .onCreate(async (snap, context) => {
        if (snap.data().recaptchaToken !== null) {
            // eslint-disable-next-line import/namespace,max-len
            const result = ApiUtils.getRecaptchaStatus(snap.data().recaptchaToken).then(
                async (status) => {
                    console.log("Get Recaptcha Token Verification Successfully ");
                    if (status) {
                        await MailUtils.triggerEmail(snap);
                    } else {
                        DBUtils.deleteBooking(snap).then(() => {
                            console.log("Deleted Spam Record..");
                        });
                    }
                }
            );
            console.log("Result is : " + result);
        } else {
            DBUtils.deleteBooking(snap).then(() => {
                console.log("Deleted Unauthorized/Spam Record..");
            });
        }
    });
