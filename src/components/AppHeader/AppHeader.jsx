import React from "react";
import styles from './AppHeader.module.css';

function AppHeader(props) {
  return (
    <>
      <div className={styles.appheader}>
        <h1>{props.title}</h1>
      </div>
    </>
  );
}

export default AppHeader;
