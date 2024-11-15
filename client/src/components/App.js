import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from "./pages/login";
import NavBar from './modules/NavBar';
import LoginComponent from './pages/login';
import { RegisterPage} from './pages/register';

import "../utilities.css"

const App = () => {
    return (
        <RegisterPage />
    );
};

export default App;
