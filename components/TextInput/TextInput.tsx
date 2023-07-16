import { FC, useState } from "react";
import styles from "./TextInput.module.scss";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

type TextInputType = {
  type: string;
  id?: string;
  label?: string;
  register?: object;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
};

const TextInput: FC<TextInputType> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.label}</label>

      {props.type === "password" ? (
        <div className={styles.mainInput}>
          <input
            id={props.id}
            type={visible ? "text" : "password"}
            {...props.register}
            onChange={props.onChange}
            defaultValue={props.defaultValue}
            className="flex-1"
          />
          <div
            className="flex justify-center items-center text-2xl text-gray-800 cursor-pointer"
            onClick={() => setVisible((cv) => !cv)}
          >
            {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>
      ) : (
        <input
          id={props.id}
          type={props.type}
          {...props.register}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
        />
      )}
    </div>
  );
};

export default TextInput;
