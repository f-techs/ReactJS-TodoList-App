import React from "react";
import styles from './AppFooter.module.css';


function AppFooter(){
    return (
      <>
        <div className={styles.appfooter__container}>
          <div className={styles.appfooter__leftside}>
            <div className={styles.appfooter__leftside__buttons}>
              <button>Add</button>
              <button>Search</button>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.appfooter__left__side__items}>
                <p>items left</p>
            </div>
          </div>
          <div className={styles.appfooter__rightside__buttons}>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
          </div>
        </div>
      </>
    );
}

export default AppFooter;