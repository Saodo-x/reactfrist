import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import {BrowserRouter} from "react-router-dom";
// import App from "./App";
// import App1 from "./App1";
import App2 from "./App2";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<BrowserRouter>*/}
        <App2 />
    {/*</BrowserRouter>*/}
  </React.StrictMode>
);

store.subscribe(()=>{
    root.render(
        <React.StrictMode>
            {/*<BrowserRouter>*/}
            <App2 />
            {/*</BrowserRouter>*/}
        </React.StrictMode>
    );
})

reportWebVitals();
