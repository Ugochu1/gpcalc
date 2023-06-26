import { FC } from "react";
import styles from "./Logo.module.scss";
import Link from "next/link";

const Logo: FC = () => {
  return (
    <Link href="/">
      <span className={styles.logo}>
        <span className={styles.gp}>GP</span>
        <span className={styles.others}>c</span>
        <span className={styles.others}>a</span>
        <span className={styles.others}>l</span>
        <span className={styles.others}>c.</span>
      </span>
    </Link>
  );
};

export default Logo;
