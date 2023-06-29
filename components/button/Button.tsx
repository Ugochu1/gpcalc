import { FC, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children?: ReactNode;
};

const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <>
      <div className={styles.button}>
        <div className={styles.background}></div>
        <div className={styles.main}>{children}</div>
      </div>
      <button className={styles.buttonWithoutAnim}>{children}</button>
    </>
  );
};

export default Button;
