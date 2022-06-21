import * as functions from "firebase-functions";
// eslint-disable-next-line import/default
import {MailUtils} from "./utils/mail-utils";
// const nodemailer = require("nodemailer");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.status(200).send("Hello from Firebase!");
});

exports.sendEmail = functions.firestore
    .document("bookings/{bookingId}")
    .onCreate((snap, context) => {
      // eslint-disable-next-line import/namespace
      MailUtils.triggerEmail(snap);
    });
