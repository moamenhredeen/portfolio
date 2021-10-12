import {Route, Switch} from "react-router-dom";
import WhoAmI from "./WhoAmI/WhoAmI";
import Projects from "./Projects/Projects";
import Contact from "./Contact/Contact";
import React from "react";

import classes from './Main.module.css';

const Main = () => {
    return <div className={classes.container}>
        <Switch>
            {/*<Route exact path="/home" component={Home} />*/}
            <Route exact path="/whoami" component={WhoAmI} />
            <Route exact path="/myprojects" component={Projects} />
            <Route exact path="/contactme" component={Contact} />
        </Switch>
    </div>
}

export default Main;