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
import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

interface Info {
  title: string;
  value: string;
}

interface RecordContext {
  record: MainRecord[];
  setRecord: (record: MainRecord[]) => void;
}

const RecordContext = createContext<RecordContext>({
  record: [],
  setRecord: () => null,
});

const DashboardHome: NextPageWithLayout<{ records: MainRecord[] }> = ({
  records,
}) => {
  const { user } = useAuthContext();
  const [record, setRecord] = useState<MainRecord[]>([...records]);

  const context: RecordContext = {
    record,
    setRecord,
  };

  const getAverageRecordNo = () => {
    let total: number = 0;
    record.map((record, index) => (total += record.records.length));
    return record.length === 0 ? 0 : total / record.length;
  };

  const getIncomplete = () => {
    let total: number = 0;
    record.map((record) => record.records.length < record.record_no && total++);
    return total;
  };

  return (
    <RecordContext.Provider value={context}>
      <div className={styles.page_wrapper}>
        <Greeting header={"Welcome back, " + user?.firstname} />
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
              <RecordPreview />
            </div>
            <div className={styles.newRecord}>
              {/* {JSON.stringify(record)} */}
              <p className={styles.header}>Create Record</p>
              <CreateRecord />
            </div>
          </div>
        </div>
      </div>
    </RecordContext.Provider>
  );
};

DashboardHome.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export function useRecordContext() {
  return useContext(RecordContext);
}

export const getServerSideProps = withSession(async (context, config) => {
  let records = await ClientService.getServerRecords(config);
  // console.log(records)
  return {
    records,
  };
});

export default DashboardHome;
