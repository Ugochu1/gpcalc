import { FC } from "react";
import styles from "./CreateRecord.module.scss";
import TextInput from "../TextInput/TextInput";

const CreateRecord: FC = () => {
  return (
    <form>
      <div className={styles.form}>
        <TextInput type="text" label="Record Title" id="title" />
        <TextInput type="text" label="Number of Courses" id="number" />
        <button>Create</button>
      </div>
    </form>
  );
};

export default CreateRecord;
