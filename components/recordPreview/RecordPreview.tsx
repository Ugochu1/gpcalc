import { FC, ReactNode, useEffect, useState } from "react";
import styles from "./RecordPreview.module.scss";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import Link from "next/link";
import { AiFillFolderOpen } from "react-icons/ai";
import ClientService from "@/lib/services/client";

const inMinutes = 1000 * 60;
const inHours = inMinutes * 60;
const inDays = inHours * 24;

export interface RecordPreviewProps {
  preview?: boolean;
  record: MainRecord[];
  setRecord?: (record: MainRecord[]) => void;
  count?: number;
}

const RecordPreview: FC<RecordPreviewProps> = ({
  preview = true,
  record,
  count,
}) => {
  const [myrecord, setMyRecord] = useState<MainRecord[]>([]);
  const [recordCount, setRecordCount] = useState<number>(0);
  const PAGE = 1;

  const getMoreRecords = async () => {
    const response = await ClientService.getRecords({
      skip: myrecord.length.toString(),
      page_number: PAGE.toString(),
    });
    if (typeof response !== "string") {
      setMyRecord([...myrecord, ...response.response]);
      // set new count
      setRecordCount((current) =>
        current !== response.count ? response.count : current
      );
    } else {
      console.log(response);
    }
  };

  useEffect(() => {
    if (preview) {
      setMyRecord([...record.slice(0, 3)]);
    } else {
      setMyRecord([...record.slice(0)]);
    }
    if (count) {
      setRecordCount(count);
    }
  }, [record, preview, count]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getDateDiff = (date: Date): string => {
    const timeDiff = new Date().getTime() - date.getTime(); // difference in milliseconds

    if (timeDiff / inMinutes < 60) {
      const time = Math.floor(timeDiff / inMinutes);
      if (time <= 0) {
        return "Just now";
      }
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
          <p>You do not have any records.</p>
        </div>
      ) : (
        <>
          {myrecord.map((rec_ord, index) => {
            return (
              <Link
                href={`/dashboard/calculate?selected=${rec_ord._id}`}
                key={index}
              >
                <div className={styles.record}>
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
              </Link>
            );
          })}
          {record.length > 3 && preview === true && (
            <div className="text-right text-blue-500 text-sm">
              <Link href="/dashboard/records">See All Records</Link>
            </div>
          )}

          {myrecord.length < recordCount && preview === false && (
            <div className="text-right text-blue-500 text-sm">
              <span className="cursor-pointer" onClick={getMoreRecords}>
                See More
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecordPreview;
