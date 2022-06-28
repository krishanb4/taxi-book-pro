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
import {IHomeData} from "./definitions/i-home-data";
import {IPersonData} from "./definitions/i-person-data";
import {IBookingInfo} from "./definitions/i-booking-info";
import {UiService} from "./services/ui-service";
import SweetAlert from "react-bootstrap-sweetalert";

export const App: React.FC = () => {
    const uiService = useService(UiService, provider => [provider.state.alerts]);
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
        const homeFormUnsub = homeFormHook.watch((data: IHomeData) => {
            reservationService.setFormData({
                homeFormData: data,
            })
        }).unsubscribe;

        const personalFormUnsub = personalDetailFormHook.watch((data: IPersonData) => {
            reservationService.setFormData({
                personalFormData: data,
            })
        }).unsubscribe;

        const arrivalFormUnsub = arrivalFormHook.watch((data: IBookingInfo) => {
            reservationService.setFormData({
                arrivalFromDetails: data,
            })
        }).unsubscribe;

        const departureFormUnsub = departureFormHook.watch((data: IBookingInfo) => {
            reservationService.setFormData({
                departureFormDetails: data,
            })
        }).unsubscribe;
        return () => {
            homeFormUnsub();
            personalFormUnsub();
            arrivalFormUnsub();
            departureFormUnsub();
        }
    }, [])

    function buildAlerts() {
        const currentAlert = uiService.getVisibleAlert();
        if (!currentAlert) return null;
        return <SweetAlert {...currentAlert}>{currentAlert.content}</SweetAlert>;
    }

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
            {buildAlerts()}
        </div>
    );
}
