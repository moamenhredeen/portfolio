import classes from './Project.module.css';

const Project = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.image}>
                <img src={props.image} alt="myimage"/>
            </div>
            <div className={classes.content}>
                <div className={classes.title}>
                    <h2>{props.title}</h2>
                </div>
                <div className={classes.body}>
                    <p>{props.body}</p>
                </div>
            </div>
        </div>
    );


}

export default Project;