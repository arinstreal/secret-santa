import { FC } from "react";
import styles from "./Gift.module.scss";

interface IGift {
  person?: string;
}

const Gift: FC<IGift> = ({ person }) => {
  return (
    <div className={styles.gift}>
      <div>
        <input className={styles.click} id='click' type='checkbox'/>
        <label className={styles.click} htmlFor='click'></label>
        <div className={styles.wishes}>{person}</div>
        <div className={styles.sparkles}>
          <div className={styles.spark1}></div>
          <div className={styles.spark2}></div>
          <div className={styles.spark3}></div>
          <div className={styles.spark4}></div>
          <div className={styles.spark5}></div>
          <div className={styles.spark6}></div>
        </div>
      </div>
    </div>
  )
}

export default Gift;