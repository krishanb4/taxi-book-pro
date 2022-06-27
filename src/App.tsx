import React from 'react';
import './App.css';
import Arrival from "./components/pages/Arrival";
import Home from "./components/pages/Home";
import Departure from "./components/pages/Departure";
import RoundTrip from "./components/pages/RoundTrip";
import {Route, Routes} from "react-router-dom";
import {Rates} from "./components/pages/Rates";
import {Contact} from "./components/pages/Contact";

export const App: React.FC = () => {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/arrival' element={<Arrival/>}/>
                <Route path='/departure' element={<Departure/>}/>
                <Route path='/round-trip' element={<RoundTrip/>}/>
                <Route path='/rates' element={<Rates/>}/>
                <Route path='/contact' element={<Contact/>}/>
            </Routes>
        </div>
    );
}
