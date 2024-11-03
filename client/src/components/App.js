import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Login from "./pages/login";
import NavBar from './modules/NavBar';

const App = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default App;
