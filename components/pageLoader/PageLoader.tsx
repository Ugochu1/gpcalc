import { FC, useState, useEffect } from "react";
import Logo from "../logo/Logo";
import styles from "./PageLoader.module.scss";

export const Loading: FC = () => (
  <div className="h-full absolute top-0 right-3 flex items-center">
    <div className={styles.loading} />
  </div>
);

const PageLoader: FC<{ setLoaded: (loaded: boolean) => void }> = ({
  setLoaded,
}) => {
  useEffect(() => {
    setTimeout(() => setLoaded(false), 700);
  }, []);
  return (
    <div className={styles.loader}>
      <div className={styles.circular_loader} />
      <Logo />
    </div>
  );
};

export default PageLoader;
