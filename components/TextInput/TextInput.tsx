import { FC, useState } from "react";
import styles from "./TextInput.module.scss";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

type TextInputType = {
  type: string;
  id?: string;
  label?: string;
};

const TextInput: FC<TextInputType> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>{props.label}</label>

      {props.type === "password" ? (
        <div className="flex">
          <input {...props} type={visible ? "text" : "password"} />
          <div
            className="w-[10%] flex justify-center items-center text-2xl text-gray-800 cursor-pointer"
            onClick={() => setVisible((cv) => !cv)}
          >
            {visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>
      ) : (
        <input {...props} />
      )}

    </div>
  );
};

export default TextInput;
