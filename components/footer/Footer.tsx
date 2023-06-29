import { FC } from "react";
import styles from "./Footer.module.scss";
import Logo from "../logo/Logo";
import Button from "../button/Button";

const Footer: FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo white={true} />
        </div>
        {/* <Button>Get Started</Button> */}
      </div>

      <p className="text-white font-light text-center">
        &copy; Copyright 2023.
      </p>
    </div>
  );
};

export default Footer;
