import React from "react";
import styles from './Todo.module.css';

function Todo(props){
    return (
        <>
        <div className={styles.todo__container}>
            <input type="checkbox" checked={props.complete} onChange={props.onCompleteHandler}/>
            <p>{props.todo}</p>
        </div>
        </>
    )
}

export default Todo;