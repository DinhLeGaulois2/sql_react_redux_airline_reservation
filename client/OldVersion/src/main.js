import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";

import MainMenu from './containers/airline_reservation/MainMenuContainer'

ReactDOM.render(
    <Provider store={store}>
        <MainMenu />
    </Provider>,
    document.getElementById('app')
);