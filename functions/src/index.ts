import * as functions from "firebase-functions";
// eslint-disable-next-line import/default
import {MailUtils} from "./utils/mail-utils";
import {DBUtils} from "./utils/db-utils";
import {ApiUtils} from "./utils/api-utils";
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.status(200).send("Hello from Firebase!");
});

exports.sendEmail = functions.firestore
    .document("bookings/{bookingId}")
    .onCreate((snap, context) => {
      if (snap.data().recaptchaToken!==null) {
        // eslint-disable-next-line import/namespace,max-len
        const result = ApiUtils.getRecaptchaStatus(snap.data().recaptchaToken).then(
            (status)=>{
              console.log("Get Recaptcha Token Verification Successfully ");
              if (status) {
                MailUtils.triggerEmail(snap);
              } else {
                DBUtils.deleteBooking(snap).then(()=>{
                  console.log("Deleted Spam Record..");
                });
              }
            }
        );
        console.log("Result is : "+result);
      } else {
        DBUtils.deleteBooking(snap).then(()=>{
          console.log("Deleted Unauthorized/Spam Record..");
        });
      }
    });
