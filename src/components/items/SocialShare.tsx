import {FacebookIcon, TwitterIcon} from "react-share";
import {AppConfig} from "../../config/app-config";

export const SocialShare = () => {
    return (
        <div>
            <div className="fb-like" data-href="https://www.facebook.com/Espresso-Paris-Transfer-103291185784885"
                 data-width="" data-layout="button" data-action="like" data-size="small" data-share="true"></div>
            &nbsp;
            &nbsp;
            <a href={AppConfig.facebookPage} style={{position: "relative", top: "-8px"}}>
                <FacebookIcon size={32} round/>
            </a>
            &nbsp;
            &nbsp;
            <a href={AppConfig.twitterAddress} style={{position: "relative", top: "-8px"}}>
                <TwitterIcon size={32} round/>
            </a>
        </div>
    );
}
