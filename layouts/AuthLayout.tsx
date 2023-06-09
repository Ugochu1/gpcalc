import { ReactNode } from "react";
import Logo from "@/components/logo/Logo";
import styles from "./AuthLayout.module.scss";

interface Props {
  children?: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      <Logo />
    </div>
  );
};

export default AuthLayout;
