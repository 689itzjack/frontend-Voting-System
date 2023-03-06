import React from "react";
import './App.css';
import Login from "./pages/Login/Login";

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { COURSE, HOME, LOGIN, REGISTER } from "./paths/pathsRoutes";
import { Home } from "./pages/Home/Home";
import { Course } from "./pages/Course/Course";
import { element } from "prop-types";
import { Navbar } from "./commons/Navbar/Navbar";
import { Register } from "./pages/Register/Register";

export function App(){
    return <div className = "App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Navbar/>}>
                    <Route path = {LOGIN} element={<Login/>} />
                    <Route path={REGISTER} element={<Register/>}/>
                    <Route exact path={HOME} element = {<Home/>}>
                        <Route path={COURSE} element = {<Course/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
        
    </div>
};
//<Route path={COURSE} element={<Course/>} />