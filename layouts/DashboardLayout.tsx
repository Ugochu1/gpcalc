import { ReactNode, useEffect, useState } from "react";
import styles from "./DashboardLayout.module.scss";
import Logo from "@/components/logo/Logo";
import Link from "next/link";
import {
  BsFillPersonFill,
  BsFolderFill,
  BsFillCalculatorFill,
  BsPerson,
} from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useRouter } from "next/router";
import DropDownBtn from "@/components/dropdownButton";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import Storage from "@/lib/services/storage";
import PageLoader from "@/components/pageLoader/PageLoader";
import { useNotificationContext } from "@/lib/contexts/NotificationContext";

type DashboardLayoutProps = {
  header?: string;
  children?: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const [dropped, setDropped] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(true);
  const router = useRouter();
  const { user, setUser } = useAuthContext();
  const { setShowNotification, setNotification } = useNotificationContext();

  const toggle = () => {
    setDropped(true);
  };

  useEffect(() => {
    const lastIndex = router.pathname.split("/").length - 1;
    if (router.pathname.split("/")[lastIndex] === "dashboard") {
      setCurrentRoute("overview");
    } else if (router.pathname.includes("records")) {
      setCurrentRoute("records");
    } else if (router.pathname.includes("calculate")) {
      setCurrentRoute("calculate");
    } else if (router.pathname.includes("settings")) {
      setCurrentRoute("settings");
    }
  }, [router.pathname]);

  const logOut = () => {
    Storage.removeAccessToken();
    setUser(null);
    router.replace("/auth/login");
    setNotification("Logout successful");
    setShowNotification(true);
  };

  return (
    <>
      <div className={styles.mainlayout}>
        {loaded && <PageLoader setLoaded={setLoaded} />}
        <div
          className={`${styles.absolute} ${dropped && styles.active}`}
          onClick={() => setDropped(false)}
        ></div>
        <div className={styles.header}>
          <DropDownBtn dropped={dropped} toggle={toggle} />
          <div className={styles.details}>
            <div>
              <BsPerson />
            </div>
            <p>@{user?.username}</p>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={`${styles.controls} ${dropped && styles.active}`}>
            <div className={styles.logo}>
              <Logo />
            </div>
            <div className={styles.links}></div>
            <Link href="/dashboard/">
              <div
                className={`${styles.link} ${
                  currentRoute === "overview" && styles.active
                }`}
              >
                <div className={styles.icon}>
                  <BsFillPersonFill />
                </div>
                <div className={styles.text}>Overview</div>
              </div>
            </Link>
            <Link href="/dashboard/records">
              <div
                className={`${styles.link} ${
                  currentRoute === "records" && styles.active
                }`}
              >
                <div className={styles.icon}>
                  <BsFolderFill />
                </div>
                <div className={styles.text}>Records</div>
              </div>
            </Link>
            <Link href="/dashboard/calculate">
              <div
                className={`${styles.link} ${
                  currentRoute === "calculate" && styles.active
                }`}
              >
                <div className={styles.icon}>
                  <BsFillCalculatorFill />
                </div>
                <div className={styles.text}>Calculate GPA</div>
              </div>
            </Link>
            <div className={styles.link + " cursor-pointer"} onClick={logOut}>
              <div className={styles.icon}>
                <IoLogOut />
              </div>
              <div className={styles.text}>Logout</div>
            </div>
          </div>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </>
  );
}
