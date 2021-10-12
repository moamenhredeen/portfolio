import classes from './Skills.module.css';
import java from './java.png';
import csharp from './csharp.png'
import golang from './golang.png';
import python from './python.png';
import js from './js.png'


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
    },
]



const Skills = () => {

    const indicators = {
        20: classes.indicator20,
        40: classes.indicator40,
        60: classes.indicator60,
        80: classes.indicator80
    }

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
    })

    return (
        <div className={classes.container}>
            <div className={classes.section}>
                {skillsEl}
            </div>
        </div>
    );
}

export default Skills;