import {TwitterIcon, TwitterShareButton} from "react-share";
import {AppConfig} from "../../config/app-config";

export const SocialShare = () => {
    return (
        <div>
            <div className="fb-like" data-href="https://www.facebook.com/Prestige-Paris-Transfer-103291185784885"
                 data-width="" data-layout="button" data-action="like" data-size="small" data-share="true"></div>
            &nbsp;
            &nbsp;
            <TwitterShareButton style={{position: "relative", top: "-8px"}}
                                url={AppConfig.hostAddress}
            >
                <TwitterIcon size={32} round/>
            </TwitterShareButton>
        </div>
    );
}