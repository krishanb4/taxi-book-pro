
// eslint-disable-next-line max-len
import {QueryDocumentSnapshot} from "firebase-functions/lib/providers/firestore";
// eslint-disable-next-line require-jsdoc
export class DBUtils {
  // eslint-disable-next-line require-jsdoc
  public static async deleteBooking(snap:QueryDocumentSnapshot) {
    await snap.ref.delete().then(()=>{
      console.log("Record Deleted...");
    });
  }
}
