import classes from './Projects.module.css'
import Project from "./Project/Project";

const Projects = ()=> {
    return <div className={classes.container}>
        <Project/>
        <Project/>
        <Project/>
        <Project/>
    </div>
}

export default Projects;