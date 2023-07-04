import { FC, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.scss";
import Logo from "../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import useScreenSize from "@/hooks/useScreenSize";
import DropDownBtn from "../dropdownButton";

const Navbar: FC = () => {
  const [dropped, setDropped] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useScreenSize(true);

  useEffect(() => {
    dropdownRef.current && setHeight(dropdownRef.current.scrollHeight);
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
          <Link href="/">
            <div>Home</div>
          </Link>
          <Link href="/dashboard">
            <div>Dashboard</div>
          </Link>
          <Link href="/dashboard/calculate">
            <div>Calculate Now!</div>
          </Link>
          <Link href="/auth/login">
            <div>Sign In</div>
          </Link>
        </div>
        <div className="lg:hidden">
          <DropDownBtn toggle={toggle} dropped={dropped} />
        </div>
      </div>
      <div
        className={styles.smNav}
        ref={dropdownRef}
        style={{
          maxHeight: `${dropped ? height : 0}px`,
        }}
      >
        <Link href="/">
          <div>Home</div>
        </Link>
        <Link href="/dashboard">
          <div>Dashboard</div>
        </Link>
        <Link href="/dashboard/calculate">
          <div>Calculate Now!</div>
        </Link>
        <Link href="/auth/login">
          <div className="pb-7">Sign In</div>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
