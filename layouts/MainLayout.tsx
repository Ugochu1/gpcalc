import Navbar from "@/components/Navbar/Navbar";
import { LayoutProps } from "./AuthLayout";
import styles from "./MainLayout.module.scss";
import PageLoader from "@/components/pageLoader/PageLoader";
import { useState } from "react";

const MainLayout = ({ children }: LayoutProps) => {
  const [loaded, setLoaded] = useState<boolean>(true);
  return (
    <div className={styles.mainContainer}>
      <Navbar />
      {loaded && <PageLoader setLoaded={setLoaded} />}
      <div>{children}</div>
    </div>
  );
};

export default MainLayout;
