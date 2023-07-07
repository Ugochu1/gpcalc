import { FC, ReactNode, useEffect, useState } from "react";
import styles from "./RecordPreview.module.scss";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import Link from "next/link";
import { AiFillFolderOpen } from "react-icons/ai";
import { useRecordContext } from "@/pages/dashboard";

const inMinutes = 1000 * 60;
const inHours = inMinutes * 60;
const inDays = inHours * 24;

const RecordPreview: FC = () => {
  const [myrecord, setMyRecord] = useState<MainRecord[]>([]);
  const { record } = useRecordContext();

  useEffect(() => setMyRecord([...record.slice(0, 3)]), [record]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getDateDiff = (date: Date): string => {
    const timeDiff = new Date().getTime() - date.getTime(); // difference in milliseconds

    if (timeDiff / inMinutes < 60) {
      const time = Math.floor(timeDiff / inMinutes);
      return `${time} min${time > 1 ? "s" : ""} ago`;
    } else if (timeDiff / inHours < 24) {
      const time = Math.floor(timeDiff / inHours);
      return `${time} hour${time > 1 ? "s" : ""} ago`;
    } else if (
      timeDiff / inDays <
      getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
    ) {
      const time = Math.floor(timeDiff / inDays);
      return `${time} day${time > 1 ? "s" : ""} ago`;
    }
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className={styles.container}>
      {myrecord.length === 0 ? (
        <div className={styles.empty}>
          <span>
            <AiFillFolderOpen />
          </span>
          <p>You do not have any recent activities.</p>
        </div>
      ) : (
        <>
          {myrecord.map((rec_ord, index) => {
            return (
              <div className={styles.record} key={index}>
                <div className="flex flex-col gap-1">
                  <div className={styles.title}>{rec_ord.title}</div>
                  <div className={styles.lastModified}>
                    <span className="font-light text-sm text-black">
                      Last Modified:{" "}
                    </span>
                    {getDateDiff(new Date(rec_ord.lastModified))}
                    {/* {typeof rec_ord.lastModified} */}
                  </div>
                </div>

                <div className={styles.recordNumber}>
                  {rec_ord.records.length} record
                  {rec_ord.records.length > 1 || rec_ord.records.length == 0
                    ? "s"
                    : ""}
                </div>
              </div>
            );
          })}
          {record.length > 3 && (
            <div className="text-right text-blue-500 text-sm">
              <Link href="/dashboard/records">See All Records</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecordPreview;
