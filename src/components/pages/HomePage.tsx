import React, {useEffect} from "react";
import '../../styles/style.scss'
import {useService} from "react-service-locator";
import {JourneyType} from "../../enums/journey-type";
import data from "../../data/data.json"
import {MainNavbar} from "../banners/MainNavbar";
import {ReservationService} from "../../services/reservation-service";
import {useForm} from "react-hook-form";
import {IHomeData} from "../../definitions/i-home-data";

export const HomePage = () => {
    const reservationService = useService(ReservationService);

    useEffect(() => {
        console.log(reservationService.state);
    }, [reservationService.state]);

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const onChangeForm = () => {
        reservationService.setFormData({
            homeFormData: getValues() as IHomeData,
        })

    };

    function buildModeButton(mode: JourneyType, title: string, image: string) {
        let isActive = reservationService.state.journeyType === mode;
        return <button
            className={"nav-link nav-mode-tab" + (isActive ? " active" : "")}
            data-bs-toggle="tab"
            onClick={async (e) => {
                e.preventDefault();
                reservationService.setJourneyType(mode);
            }}
            data-bs-target="#nav-arrival" type="button" role="tab" aria-controls="nav-home"
            aria-selected="true">
            <div className="col-md nav-mode-img"><img className={"form-btn-svg"} src={image}
                                                      alt=""/></div>
            <div className="col-md nav-mode-label">{title}</div>
        </button>;
    }


    return (
        <div>
            <section className="nav-bar-main">
                <MainNavbar src={require('../../assets/logos/ppt-mini-logo.png')}/>
            </section>

            <section className="form">
                <div className="container py-5">
                    <div className={'d-flex'}>
                        <img src={require("../../assets/logos/ppt-logo.png")} alt="pdtlogo"
                             className="pb-5 logo m-auto"/></div>
                    <br/><br/><br/><br/>
                    <form onSubmit={handleSubmit(onSubmit)} onChange={onChangeForm}>
                        <div className="tab-content home-form">
                            <div className="home-form-outer">
                                <div className={'home-form-header-bar'}>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        {buildModeButton(JourneyType.ARRIVAL_ONE_WAY, 'Arrival', '/assets/road.svg')}
                                        {buildModeButton(JourneyType.DEPARTURE, 'Departure', '/assets/plane.svg')}
                                        {buildModeButton(JourneyType.ROUND_TRIP, 'Round Trip', '/assets/van.svg')}
                                    </div>
                                </div>
                                <div className={'home-form-inner'}>
                                    <div className="row g-4 mt-2">
                                        <div className="col-md py-3">
                                            <p className="subTitles">Pickup Location</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...register('pickUpPoint')} >
                                                <option disabled={true}>Select Drop Place...</option>
                                                {data.locations.map((item, key) => {
                                                    return (<option value={item} key={item}>{item}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md py-3">
                                            <p className="subTitles">Drop-off Location</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...register('dropPoint')}>
                                                <option disabled={true}>Select Drop Place...</option>
                                                {data.locations.map((item, key) => {
                                                    return (<option value={item} key={item}>{item}</option>)
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-md py-3">
                                            <p className="subTitles">Adult Riders</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...register('adultCount')}>
                                                {data.adultCounts.map((item, key) => {
                                                    return (<option value={item} key={item}>{item}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="col-md py-3">
                                            <p className="subTitles">Child</p>
                                            <select className="form-select"
                                                    aria-label="Default select example" {...register('kidsCount')}>
                                                {data.kidCounts.map((item, key) => {
                                                    return (<option value={item} key={item}>{item}</option>)
                                                })}
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="home-form-footer-bar">
                                    <div className="home-form-footer-bar-inner">
                                        <div className={"text-center travel-fare-group"}>
                                            <div>Your Travel Fare - <span className={"price"}> {} </span></div>
                                        </div>
                                        <button type="button" className="btn booknow-btn">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </section>
        </div>


    );
}

