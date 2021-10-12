import classes from './Navbar.module.css'


import React from "react";
import {NavLink} from "react-router-dom";


const Navbar = () => {
    return (
        <nav className={classes.navContainer}>
            <ul className={classes.navItems}>
                {/*<li><NavLink to="/home" className={classes.navItem} activeClassName={classes.active}>Home</NavLink></li>*/}
                <li><NavLink to="/whoami" className={classes.navItem} activeClassName={classes.active}>Who Am I</NavLink></li>
                <li><NavLink to="/skills" className={classes.navItem} activeClassName={classes.active}>My Skills</NavLink></li>
                <li><NavLink to="/myprojects" className={classes.navItem} activeClassName={classes.active}>My Projects</NavLink></li>
                <li><NavLink to="/contactme" className={classes.navItem} activeClassName={classes.active}>Contact Me</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;