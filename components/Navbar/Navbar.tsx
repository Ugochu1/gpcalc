import { FC, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import Logo from "../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: FC = () => {
  const [dropped, setDropped] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    dropdownRef.current && setHeight(dropdownRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    let previousWidth = window.innerWidth; // get previous width
    let timeout: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        if (previousWidth >= 1024 && currentWidth < 1024) {
          router.reload();
        }
      }, 200);
    });
  }, []);

  function toggle() {
    setDropped((cv) => !cv);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.lgNav}>
          <Link href="">
            <div>Home</div>
          </Link>
          <Link href="">
            <div>Dashboard</div>
          </Link>
          <Link href="">
            <div>Login</div>
          </Link>
        </div>
        <div className={styles.dropdownButton} onClick={toggle}>
          <span
            className={`${styles.first} ${
              dropped ? styles.active : styles.inactive
            }`}
          ></span>
          <span
            className={`${styles.second} ${
              dropped ? styles.active : styles.inactive
            }`}
          ></span>
          <span
            className={`${styles.third} ${
              dropped ? styles.active : styles.inactive
            }`}
          ></span>
        </div>
      </div>
      <div
        className={styles.smNav}
        ref={dropdownRef}
        style={{
          maxHeight: `${dropped ? height : 0}px`,
        }}
      >
        <Link href="">
          <div>Home</div>
        </Link>
        <Link href="">
          <div>Dashboard</div>
        </Link>
        <Link href="">
          <div className="pb-7">Login</div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
