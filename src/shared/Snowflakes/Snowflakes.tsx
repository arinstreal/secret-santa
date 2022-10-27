import React from 'react';
import styles from "./Snowflakes.module.scss";

export const Snowflakes = () => <div>
  {
    Array.from(Array(30).keys()).map(item => <div key={item} className={styles.snow}/>
    )
  }
</div>