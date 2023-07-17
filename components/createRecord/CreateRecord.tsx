import { FC, useState } from "react";
import styles from "./CreateRecord.module.scss";
import TextInput from "../TextInput/TextInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import ClientService from "@/lib/services/client";
import { RecordPreviewProps } from "../recordPreview/RecordPreview";
import { useNotificationContext } from "@/lib/contexts/NotificationContext";
import { Loading } from "../pageLoader/PageLoader";

type Inputs = {
  title: string;
  record_no: string;
};

export type CreateRecordInputs = {
  title: string;
  record_no: number;
};

const CreateRecord: FC<RecordPreviewProps> = ({ record, setRecord }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setNotification, setShowNotification } = useNotificationContext();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const _data: { title: string; record_no: number } = {
      ...data,
      record_no: parseInt(data.record_no.trim()),
    };

    // call the initializing endpoint.
    const response = await ClientService.initializeRecord(_data);
    if (typeof response !== "string" && typeof response !== "boolean") {
      setNotification(
        `${response.record.title.toUpperCase()} created successfully.`
      );
      setRecord && setRecord([response.record, ...(record as MainRecord[])]);
      // setMyRecord([response.record, ...(record as MainRecord[])]);
    } else {
      setNotification("There was an error initializing the record.");
    }
    setShowNotification(true);
    setLoading(false);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form}>
          <TextInput
            type="text"
            label="Record Title"
            id="title"
            register={register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-xs text-red-500">Title is required</span>
          )}
          <TextInput
            type="text"
            label="Number of Courses"
            id="number"
            register={register("record_no", { required: true })}
          />
          {errors.record_no && (
            <span className="text-xs text-red-500">
              Record Number is required
            </span>
          )}
          <button>Create {loading && <Loading />}</button>
        </div>
      </form>
    </>
  );
};

export default CreateRecord;
