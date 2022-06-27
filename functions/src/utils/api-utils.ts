import axios from "axios";
import {BackendConfig} from "../config/backend-config";

// eslint-disable-next-line require-jsdoc
export class ApiUtils {
    // eslint-disable-next-line require-jsdoc
    public static async getRecaptchaStatus(token: string): Promise<boolean> {
        let status = false;
        console.log("Getting Recaptcha status...");
        await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
            params: {
                secret: BackendConfig.recaptchaConfig.secretKey,
                response: token,
            },
        })
            .then((response) => {
                    status = response.data.success;
                }
            )
            .catch(function (error: any) {
                console.log(error);
            });
        return status;
    }
}
