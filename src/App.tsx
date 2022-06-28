import React from 'react';
import './App.css';
import Arrival from "./components/pages/Arrival";
import OldHomePage from "./components/pages/OldHomePage";
import Departure from "./components/pages/Departure";
import RoundTrip from "./components/pages/RoundTrip";
import {Route, Routes} from "react-router-dom";
import {Rates} from "./components/pages/Rates";
import {Contact} from "./components/pages/Contact";
import {LabPage} from "./components/pages/LabPage";
import {AppConfig} from "./config/app-config";
import {HomePage} from "./components/pages/HomePage";

export const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<OldHomePage/>}/>
                <Route path='/arrival' element={<Arrival/>}/>
                <Route path='/departure' element={<Departure/>}/>
                <Route path='/round-trip' element={<RoundTrip/>}/>
                <Route path='/rates' element={<Rates/>}/>
                <Route path='/contact' element={<Contact/>}/>
                <Route path='/reroutehome' element={<HomePage/>}/>
                {!AppConfig.isDebug || <Route path='/lab' element={<LabPage/>}/>}
            </Routes>
        </div>
    );
}
