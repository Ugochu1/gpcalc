import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import styles from "./Calculate.module.scss";
import Greeting from "@/components/greeting/Greeting";

const CalculateGPA: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <Greeting header="Calculate GPA" />
      <div className={styles.main}>
        <div className={styles.select}></div>
      </div>
    </div>
  );
};

CalculateGPA.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CalculateGPA;
