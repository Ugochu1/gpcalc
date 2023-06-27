import { FC } from "react";
import styles from "./Collage.module.scss";

const Collage: FC = () => {
  return <div className={styles.container}>
    <div className={styles.box}>
      <div className={styles.firstBox}></div>
      <div className={styles.secondBox}></div>
    </div>
    <div className={styles.box}>
      <div className={styles.image1}></div>
    </div>
    <div className={styles.box}>
      <div className={styles.q}></div>
    </div>
    <div className={styles.box}>
      <div className={styles.image2}></div>
    </div>
    <div className={styles.box}>
      <div className={styles.end}></div>
    </div>
  </div>
}

export default Collage;