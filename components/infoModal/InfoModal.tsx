import styles from "./InfoModal.module.scss";
import { FC, ReactNode } from "react";

interface InfoModal {
  children?: ReactNode;
  show: boolean;
  setShow: (show: boolean) => void;
}

const InfoModal: FC<InfoModal> = ({ children, show, setShow }) => {
  return (
    <>
      <div className={`${styles.overlay} ${show && styles.show}`}></div>
      <div className={`${styles.modal} ${show && styles.show}`}>
        <div className={styles.header}>Server Response</div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <button onClick={() => setShow(false)}>Close</button>
        </div>
      </div>
    </>
  );
};

export default InfoModal;
