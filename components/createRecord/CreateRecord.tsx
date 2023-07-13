import { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./CreateRecord.module.scss";
import TextInput from "../TextInput/TextInput";
import { useForm, SubmitHandler } from "react-hook-form";
import InfoModal from "../infoModal/InfoModal";
import { MainRecord } from "@/lib/interfaces/RecordsInterface";
import ClientService from "@/lib/services/client";
import { RecordPreviewProps } from "../recordPreview/RecordPreview";

type Inputs = {
  title: string;
  record_no: string;
};

export type CreateRecordInputs = {
  title: string;
  record_no: number;
};

const CreateRecord: FC<RecordPreviewProps> = ({record, setRecord}) => {
  const [show, setShow] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [myTitle, setMyTitle] = useState<string>("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const _data: { title: string; record_no: number } = {
      ...data,
      record_no: parseInt(data.record_no),
    };

    // call the initializing endpoint.
    const response = await ClientService.initializeRecord(_data);
    if (typeof response !== "string" && typeof response !== "boolean") {
      setMyTitle(response.record.title)
      setRecord && setRecord([response.record, ...(record as MainRecord[])]);
      // setMyRecord([response.record, ...(record as MainRecord[])]);
    }
    setShow(true);
    reset();
  };

  return (
    <>
      <InfoModal show={show} setShow={setShow}>
        {myTitle
          ? `Record "${myTitle}" created successfully`
          : "There was an error while initializing the record"}
      </InfoModal>
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
          <button>Create</button>
        </div>
      </form>
    </>
  );
};

export default CreateRecord;
