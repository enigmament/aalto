// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

const rootEl = document.createElement("div");
rootEl.setAttribute("id", "root");
document.body.appendChild(rootEl);

ReactDOM.render(<App />, document.getElementById('root'));