import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import styles from "./Calculate.module.scss";
import Greeting from "@/components/greeting/Greeting";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

const CalculateGPA: NextPageWithLayout = () => {
  const [dropped, setDropped] = useState(false);

  return (
    <div className={styles.container}>
      <Greeting header="Calculate GPA" />
      <div className={styles.main}>
        <div className={styles.select}>
          <p className="text-sm">Choose Record:</p>
          <div className={styles.parent}>
            <select
              onBlur={() => setDropped(false)}
              onClick={() => setDropped(cv => !cv)}
            >
              <option>None</option>
            </select>
            <div className={`${dropped && styles.dropped}`}>
              <RiArrowDropDownLine />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CalculateGPA.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CalculateGPA;
