import { FC, useEffect, useState } from "react";
import Logo from "../logo/Logo";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: FC = () => {
  const [active, setActive] = useState<string>("/");
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes("/dashboard")) {
      setActive("/dashboard");
    } else {
      if (!router.pathname.includes("404")) {
        setActive("/");
      }
    }
  }, [router.pathname]);

  return (
    <div className={`${styles.navbar}`}>
      <div className="w-full flex justify-between items-center">
        <div className="md:w-1/4 w-1/3 flex justify-start">
          <Logo />
        </div>
        <div
          className="block md:hidden"
          onClick={() => setNavOpen((cv) => !cv)}
        >
          {!navOpen ? (
            <div>
              <span className="block h-0.5 w-5 mb-1 bg-gray-800"></span>
              <span className="block h-0.5 w-5 bg-gray-800"></span>
            </div>
          ) : (
            <div>
              <span className="block h-0.5 w-5 mb-1 bg-gray-800 transform rotate-45"></span>
              <span className="block h-0.5 w-5 bg-gray-800 transform rotate-[-45deg] translate-y-[-6px]"></span>
            </div>
          )}

          {/* <span></span> */}
        </div>
        <div className="md:w-3/4 hidden md:flex justify-between items-center">
          <div className="w-3/4 flex justify-end items-center">
            <Link href="/">
              {" "}
              <p
                className={styles.link + ` ${active === "/" && styles.active}`}
              >
                Home
              </p>
            </Link>
            <Link href="/dashboard">
              <p
                className={
                  styles.link + ` ${active === "/dashboard" && styles.active}`
                }
              >
                Dashboard
              </p>
            </Link>
          </div>
          <div className="w-1/4 flex justify-end items-center">
            <Link href="/auth/login"><button>Login</button></Link>
          </div>
        </div>
      </div>
      <div className={`text-center w-full md:hidden bg-white py-5 overflow-hidden ${navOpen ? "block" : "hidden"}`}>
        <Link href="/">
          <p className="mb-3">Home</p>
        </Link>
        <Link href="/dashboard">
          <p className="mb-3">Dashboard</p>
        </Link>
        <Link href="/auth/login">
          <p className="mb-3">Login</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
