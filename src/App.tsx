import React, {useEffect} from 'react';
import './App.css';
import OldArrival from "./components/pages/OldArrival";
import OldHomePage from "./components/pages/OldHomePage";
import OldDeparture from "./components/pages/OldDeparture";
import OldRoundTrip from "./components/pages/OldRoundTrip";
import {Route, Routes} from "react-router-dom";
import {Rates} from "./components/pages/Rates";
import {Contact} from "./components/pages/Contact";
import {LabPage} from "./components/pages/LabPage";
import {AppConfig} from "./config/app-config";
import {HomePage} from "./components/pages/HomePage";
import {Arrival} from "./components/pages/Arrival";
import {Departure} from "./components/pages/Departure";
import {RoundTrip} from "./components/pages/RoundTrip";
import {FieldValue, useForm, UseFormReturn} from "react-hook-form";
import {useService} from "react-service-locator";
import {ReservationService} from "./services/reservation-service";
import {TripProcessor} from "./data/json/trip-processor";
import {IHomeData} from "./definitions/i-home-data";
import {IPersonData} from "./definitions/i-person-data";
import {IBookingInfo} from "./definitions/i-booking-info";

export const App: React.FC = () => {

    const homeFormHook: UseFormReturn<FieldValue<any>> = useForm();
    const personalDetailFormHook: UseFormReturn<FieldValue<any>> = useForm();
    const arrivalFormHook: UseFormReturn<FieldValue<any>> = useForm();
    const departureFormHook: UseFormReturn<FieldValue<any>> = useForm();
    const reservationService = useService(ReservationService);

    useEffect(() => {
        reservationService.setFormHooks({
            homeFormHook: homeFormHook,
            personalDetailFormHook: personalDetailFormHook,
            arrivalFormHook: arrivalFormHook,
            departureFormHook: departureFormHook
        });
    }, [reservationService.state.isFormsReady, homeFormHook, personalDetailFormHook, arrivalFormHook, departureFormHook]);

    useEffect(() => {
        console.log(reservationService.state);
        console.log(TripProcessor.findPrice(reservationService.state.homeFormData, reservationService.state.journeyType))
    }, [reservationService.state]);

    useEffect(() => {
        const homeFormUnsub = homeFormHook.watch(() => {
            reservationService.setFormData({
                homeFormData: reservationService.homeFormHook.getValues() as IHomeData,
            })
        }).unsubscribe;

        const personalFormUnsub = personalDetailFormHook.watch(() => {
            reservationService.setFormData({
                personalFormData: reservationService.personalDetailFormHook.getValues() as IPersonData,
            })
        }).unsubscribe;

        const arrivalFormUnsub = arrivalFormHook.watch(() => {
            reservationService.setFormData({
                arrivalFromDetails: reservationService.arrivalFormHook.getValues() as IBookingInfo,
            })
        }).unsubscribe;

        const departureFormUnsub = departureFormHook.watch(() => {
            reservationService.setFormData({
                departureFormDetails: reservationService.departureFormHook.getValues() as IBookingInfo,
            })
        }).unsubscribe;
        return () => {
            homeFormUnsub();
            personalFormUnsub();
            arrivalFormUnsub();
            departureFormUnsub();
        }
    }, [])

    return (
        <div className="App">
            {!reservationService.state.isFormsReady || <Routes>
                <Route path='/' element={<OldHomePage/>}/>
                <Route path='/arrival' element={<OldArrival/>}/>
                <Route path='/departure' element={<OldDeparture/>}/>
                <Route path='/round-trip' element={<OldRoundTrip/>}/>
                <Route path='/rates' element={<Rates/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/reroutehome' element={<HomePage/>}/>
                <Route path='/reroutearrival' element={<Arrival/>}/>
                <Route path='/reroutedeparture' element={<Departure/>}/>
                <Route path='/rerouteround-trip' element={<RoundTrip/>}/>
                {!AppConfig.isDebug || <Route path='/lab' element={<LabPage/>}/>}
            </Routes>}
        </div>
    );
}
