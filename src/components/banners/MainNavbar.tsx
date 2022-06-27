import React from "react";

export function MainNavbar(props: { src: any }) {
    return <div className="container">
        <div className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="#"><img height={50} src={props.src}
                                                      alt=""/></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navmenu">
                <span className="navbar-toggler-icon navbar-dark"/>
            </button>
            <div className="collapse navbar-collapse" id="navmenu">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item nav-item-custom">
                        <a href="#" className="nav-link nav-link-ex">HOME</a>
                    </li>
                    <li className="nav-item nav-item-custom">
                        <a href="#" className="nav-link nav-link-ex">BOOK NOW</a>
                    </li>
                    <li className="nav-item nav-item-custom">
                        <a href="#" className="nav-link nav-link-ex">UPCOMING TRANSFERS</a>
                    </li>
                    <li className="nav-item nav-item-custom">
                        <a href="#" className="nav-link nav-link-ex">RATES</a>
                    </li>
                    <li className="nav-item nav-item-custom">
                        <a href="#" className="nav-link nav-link-ex">CONTACT</a>
                    </li>
                </ul>
            </div>
            <form className="d-flex" role="search">
                <button className="btn signup-btn" type="submit">SIGN UP</button>
            </form>
        </div>
    </div>;
}
