import Greeting from "@/components/greeting/Greeting";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import { NextPageWithLayout } from "@/pages/_app";
import styles from "./Records.module.scss";
import RecordPreview from "@/components/recordPreview/RecordPreview";
import CreateRecord from "@/components/createRecord/CreateRecord";
import withSession from "@/lib/hooks/withSession";
import ClientService from "@/lib/services/client";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import { useState, createContext, useContext } from "react";
import Head from "next/head";

const Records: NextPageWithLayout<{ records: MainRecord[], count: number }> = ({
  records,
  count
}) => {
  // const { user } = useAuthContext();
  const [record, setRecord] = useState<MainRecord[]>([...records]);

  return (
    <div>
      <Head>
        <title>GPCalc - Records</title>
      </Head>
      <Greeting header={`My Records`} />
      <div className={styles.recentActivity}>
        <div className={styles.activities}>
          <div className={styles.recordList}>
            <p className={styles.header}>Recent Activity</p>
            <RecordPreview
              preview={false}
              record={record}
              // setRecord={setRecord}
              count={count}
            />
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

Records.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps = withSession(async (context, config) => {
  let records = await ClientService.getServerRecords(config, {
    page_number: "0",
  });
  return {
    count: typeof records !== "string" ? records.count : records,
    records: typeof records !== "string" ? records.response : records,
  };
});

export default Records;
