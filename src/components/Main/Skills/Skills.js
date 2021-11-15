import classes from './Skills.module.css';

// topics
import softwareArchitecture from './images/architecture.png';
import devops from './images/devops.png';
import machineLearning from './images/ai.png';
import computerVision from './images/copmuterVision.png';
import webDevelopment from './images/webDev.png';

// programming languages
import java from './images/java.png';
import csharp from './images/csharp.png'
import golang from './images/golang.png';
import python from './images/python.png';
import js from './images/js.png'

// libraries and frameworks
import spring from './images/spring.png'
import aspNetCore from './images/aspnetcore.png'
import flask from './images/flask.png'
import flutter from './images/flutter.png'
import jqueryImage from './images/jquery.png'
import expressjs from './images/express.png'

// tools
import linux from './images/linux.png'
import docker from './images/docker.png'
import git from './images/git.png'
import jenkins from './images/jenkins.png'

const topicsList = [
    {
        name: 'Software Architecture',
        image: softwareArchitecture,
        level: 20,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'DevOps',
        image: devops,
        level: 20,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Machine Learning',
        image: machineLearning,
        level: 40,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Computer Vision',
        image: computerVision,
        level: 40,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Fullstack Web Development',
        image: webDevelopment,
        level: 80,
        description: 'ich habe java während meines studiums gelernt'
    }
]


const skillsList = [
    {
        name: 'Java',
        image: java,
        level: 80,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'C#',
        image: csharp,
        level: 60,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Python',
        image: python,
        level: 60,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Javascript',
        image: js,
        level: 80,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Go',
        image: golang,
        level: 40,
        description: 'ich habe java während meines studiums gelernt'
    }
]

const librariesAndFrameworks = [
    {
        name: 'Spring / Spring Boot + Hibernate',
        image: spring,
        level: 80,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Asp.Net Core + EntityFramework Core',
        image: aspNetCore,
        level: 80,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Expressjs + Sequelize',
        image: expressjs,
        level: 60,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Flask',
        image: flask,
        level: 40,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Flutter',
        image: flutter,
        level: 20,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'JQuery',
        image: jqueryImage,
        level: 80,
        description: 'ich habe java während meines studiums gelernt'
    }

]

const toolsList = [
    {
        name: 'Linux',
        image: linux,
        level: 80,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Docker',
        image: docker,
        level: 80,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Git',
        image: git,
        level: 80,
        description: 'ich habe java während meines studiums gelernt'
    },
    {
        name: 'Jenkins',
        image: jenkins,
        level: 20,
        description: 'ich habe java während meines studiums gelernt'
    },
]





const Skills = () => {

    const indicators = {
        20: classes.indicator20,
        40: classes.indicator40,
        60: classes.indicator60,
        80: classes.indicator80
    }

    // TODO : refactor this if you do not want to change the style
    const topicsListEl = topicsList.map(el => {
        return (
            <div className={classes.skill}>
                <div className={classes.image}>
                    <img src={el.image} alt="Topic Icon"/>
                </div>
                <div className={classes.content}>
                    <div className={classes.title}>
                        <h3>{el.name}</h3>
                        <div className={[indicators[el.level], classes.indicator].join(' ')}>
                            <p className={classes.level}>{el.level}%</p>
                        </div>
                    </div>
                    <div className={classes.description}>
                        {el.description}
                    </div>
                </div>
            </div>
        );
    });

    const skillsEl = skillsList.map(el => {
        return (
            <div className={classes.skill}>
                <div className={classes.image}>
                    <img src={el.image} alt="Skill Icon"/>
                </div>
                <div className={classes.content}>
                    <div className={classes.title}>
                        <h3>{el.name}</h3>
                        <div className={[indicators[el.level], classes.indicator].join(' ')}>
                            <p className={classes.level}>{el.level}%</p>
                        </div>
                    </div>
                    <div className={classes.description}>
                        {el.description}
                    </div>
                </div>
            </div>
        );
    });


    const librariesAndFrameworksEl = librariesAndFrameworks.map(el => {
        return (
            <div className={classes.skill}>
                <div className={classes.image}>
                    <img src={el.image} alt="Library / Framework Icon"/>
                </div>
                <div className={classes.content}>
                    <div className={classes.title}>
                        <h3>{el.name}</h3>
                        <div className={[indicators[el.level], classes.indicator].join(' ')}>
                            <p className={classes.level}>{el.level}%</p>
                        </div>
                    </div>
                    <div className={classes.description}>
                        {el.description}
                    </div>
                </div>
            </div>
        );
    });


    const toolsListEl = toolsList.map(el => {
        return (
            <div className={classes.skill}>
                <div className={classes.image}>
                    <img src={el.image} alt="Tool Icon"/>
                </div>
                <div className={classes.content}>
                    <div className={classes.title}>
                        <h3>{el.name}</h3>
                        <div className={[indicators[el.level], classes.indicator].join(' ')}>
                            <p className={classes.level}>{el.level}%</p>
                        </div>
                    </div>
                    <div className={classes.description}>
                        {el.description}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className={classes.container}>
            <div className={classes.group}>
                <h1 className={classes.groupTitle}>Topics</h1>
                <div className={classes.groupBody}>
                    {topicsListEl}
                </div>
            </div>
            <div className={classes.group}>
                <h1 className={classes.groupTitle}> Programming Languages </h1>
                <div className={classes.groupBody}>
                    {skillsEl}
                </div>
            </div>
            <div className={classes.group}>
                <h1 className={classes.groupTitle}> Libraries and Frameworks </h1>
                <div className={classes.groupBody}>
                    {librariesAndFrameworksEl}
                </div>
            </div>
            <div className={classes.group}>
                <h1 className={classes.groupTitle}> Libraries and Frameworks </h1>
                <div className={classes.groupBody}>
                    {toolsListEl}
                </div>
            </div>
        </div>
    );
}

export default Skills;