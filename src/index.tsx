import 'reflect-metadata';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ServiceContainer} from "react-service-locator";
import ShortForm from "./components/ShortForm";
import Arrival from "./components/Arrival";
import Departure from "./components/Departure";
import RoundTrip from "./components/RoundTrip";

ReactDOM.render(
    <ServiceContainer>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<ShortForm/>}/>
                <Route path='/arrival' element={<Arrival/>}/>
                <Route path='/departure' element={<Departure/>}/>
                <Route path='/round-trip' element={<RoundTrip/>}/>
            </Routes>
            {/*<App/>*/}
        </BrowserRouter>
    </ServiceContainer>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
