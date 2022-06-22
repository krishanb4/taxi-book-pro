import React, {useEffect} from 'react';
import './App.css';
import DetailedForm from "./components/DetailedForm";
import ShortForm from "./components/ShortForm";
import {useService} from "react-service-locator";
import {StateService} from "./services/state-service";
import {StateType} from "./enums/state-type";

export const App: React.FC = () => {
    const stateService = useService(StateService);

    useEffect(() => {

    }, []);

    function getComponent(state: StateType): any {
        switch (state) {
            case StateType.SHORT_FORM:
                return (<div><ShortForm/></div>);
            case StateType.DETAILED_FORM:
                return (<div><DetailedForm/></div>);
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