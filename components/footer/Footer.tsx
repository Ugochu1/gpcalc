import { FC, ReactNode } from "react";
import styles from "./Footer.module.scss";

export interface FooterProps {
  children?: ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
  return (
    <div className={styles.footer}>
      <div className="w-full">{children}</div>
      <div className={styles.copyright}>&copy; Copyright 2023.</div>
    </div>
  );
};

export default Footer;
