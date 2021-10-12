
import classes from './Project.module.css';
import  myImage from './image.jpg';

const Project = () => {
    return (
        <div className={classes.container}>
            <div className={classes.body}>
                <img src={myImage} alt="myimage"/>
            </div>
            <div className={classes.title}>
                <h2>Project title</h2>
            </div>
        </div>
    );

}

export default Project;