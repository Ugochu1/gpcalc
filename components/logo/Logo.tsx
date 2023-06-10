import { FC } from "react";
import { FaCalculator } from "react-icons/fa";
import styles from "./Logo.module.scss";

const Logo: FC<any> = (props) => {
  return (
    <div className={styles.logoCover} {...props}>
      <div>
        <FaCalculator size={16} />
      </div>
      <p>GP-C</p>
    </div>
  );
};

export default Logo;
