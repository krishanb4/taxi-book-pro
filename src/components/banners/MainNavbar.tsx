import React from "react";
import {useNavigate} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import {AppConfig} from "../../config/app-config";

export function MainNavbar(props: { src: any }) {
    const navigate = useNavigate();
    return <div className="container">
        <Navbar variant={"dark"} expand="lg" className={'px-2'}>
            <Navbar.Brand onClick={(e) => {
                e.preventDefault();
                navigate('/')
            }}><img height={50} src={props.src} alt=""/></Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{maxHeight: '100px'}}
                    navbarScroll
                >
                    <Nav.Link onClick={(e) => {
                        e.preventDefault();
                        navigate('/')
                    }}>BOOK NOW</Nav.Link>
                    <Nav.Link onClick={(e) => {
                        e.preventDefault();
                        navigate('/rates')
                    }}>RATES</Nav.Link>
                    <Nav.Link onClick={(e) => {
                        e.preventDefault();
                        navigate('/contact')
                    }}>CONTACT</Nav.Link>
                    {
                        !AppConfig.isDebug || <Nav.Link onClick={(e) => {
                            e.preventDefault();
                            navigate('/lab')
                        }}>LabPage</Nav.Link>
                    }
                </Nav>
                <a className="btn signup-btn" href="tel:+33605822259" type="submit">CALL +3(360)
                    582-2259</a>
            </Navbar.Collapse>
        </Navbar>
    </div>;
}
