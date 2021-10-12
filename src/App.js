import './App.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";

import React from "react";
import Main from "./components/Main/Main";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Sidebar/>
            <Navbar/>
            <Main/>
        </div>
    );
}

export default App;
