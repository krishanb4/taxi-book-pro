import React from "react";
import '../../styles/contact-style.scss';
import {MainNavbar} from "../banners/MainNavbar";
import {useTranslation} from "react-i18next";

export const Contact = () => {
    const {t} = useTranslation();

    return (
        <div>
            <section className="nav-bar-main">
                <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
            </section>

            <section className="py-5 px-3">
                <div className="container text-center contact-main">
                    <div className="p-2 contact-main-title">{t('contact-us')}</div>
                    <div className="pb-5 contact-title">{t('get-in-touch')}</div>
                    <div className="contact-details-main">
                        <div className="contact-sub-title">
                            {t('call-us')}
                            <div className="contact-details">
                                <a href="tel:+33605822259">+33 605 822 259</a>
                            </div>
                        </div>
                        <div className="py-5 contact-sub-title">
                            {t('email')}
                            <div className="contact-details">
                                <a href="mailto:bookings@prestigeparistransfers.com">bookings@prestigeparistransfers.com</a>
                            </div>
                        </div>
                        <div className="pb-5 contact-sub-title">
                            {t('website')}
                            <div className="contact-details">
                                <a href="https://prestigeparistransfers.com">https://prestigeparistransfers.com</a>
                            </div>
                        </div>
                        <div className="pb-5 contact-sub-title">
                            {t('powered-by')}
                            <div className="contact-details">
                                <a href="https://plebs.studio/">Pleb Studio (https://plebs.studio)</a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
