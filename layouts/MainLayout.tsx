import Navbar from "@/components/Navbar/Navbar";
import { LayoutProps } from "./AuthLayout";
import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
