import './App.css';
import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Main from "./components/Main/Main";
import Sidebar from "./components/Sidebar/Sidebar";
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home'
import Blog from "./components/Blog/Blog";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/blog" component={Blog} />
                <>
                    <Sidebar/>
                    <Navbar/>
                    <Main/>
                </>
                <Route path={"*"}>
                    <Redirect to={"/home"}/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
