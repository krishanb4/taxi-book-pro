import React, {useEffect} from 'react';
import './App.css';
import Arrival from "./components/Arrival";
import ShortForm from "./components/ShortForm";
import {useService} from "react-service-locator";
import {StateService} from "./services/state-service";
import {StateType} from "./enums/state-type";
import Departure from "./components/Departure";
import RoundTrip from "./components/RoundTrip";

export const App: React.FC = () => {
    const stateService = useService(StateService);

    useEffect(() => {

    }, []);

    function getComponent(state: StateType): any {
        switch (state) {
            case StateType.SHORT_FORM:
                return (<div><ShortForm/></div>);
            case StateType.ARRIVAL:
                return (<div><Arrival/></div>);
            case StateType.DEPARTURE:
                return (<div><Departure/></div>);
            case StateType.ROUND_TRIP:
                return (<div><RoundTrip/></div>);
            default:
                return (<div><ShortForm/></div>);
        }
    }

    return (
        <div className="App">
            {
                getComponent(stateService.getCurrentStatus())
            }
        </div>
    );
}