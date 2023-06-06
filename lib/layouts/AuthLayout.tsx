import { FC, ReactNode } from "react";
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children?: ReactNode;
  footer?: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const { children, footer } = props;

  return (
    <div>
      <div className={styles.head}>This is an auth page.</div>
      <div className={styles.body}>{children}</div>
      {
        /* If there is a footer*/
        footer && <div className={styles.footer}>{footer}</div>
      }
    </div>
  );
};

export default AuthLayout;
