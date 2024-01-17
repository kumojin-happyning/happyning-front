import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import EventsPage from "./features/events/pages/Events.page";
import {PrimeReactProvider} from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <PrimeReactProvider>
            <EventsPage/>
        </PrimeReactProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
