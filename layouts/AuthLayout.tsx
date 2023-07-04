import { ReactNode } from "react";
import styles from "./AuthLayout.module.scss";
import Logo from "@/components/logo/Logo";
import { BsPerson } from "react-icons/bs";

export type LayoutProps = {
  title?: string;
  children?: ReactNode;
};

const AuthLayout = ({ children, title }: LayoutProps) => {
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.main}>
        <Logo />
        <div className={styles.form}>
          <div className={styles.header}>
            <div><BsPerson /></div>
            <p>{title}</p>
          </div>
          <div className={styles.children}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
