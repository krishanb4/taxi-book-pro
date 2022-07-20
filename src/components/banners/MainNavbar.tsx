import React from "react";
import {useNavigate} from "react-router-dom";
import {Dropdown, DropdownButton, Nav, Navbar} from "react-bootstrap";
import {AppConfig} from "../../config/app-config";
import i18next from "i18next";
import {useTranslation} from "react-i18next";

export function MainNavbar(props: { src: any }) {
    const navigate = useNavigate();
    const {t} = useTranslation();


    async function changeLang(lang: string) {
        await i18next.changeLanguage(lang)
    }

    return <div className="container">
        <Navbar variant={"dark"} expand="lg" className={'px-2'}>
            <Navbar.Brand onClick={(e) => {
                e.preventDefault();
                navigate('/')
            }}><img height={50} src={props.src} alt="Prestige Paris Transfers"/></Navbar.Brand>
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
                    }}>{t('book-now')}</Nav.Link>
                    <Nav.Link onClick={(e) => {
                        e.preventDefault();
                        navigate('/rates')
                    }}>{t('rates')}</Nav.Link>
                    <Nav.Link onClick={(e) => {
                        e.preventDefault();
                        navigate('/contact')
                    }}>{t('contact')}</Nav.Link>
                    {
                        !AppConfig.isDebug || <Nav.Link onClick={(e) => {
                            e.preventDefault();
                            navigate('/lab')
                        }}>LabPage</Nav.Link>
                    }

                </Nav>
                <a className="btn signup-btn me-2" href="tel:+33605822259" type="submit">{t('call')} +33 605 822 259</a>
                <DropdownButton id="dropdown-basic-button signup-btn" title={`🌐 ${t('language')}`}>
                    <Dropdown.Item onClick={async () => {
                        console.log("English")
                        await changeLang('en')
                    }}>English</Dropdown.Item>
                    <Dropdown.Item onClick={async () => {
                        console.log("Italy")
                        await changeLang('italy')
                    }}>Italian</Dropdown.Item>
                    <Dropdown.Item onClick={async () => {
                        console.log("French")
                        await changeLang('french')
                    }}>French</Dropdown.Item>
                    <Dropdown.Item onClick={async () => {
                        console.log("Spanish")
                        await changeLang('span')
                    }}>Spanish</Dropdown.Item>
                </DropdownButton>
            </Navbar.Collapse>
        </Navbar>
    </div>;
}
