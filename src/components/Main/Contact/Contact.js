
import classes from './Contact.module.css'
import {useState} from "react";

const Contact = () => {

    const [from, setFrom] = useState("");
    const [content, setContent] = useState("");

    const fromChangeHandler = (event) => {
        setFrom(event.target.value)
    }

    const contentChangeHandler = (event) => {
        setContent(event.target.value)
    }

    const submitHandler = (event) => {
        // prevent default submit behavior
        event.preventDefault();

        // cleat form
        setFrom('');
        setContent('');

        // submit form
        alert("this feature is not supported yet. you can reach me at my email though")
    }

    return <form onSubmit={submitHandler} className={classes.container}>
        <input type="text" name="from" onChange={fromChangeHandler} value={from}  placeholder="From ..." className={[classes.control, classes.from].join(' ')}/>
        <textarea name="content" onChange={contentChangeHandler} value={content} placeholder="Content ..." className={[classes.control, classes.content].join(' ')} />
        <button type="submit" className={[classes.control, classes.submitBtn].join(' ')}>SUBMIT</button>
    </form>
}

export default Contact;