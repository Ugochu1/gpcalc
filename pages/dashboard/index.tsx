import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "../_app";
import styles from "./DashboardHome.module.scss";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import RecordPreview from "@/components/recordPreview/RecordPreview";
import CreateRecord from "@/components/createRecord/CreateRecord";
import Greeting from "@/components/greeting/Greeting";

const dummyRecordData: MainRecord[] = [
  // {
  //   title: "1st Year First Semester",
  //   lastModified: new Date("5 June 2023"),
  //   records: [],
  //   gpa: "",
  //   record_no: 10
  // },
  // {
  //   title: "1st Year Second Semester",
  //   lastModified: new Date("22 September 2022"),
  //   records: [],
  //   gpa: "",
  //   record_no: 10
  // },
  // {
  //   title: "2nd Year First Semester",
  //   lastModified: new Date("23 January 2023"),
  //   records: [],
  //   gpa: "",
  //   record_no: 10
  // },
];

const info: { title: string; value: string }[] = [
  {
    title: "Total Records",
    value: "10",
  },
  {
    title: "Growth Rate",
    value: ".06",
  },
  {
    title: "Incomplete records",
    value: "4",
  },
];

const DashboardHome: NextPageWithLayout = () => {
  return (
    <div className={styles.page_wrapper}>
      <Greeting header="Welcome back, Yugee!" />
      <div className={styles.infosection}>
        {info.map((info, index) => (
          <div
            className={`${styles.info} ${
              info.title === "Total Records" && styles.main
            }`}
            key={index}
          >
            <p className={styles.title}>{info.title}</p>
            <p className={styles.value}>{info.value}</p>
          </div>
        ))}
      </div>
      <div className={styles.recentActivity}>
        <div className={styles.activities}>
          <div className={styles.recordList}>
            <p className={styles.header}>Recent Activity</p>
            <RecordPreview record={dummyRecordData} />
          </div>
          <div className={styles.newRecord}>
            <p className={styles.header}>Create Record</p>
            <CreateRecord />
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardHome.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardHome;
