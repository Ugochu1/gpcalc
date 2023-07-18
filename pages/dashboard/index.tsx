import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "../_app";
import styles from "./DashboardHome.module.scss";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import RecordPreview from "@/components/recordPreview/RecordPreview";
import CreateRecord from "@/components/createRecord/CreateRecord";
import Greeting from "@/components/greeting/Greeting";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import withSession from "@/lib/hooks/withSession";
import ClientService from "@/lib/services/client";
import { useState } from "react";
import Head from "next/head";

const DashboardHome: NextPageWithLayout<{ records: MainRecord[] }> = ({
  records,
}) => {
  const { user } = useAuthContext();
  const [record, setRecord] = useState<MainRecord[]>([...records]);

  const getAverageRecordNo = () => {
    let total: number = 0;
    record.map((record) => (total += record.records.length));
    return record.length === 0 ? 0 : (total / record.length).toFixed(1);
  };

  const getIncomplete = () => {
    let total: number = 0;
    record.map((record) => record.records.length < record.record_no && total++);
    return total;
  };

  return (
    <div className={styles.page_wrapper}>
      <Head>
        <title>GPCalc - Dashboard</title>
      </Head>
      <Greeting header={"Welcome, " + user?.firstname} />
      <div className={styles.infosection}>
        <div className={`${styles.info} ${styles.main}`}>
          <p className={styles.title}>Total Records</p>
          <p className={styles.value}>{record.length.toString()}</p>
        </div>
        <div className={`${styles.info}`}>
          <p className={styles.title}>Average Record No</p>
          <p className={styles.value}>{getAverageRecordNo().toString()}</p>
        </div>
        <div className={`${styles.info}`}>
          <p className={styles.title}>Incomplete records</p>
          <p className={styles.value}>{getIncomplete().toString()}</p>
        </div>
      </div>
      <div className={styles.recentActivity}>
        <div className={styles.activities}>
          <div className={styles.recordList}>
            <p className={styles.header}>Recent Activity</p>
            <RecordPreview record={record} setRecord={setRecord} />
          </div>
          <div className={styles.newRecord}>
            {/* {JSON.stringify(record)} */}
            <p className={styles.header}>Create Record</p>
            <CreateRecord record={record} setRecord={setRecord} />
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardHome.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = withSession(async (context, config) => {
  let records = await ClientService.getServerRecords(config);
  // console.log(records)
  return {
    records: typeof records !== "string" ? records.response : records,
    count: typeof records !== "string" ? records.count : records, 
  };
});

export default DashboardHome;
