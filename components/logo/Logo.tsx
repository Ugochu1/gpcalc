import { FC } from "react";
import { FaCalculator } from "react-icons/fa";
import styles from "./Logo.module.scss";

const Logo: FC = () => {
  return (
    <div className={styles.logoCover}>
      <div>
        <FaCalculator size={16} />
      </div>
      <p>GP Calculator</p>
    </div>
  );
};

export default Logo;
