import React from "react";
import styles from './ErrorModal.module.css';

function ErrorModal(props) {
  return (
    <>
      <div className={styles.modal}>
         <div className={styles.modal__header}>
          <div className={styles.modal__header__title}>{props.title}</div>
          <button className={styles.modal__header__button} onClick={props.onCloseModal}>Close</button>
         </div>
         <div className={styles.modal__message}>
         <p> {props.message} </p>
         </div>
      </div>
    </>
  );
}

export default ErrorModal;
