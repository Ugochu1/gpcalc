import { FC, useState, useEffect } from "react";
import Logo from "../logo/Logo";
import styles from "./PageLoader.module.scss";

export const Loading: FC = () => (
  <div className="h-full absolute top-0 right-3 flex items-center">
    <div className={styles.loading} />
  </div>
);

const PageLoader: FC = () => {
  const [show, setShow] = useState<boolean>(true);
  return show ? (
    <div className={styles.loader} onAnimationEnd={() => setShow(false)}>
      <div className={styles.circular_loader} />
      <Logo />
    </div>
  ) : (
    <></>
  );
};

export default PageLoader;
