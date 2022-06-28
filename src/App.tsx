import React from 'react';
import './App.css';
import OldArrival from "./components/pages/OldArrival";
import OldHomePage from "./components/pages/OldHomePage";
import OldDeparture from "./components/pages/OldDeparture";
import RoundTrip from "./components/pages/RoundTrip";
import {Route, Routes} from "react-router-dom";
import {Rates} from "./components/pages/Rates";
import {Contact} from "./components/pages/Contact";
import {LabPage} from "./components/pages/LabPage";
import {AppConfig} from "./config/app-config";
import {HomePage} from "./components/pages/HomePage";
import {Arrival} from "./components/pages/Arrival";
import {Departure} from "./components/pages/Departure";

export const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<OldHomePage/>}/>
                <Route path='/arrival' element={<OldArrival/>}/>
                <Route path='/departure' element={<OldDeparture/>}/>
                <Route path='/round-trip' element={<RoundTrip/>}/>
                <Route path='/rates' element={<Rates/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/reroutehome' element={<HomePage/>}/>
                <Route path='/reroutearrival' element={<Arrival/>}/>
                <Route path='/reroutedeparture' element={<Departure/>}/>
                {!AppConfig.isDebug || <Route path='/lab' element={<LabPage/>}/>}
            </Routes>
        </div>
    );
}
