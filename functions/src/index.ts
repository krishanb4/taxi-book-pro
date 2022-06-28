import * as functions from "firebase-functions";
import {MailUtils} from "./utils/mail-utils";
import {DBUtils} from "./utils/db-utils";
import {ApiUtils} from "./utils/api-utils";

exports.sendEmail = functions.region("europe-west1").firestore
    .document("bookings/{bookingId}")
    .onCreate(async (snap, context) => {
        if (snap.data().recaptchaToken !== null) {
            // eslint-disable-next-line import/namespace,max-len
            const captchaSuccess = await ApiUtils.getRecaptchaStatus(snap.data().recaptchaToken);
            console.log(`Get Recaptcha verification: ${captchaSuccess}`);
            if (captchaSuccess) {
                await MailUtils.triggerEmail(snap);
            }
            console.log(`Email trigger complete for: ${snap.id}`);
        } else {
            DBUtils.deleteBooking(snap).then(() => {
                console.log("Spam order detected.");
            });
        }
    });
