// eslint-disable-next-line require-jsdoc
import * as nodemailer from "nodemailer";
// eslint-disable-next-line max-len
import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import emails from "../data/emails.json";


// eslint-disable-next-line require-jsdoc
export class MailUtils {
  // eslint-disable-next-line require-jsdoc
  public static triggerEmail(snap:QueryDocumentSnapshot) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "defyngames@gmail.com",
        pass: "fjrzafzlfmhetbmo",
      },
    });
    const userMailOptions = {
      from: "defyngames@gmail.com",
      to: snap.data().personalDetails.email,
      subject: "Taxi Book form message",
      html: `<h1>Booking Conformation</h1>
     <p> <b>Email: </b>${snap.data().personalDetails.email} </p>`,
    };
    const adminMailOptions = {
      from: "defyngames@gmail.com",
      to: emails.adminEmail,
      subject: "Taxi Book - Reservation Received",
      html: `<h1>Booking Inform - One Booking Received</h1>
     <p> <b>Email: </b>${snap.data().personalDetails.email} </p>`,
    };

    // eslint-disable-next-line no-empty
    // let adminMailStatus:boolean = false;
    transporter.sendMail(adminMailOptions).then(()=>{
      console.log("Admin Email Sent...");
      console.log("User Email Sending...");
      transporter.sendMail(userMailOptions, ()=>{
        console.log("User Email Sent...");
      });
    }
    );
  }
}
