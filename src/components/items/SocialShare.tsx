import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton} from "react-share";
import {AppConfig} from "../../config/app-config";

export const SocialShare = () => {
    return (
        <div>
            <FacebookShareButton
                url={AppConfig.hostAddress}
                hashtag={"#hashtag"}
                className="Demo__some-network__share-button"
            >
                <FacebookIcon size={32} round/>
            </FacebookShareButton>
            &nbsp;
            &nbsp;
            <TwitterShareButton
                url={AppConfig.hostAddress}
            >
                <TwitterIcon size={32} round/>
            </TwitterShareButton>
        </div>
    );
}