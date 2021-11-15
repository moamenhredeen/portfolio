import {Route, Switch} from "react-router-dom";
import WhoAmI from "./WhoAmI/WhoAmI";
import Projects from "./Projects/Projects";
import Contact from "./Contact/Contact";
import React from "react";
import classes from './Main.module.css';
import Skills from "./Skills/Skills";

const Main = () => {
    return (
    <div className={classes.container}>
        <Route exact path="/contactme" component={Contact} />
        <Route exact path="/whoami" component={WhoAmI} />
        <Route exact path="/skills" component={Skills} />
        <Route exact path="/myprojects" component={Projects} />
    </div>
    );
}

export default Main;