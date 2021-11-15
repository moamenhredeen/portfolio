
import classes from './Sidebar.module.css';
import myImage from './image.jpg';
import {AiFillPhone, BsGithub, BsTwitter, MdEmail} from "react-icons/all";

const Sidebar = () => {
    return (<div className={classes.container}>
        <img className={classes.image} src={myImage} alt=""/>
        <div className={classes.infos}>
            <div className={[classes.infoContainer, classes.name].join(' ')}>
                <h1>Moamen Hraden</h1>
            </div>
            <div className={classes.infoContainer}>
               <MdEmail size={20}/>
                <p className={classes.infoText}>moamenhredeen@gmail.com</p>
            </div>
            <div className={classes.infoContainer}>
                <AiFillPhone size={20}/>
                <p className={classes.infoText}>00971672548125</p>
            </div>
            <div className={classes.infoContainer}>
                <BsGithub size={20}/>
                <p className={classes.infoText}>moamenhredeen@gmail.com</p>
            </div>
            <div className={classes.infoContainer}>
                <BsTwitter size={20}/>
                <p className={classes.infoText}>moamenhredeen@gmail.com</p>
            </div>
        </div>
    </div>);
}


export default Sidebar;