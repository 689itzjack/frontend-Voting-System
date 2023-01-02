import React from "react";
import ReactDom from "react-dom/client";
import './index.css'
import { App } from "./App";
//import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");
const root = ReactDom.createRoot(rootElement); // estas 2 lineas nos van a dar una aplicacion de react inicializada

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>

)