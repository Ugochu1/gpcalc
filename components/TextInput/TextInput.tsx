import { FC, useState } from "react";
import styles from "./TextInput.module.scss";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const TextInput: FC<any> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <p>{props.name}</p>
      <div className="relative">
        {props.type === "password" ? (
          <input type={visible ? "text" : "password"} className={styles.input} {...props.register} />
        ) : (
          <input type={props.type ?? "text"} className={styles.input} {...props.register} />
        )}
        {props.type === "password" && (
          <div className={styles.show} onClick={() => setVisible((cv) => !cv)}>
            {visible ? (
              <AiFillEyeInvisible size={25} />
            ) : (
              <AiFillEye size={25} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
