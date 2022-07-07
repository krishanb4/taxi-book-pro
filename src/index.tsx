import 'reflect-metadata';
import ReactDOM from 'react-dom';
import React, {Suspense} from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import {ServiceContainer} from "react-service-locator";
import {App} from "./App";
// import i18n (needs to be bundled ;))
import './i18n';

ReactDOM.render(
    <ServiceContainer>
        <BrowserRouter>
            <Suspense fallback={(<div>Loading</div>)}>
                <App/>
            </Suspense>
        </BrowserRouter>
    </ServiceContainer>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
