// eslint-disable-next-line require-jsdoc
import * as nodemailer from "nodemailer";
// eslint-disable-next-line max-len
import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";

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
    const mailOptions = {
      from: "defyngames@gmail.com",
      to: snap.data().email,
      subject: "Taxi Book form message",
      html: `<h1>Order Confirmation</h1>
     <p> <b>Email: </b>${snap.data().email} </p>`,
    };
    transporter.sendMail(mailOptions, (error: any, data: any) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Sent!");
    });
  }
}
