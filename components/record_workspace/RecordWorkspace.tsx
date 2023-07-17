import { FC, useState, useEffect } from "react";
import styles from "./RecordWorkspace.module.scss";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import { Course } from "@/lib/interfaces/UserInterface";
import { AiOutlinePlus } from "react-icons/ai";
import ClientService from "@/lib/services/client";
import InfoModal from "../infoModal/InfoModal";

type RecordWorkspaceProps = {
  record: MainRecord;
  selected: string;
};

const RecordWorkspace: FC<RecordWorkspaceProps> = ({ record, selected }) => {
  const [records, setRecords] = useState<Course[]>([]);
  const [record_no, setRecordNo] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [gpa, setGpa] = useState<number>(0);

  const addRow = () => {
    setRecords([
      ...records,
      {
        name: "",
        grade: "",
        unit_load: 0,
        id: Date.now().toString(),
      },
    ]);
  };

  const deleteIdx = (idx: number) => {
    setRecords(records.filter((_, id) => id !== idx));
  };

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    let newRecord = records.map((record, id) => {
      if (id === idx) {
        if (e.target.name === "name") {
          return {
            ...record,
            name: e.target.value,
          };
        } else if (e.target.name === "grade") {
          return {
            ...record,
            grade: e.target.value.toUpperCase(),
          };
        } else if (e.target.name === "unit") {
          return {
            ...record,
            unit_load: parseInt(e.target.value),
          };
        }
      }
      return record;
    });
    setRecords(newRecord);
  };

  useEffect(() => {
    setRecords((record && record.records) || []);
    setRecordNo((record && record.record_no) || 10);
    setGpa(record && parseFloat(record.gpa));
  }, [record]);

  const clear = () => {
    if (records.length > 1) {
      setRecords([
        {
          name: "",
          grade: "",
          unit_load: 0,
          id: Date.now().toString(),
        },
      ]);
    }
  };

  useEffect(() => {
    if (selected === "none") {
      clear();
    }
  }, [selected]);

  function verifyRecords() {
    const gradeList = ["A", "B", "C", "D", "E", "F"];
    return new Promise((resolve) => {
      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        if (
          record.name.length === 0 ||
          record.grade.length === 0 ||
          !gradeList.includes(record.grade) ||
          record.unit_load === 0 ||
          isNaN(record.unit_load)
        ) {
          resolve(false);
        }
      }
      resolve(true);
    });
  }

  const getGPA = async () => {
    const response = await verifyRecords();
    if (response) {
      const response1 = await ClientService.calculateGPA(records);
      if (selected !== "none") {
        if (typeof response1 !== "string") {
          // save the data to the database
          const response2 = await ClientService.save({
            _id: selected,
            records,
            gpa: response1.toString(),
          });
          if (typeof response2 !== "string") {
            // setInfo modal message
            setMessage(
              `${response2.title.toUpperCase()} Record updated successfully. Your current GPA is ${response1}`
            );
            setGpa(response1);
          }
        }
      } else {
        if (typeof response1 !== "string") {
          setMessage(`Your GPA is ${response1.toFixed(2)}`);
          setGpa(response1);
        }
      }
    } else {
      setMessage(
        "Please, correctly input all the required details to calculate your GPA."
      );
    }
    setShow(true);
  };

  return (
    <>
      <InfoModal show={show} setShow={setShow}>
        {message}
      </InfoModal>
      <div className="flex flex-col gap-6 items-start pb-20">
        {/* {JSON.stringify(records && records)} */}
        <div>
          Current GPA: <strong>{(gpa && gpa.toFixed(2)) || "None"}</strong>
        </div>

        {records && records.length > 0 && (
          <>
            {records.length > 1 && (
              <div className="text-center w-full text-sm">
                <span className="cursor-pointer" onClick={clear}>
                  Clear All
                </span>
              </div>
            )}
            <div className={styles.mainSection}>
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Grade</th>
                    <th>Units</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, idx) => (
                    <tr key={record.id} onDoubleClick={() => deleteIdx(idx)}>
                      <td>
                        <input
                          type="text"
                          name="name"
                          defaultValue={record.name && record.name}
                          placeholder="Value..."
                          onChange={(e) => updateInput(e, idx)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="grade"
                          placeholder="value..."
                          defaultValue={record.grade && record.grade}
                          onChange={(e) => updateInput(e, idx)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="unit"
                          defaultValue={
                            record.unit_load !== 0
                              ? record.unit_load.toString()
                              : ""
                          }
                          placeholder="Value..."
                          onChange={(e) => updateInput(e, idx)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className="flex justify-between w-full items-center">
          {records.length < record_no && records.length < 12 && (
            <div className={styles.createButton} onClick={addRow}>
              Add <AiOutlinePlus />
            </div>
          )}
          {records.length > 1 && (
            <div className={styles.createButton} onClick={getGPA}>
              Calculate {selected !== "none" && "and Save"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecordWorkspace;
