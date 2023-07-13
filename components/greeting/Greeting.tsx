import { FC } from "react";
import styles from "./Greeting.module.scss";

interface GreetingProps {
  header: string;
}

const Greeting: FC<GreetingProps> = ({ header }) => {
  return (
    <div className={styles.greeting}>
      <div className={styles.hello}>
        <p className={styles.hey}>{header}</p>
        <p className="font-light text-sm xs:text-base xs:mt-2 mt-1">
          Page updated at{" "}
          {new Date().toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
      <div className={styles.date}>
        {new Date().toLocaleDateString(undefined, {
          weekday: "long",
          // year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  );
};

export default Greeting;
