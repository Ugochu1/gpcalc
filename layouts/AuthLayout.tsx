import { ReactNode } from "react";
import Logo from "@/components/logo/Logo";
import styles from "./AuthLayout.module.scss";

interface Props {
  children?: ReactNode;
  full?: boolean;
}

const AuthLayout = ({ children, full }: Props) => {
  return (
    <div className={`${styles.container} ${full === true ? "h-full" : "h-screen"}`}>
      <div className={styles.logoContainer}>
        <Logo style={{ transform: "scale(1.5)" }} />
      </div>
      <div className={styles.formContainer}>{children}</div>
    </div>
  );
};

export default AuthLayout;
