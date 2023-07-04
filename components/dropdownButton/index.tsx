import { FC } from "react";
import styles from "./DropDownBtn.module.scss";

interface DropDownBtnProps {
  toggle?: () => void;
  dropped?: boolean;
}

const DropDownBtn: FC<DropDownBtnProps> = ({ toggle, dropped }) => {
  return (
    <div className={styles.dropdownButton} onClick={toggle}>
      <span
        className={`${styles.first} ${
          dropped ? styles.active : styles.inactive
        }`}
      ></span>
      <span
        className={`${styles.second} ${
          dropped ? styles.active : styles.inactive
        }`}
      ></span>
      <span
        className={`${styles.third} ${
          dropped ? styles.active : styles.inactive
        }`}
      ></span>
    </div>
  );
};

export default DropDownBtn;