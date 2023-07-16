import Navbar from "@/components/Navbar/Navbar";
import { LayoutProps } from "./AuthLayout";
import styles from "./MainLayout.module.scss";
import PageLoader from "@/components/pageLoader/PageLoader";

const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <PageLoader />
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
