import classes from './WhoAmI.module.css'

const myInfo = [
    {
        date: "2021",
        title: "BachelorArbeit",
        description: "das thema meiner bachelor arbeit is IPC"
    },
    {
        date: "2020",
        title: "Praxissemester",
        description: "ich habe mein praxissesmester bei primion gemacht"
    },
    {
        date: "2021",
        title: "Web Developer",
        description: "ich habe bei Vinnova als web developer gearbeitet"
    }
]

const WhoAmI = () => {

    const parts = myInfo.map(el => {
        return (
            <div className={classes.part}>

                <div className={classes.time}>
                    <div className={classes.timeEntry}>
                        {el.date}
                    </div>
                    <div className={classes.timeLine}></div>
                </div>

                <div className={classes.content}>
                    <div className={classes.title}>
                        {el.title}
                    </div>
                    <div className={classes.body}>
                        {el.description}
                    </div>
                </div>

            </div>
        );
    })

    return (
        <div className={classes.container}>

            <div className={classes.vLine}></div>

            <div className={classes.parts}>
                {parts}
            </div>

        </div>
    );
}

export default WhoAmI;