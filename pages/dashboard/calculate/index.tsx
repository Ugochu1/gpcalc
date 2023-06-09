import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import styles from "./Calculate.module.scss";
import Greeting from "@/components/greeting/Greeting";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import withSession from "@/lib/hooks/withSession";
import ClientService from "@/lib/services/client";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import { useRouter } from "next/router";
import RecordWorkspace from "@/components/record_workspace/RecordWorkspace";

const CalculateGPA: NextPageWithLayout = () => {
  const [dropped, setDropped] = useState(false);
  const [selected, setSelected] = useState<string>("none");
  const router = useRouter();
  const [record, setRecord] = useState<MainRecord>();

  useEffect(() => {
    const { selected = "none" } = router.query;
    setSelected(selected as string);
  }, [router.query]);

  // listen to a change in selected
  useEffect(() => {
    async function getRecord() {
      if (selected !== "none") {
        const response = await ClientService.getRecord({ id: selected });
        if (typeof response !== "string") {
          setRecord(response);
          setSelected(response._id as string);
        }
      }
    }

    getRecord();
  }, [selected]);

  return (
    <div className={styles.container}>
      <Greeting header="Calculate GPA" />
      <div className={styles.main}>
        <div className={styles.select}>
          <p className="text-sm">Choose Record:</p>
          <div className={styles.parent}>
            <select
              onBlur={() => setDropped(false)}
              onClick={() => setDropped((cv) => !cv)}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="none">None</option>
              {record && <option value={record?._id}>{record?.title}</option>}
            </select>
            <div className={`${dropped && styles.dropped}`}>
              <RiArrowDropDownLine />
            </div>
          </div>
        </div>
      </div>
      <div>
        <RecordWorkspace record={record as MainRecord} selected={selected} />
      </div>
    </div>
  );
};

CalculateGPA.getLayout = function (page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CalculateGPA;
