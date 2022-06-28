import React, {useEffect} from "react";
import '../../styles/style.scss'

import {useForm} from 'react-hook-form';
import data from "../../data/data.json";
import {useService} from "react-service-locator";
import {ReservationService} from "../../services/reservation-service";
import {IHomeData} from "../../definitions/i-home-data";

export const HomeForm = () => {

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

    return (
        <div>

            <section className="py-5 px-3">
                <div className="container text-center contact-main">

                    <form onSubmit={handleSubmit(onSubmit)} onChange={onChangeForm}>
                        <div className="tab-content home-form">
                            <div className="home-form-outer">
                                <div className={'home-form-header-bar'}>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        {/*{buildModeButton(JourneyType.ARRIVAL_ONE_WAY, 'Arrival', '/assets/road.svg')}*/}
                                        {/*{buildModeButton(JourneyType.DEPARTURE, 'Departure', '/assets/plane.svg')}*/}
                                        {/*{buildModeButton(JourneyType.ROUND_TRIP, 'Round Trip', '/assets/van.svg')}*/}
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
