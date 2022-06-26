// eslint-disable-next-line require-jsdoc
import * as nodemailer from "nodemailer";
// eslint-disable-next-line max-len
import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import emails from "../data/emails.json";
import phones from "../data/phones.json";
import Email from "email-templates";
import path from "path";
import {DataExtractUtils} from "./data-extract-utils";

// eslint-disable-next-line require-jsdoc
export class MailUtils {
  // eslint-disable-next-line require-jsdoc
  public static async triggerEmail(snap:QueryDocumentSnapshot) {

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "defyngames@gmail.com",
        pass: "fjrzafzlfmhetbmo",
      },
    });
    const customerEmail = new Email({
      message: {
        from: "defyngames@gmail.com"
      },
      // uncomment below to send emails in development/test env:
      send: true,
      transport
    });
      const ownerEmail = new Email({
          message: {
              from: "defyngames@gmail.com"
          },
          // uncomment below to send emails in development/test env:
          send: true,
          transport
      });

    let renderedCustomerEmail = "";
    let renderedAdminEmail = "";

      await customerEmail.render(
        path.resolve("src/templates/customer/html")
        , {
            id: DataExtractUtils.getTripId(snap),
            name: DataExtractUtils.getCustomerName(snap),
            from: DataExtractUtils.getPickupPoint(snap),
            destination: DataExtractUtils.getDestinationPoint(snap),
            trip: DataExtractUtils.getTrip(snap),
            cost: DataExtractUtils.getCost(snap),
            personCount: DataExtractUtils.getPersonCount(snap),
            supportTeamEmail: emails.supportTeamEmail,
            supportTeam: phones.support,
            tripDate: DataExtractUtils.getTripDate(snap),
            bookedDate: DataExtractUtils.getBookedDate(snap),
        }
    ).then((w)=>{
        renderedCustomerEmail = w;
        console.log(renderedCustomerEmail);
    });

      await ownerEmail.render(
          path.resolve("src/templates/owner/html")
          , {
              id: DataExtractUtils.getTripId(snap),
              name: DataExtractUtils.getCustomerName(snap),
              from: DataExtractUtils.getPickupPoint(snap),
              destination: DataExtractUtils.getDestinationPoint(snap),
              trip: DataExtractUtils.getTrip(snap),
              cost: DataExtractUtils.getCost(snap),
              personCount: DataExtractUtils.getPersonCount(snap),
              supportTeamEmail: emails.supportTeamEmail,
              supportTeam: phones.support,
              tripDate: DataExtractUtils.getTripDate(snap),
              bookedDate: DataExtractUtils.getBookedDate(snap),
              phone: DataExtractUtils.getPhone(snap),
              email: DataExtractUtils.getEmail(snap),
          }
      ).then((w)=>{
          renderedAdminEmail = w;
          // console.log(renderedAdminEmail);
      });

      ownerEmail
          .send({
              template: "src/templates/owner/html",
              message: {
                  subject: "Booking Received",
                  to: emails.adminEmail,
                  html: renderedAdminEmail,
              },
              locals: {

              }
          })
          .then(()=>{
              console.log("Admin Email Sent Successfully");
              console.log("Customer Email Sending....");
              customerEmail
                  .send({
                      template: "src/templates/customer/html",
                      message: {
                          subject: "Taxi-Booking Confirmation",
                          to: snap.data().personalDetails.email,
                          html: renderedCustomerEmail,
                      },
                      locals: {

                      }
                  })
                  .then(()=>{
                      console.log("Customer Email Sent Successfully");
                  })
                  .catch(console.error);
          })
          .catch(console.error);

  }
}
