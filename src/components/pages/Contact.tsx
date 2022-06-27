import React from "react";
import '../../styles/contact-style.scss';
import {MainNavbar} from "../banners/MainNavbar";

export const Contact = () => {
    return (
        <div>
            <section className="nav-bar-main">
                <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
            </section>

            <section className="p-5">
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
                                041 - 22 555 22
                            </div>
                        </div>
                        <div className="py-5 contact-sub-title">
                            Email:
                            <div className="contact-details">
                                metaroon@gmail.com
                            </div>
                        </div>
                        <div className="pb-5 contact-sub-title">
                            Visit us:
                            <div className="contact-details">
                                www.metaroon.com
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}
