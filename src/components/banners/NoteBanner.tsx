import {useTranslation} from "react-i18next";

const NoteBanner = () => {
    const {t} = useTranslation();
    return (
        <div className="note">
            <div className="container text-center">
                <p className="lead text-light p-1">{t('booking-note')}</p>
            </div>
        </div>
    );
}

export default NoteBanner;
