import React, { forwardRef } from "react";
import styles from './EnterBox.module.css';

const EnterBox = forwardRef(function EnterBox(props, ref){
    return (
        <>
            <div className={styles.enterbox}>
                <input className={styles.input__style} ref={ref} type="text" placeholder="Enter Item Here"/> 
            </div>
        </>
    )
})

export default EnterBox;