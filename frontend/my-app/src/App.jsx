import React from 'react';
import './App.css';
import Home from './components/Home.tsx';
import {Route, Router, Routes} from "react-router-dom";

function App() {
    return (
        <div className="bg-[#f4f5f7] min-h-screen">
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
        </div>
    );
}

export default App;
