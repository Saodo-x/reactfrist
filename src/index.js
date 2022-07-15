import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import {BrowserRouter} from "react-router-dom";
// import App from "./App";
// import App1 from "./App1";
import App2 from "./App2";
import store from "./redux/store";
import {Provider} from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<BrowserRouter>*/}
        <Provider store={store}>
            <App2/>
        </Provider>
    {/*</BrowserRouter>*/}
  </React.StrictMode>
);

reportWebVitals();
