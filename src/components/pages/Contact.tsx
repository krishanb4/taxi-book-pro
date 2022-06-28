import React from "react";
import '../../styles/contact-style.scss';
import {MainNavbar} from "../banners/MainNavbar";

export const Contact = () => {
    return (
        <div>
            <section className="nav-bar-main">
                <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
            </section>

            <section className="py-5 px-3">
                <div className="container text-center contact-main">
                    <div className="p-2 contact-main-title">
                        Contact us
                    </div>
                    <div className="pb-5 contact-title">
                        Get in touch with us
                    </div>
                    <div className="contact-details-main">
                        <div className="contact-sub-title">
                            Call us:
                            <div className="contact-details">
                                <a href="tel:+33605822259">+33 605 822 259</a>
                            </div>
                        </div>
                        <div className="py-5 contact-sub-title">
                            Email:
                            <div className="contact-details">
                                <a href="mailto:bookings@prestigeparistransfers.com">bookings@prestigeparistransfers.com</a>
                            </div>
                        </div>
                        <div className="pb-5 contact-sub-title">
                            Website:
                            <div className="contact-details">
                                <a href="https://prestigeparistransfers.com">https://prestigeparistransfers.com</a>
                            </div>
                        </div>
                        <div className="pb-5 contact-sub-title">
                            Powered by:
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
