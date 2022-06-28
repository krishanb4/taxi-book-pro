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
