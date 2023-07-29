import React from "react";
import styles from './AppFooter.module.css';
import {FaPlus} from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";


function AppFooter(props){
    return (
      <>
        <div className={styles.appfooter__container}>
          <div className={styles.appfooter__leftside}>
            <div className={styles.appfooter__leftside__buttons}>
              <FaPlus size={23} onClick={props.addItemHandler}/>
              <FaSearch size={23} onClick={props.searchItemHandler}/>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.appfooter__left__side__items}>
                <p>{props.activeItems} {props.filteredText}</p>
            </div>
          </div>
          <div className={styles.appfooter__rightside__buttons}>
            <button onClick={props.findAllItemsHandler}>All</button>
            <button onClick={props.findActiveItemsHandler}>Active</button>
            <button onClick={props.findCompletedItemsHandler}>Completed</button>
          </div>
        </div>
      </>
    );
}

export default AppFooter;