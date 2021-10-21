// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from "./App";
import store from './reducer/store'

import { fetchToDo } from './reducer/actions'


store.dispatch(fetchToDo());
const rootEl = document.createElement("div");
rootEl.setAttribute("id", "root");
document.body.appendChild(rootEl);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));