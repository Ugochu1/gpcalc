import { FC } from "react";
import styles from "./Logo.module.scss";
import Link from "next/link";

interface LogoProps {
  white?: boolean
}

const Logo: FC<LogoProps> = ({white}) => {
  return (
    <Link href="/">
      <span className={styles.logo}>
        <span className={styles.gp}>GP</span>
        <span className={white ? "text-white": "text-[#1d2332]"}>c</span>
        <span className={white ? "text-white": "text-[#1d2332]"}>a</span>
        <span className={white ? "text-white": "text-[#1d2332]"}>l</span>
        <span className={white ? "text-white": "text-[#1d2332]"}>c.</span>
      </span>
    </Link>
  );
};

export default Logo;
