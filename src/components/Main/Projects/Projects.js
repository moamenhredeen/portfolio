import classes from './Projects.module.css'
import Project from "./Project/Project";

import taskManager from './images/taskManager.png'
import apiTester from './images/apiTester.png'
import deutscheBahn from './images/deutscheBahn.png'

const projects = [
    {
        title:'Task Manager',
        body:'Deutsche Bahn Verspätung Analyzer',
        image: taskManager
    },
    {
        title:'API Tester',
        body:'Deutsche Bahn Verspätung Analyzer',
        image: apiTester
    },
]

const Projects = ()=> {
    return <div className={classes.container}>
        {projects.map(el => {
            return (
                <Project title={el.title} image={el.image} body={el.body}/>
            );
        })}
    </div>
}

export default Projects;