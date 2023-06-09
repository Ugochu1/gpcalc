import Link from "next/link";
import styles from "./Homepage.module.scss";
import Head from "next/head";
import { useEffect, useState } from "react";

import Problem from "../public/problems_solving.jpg";
import Solution from "../public/solutions_solving.jpg";
import GetRecords from "../public/result_access_by_button_click.jpg";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";

import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5";

export default function Home() {
  const [idx, setIdx] = useState<number>(0);

  const changeSlideForward = () => {
    switch (idx) {
      case 0: setIdx(1); break;
      case 1: setIdx(2); break;
      case 2: setIdx(0); break;
    }
  };

  const changeSlideBackward = () => {
    switch (idx) {
      case 0: setIdx(2); break;
      case 1: setIdx(0); break;
      case 2: setIdx(1); break;
    }
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     if (idx < 2) {
  //       if (idx === 0) {
  //         setIdx(1);
  //       } else {
  //         setIdx((cv) => cv + 1);
  //       }
  //     } else {
  //       setIdx(0);
  //     }
  //   }, 5000);
  // }, [idx]);

  return (
    <div>
      <Head>
        <title>GP-Calc Homepage</title>
      </Head>
      <Navbar />
      <div className={styles.slideshow}>
        <div
          className={
            styles.slide + " " + styles.red + ` ${idx === 0 && styles.active}`
          }
        >
          <div className={styles.writeup}>
            <h1>Are you having problems calculating your GPA?</h1>
            <p>
              {" "}
              Don&apos;t let GPA calculations hold you back. Say goodbye to the
              confusion and frustration of manual calculations. Simplify the
              process and unlock your true potential with our user-friendly GPA
              calculator. Start calculating with ease today!
            </p>
            <button>Register with Us!</button>
          </div>
          <div className={styles.pictures}>
            <Image
              src={Problem}
              alt="Image One"
              style={{
                height: "470px",
                width: "470px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
        <div
          className={
            styles.slide + " " + styles.green + ` ${idx === 1 && styles.active}`
          }
        >
          <div className={styles.writeup}>
            <h1>Good News! Your problems are gone, with us around.</h1>
            <p>
              Our GPA calculator is the ultimate solution for all your grade
              point average calculation woes. Say goodbye to the stress and
              confusion of manual calculations or outdated methods. With our
              cutting-edge tool, calculating your GPA has never been easier.{" "}
            </p>
            <button>Register with Us!</button>
          </div>
          <div className={styles.pictures}>
            <Image
              src={Solution}
              alt="Image Two"
              style={{
                height: "470px",
                width: "470px",
                objectFit: "cover",
                // borderRadius: "50%",
              }}
            />
          </div>
        </div>
        <div
          className={
            styles.slide + " " + styles.blue + ` ${idx === 2 && styles.active}`
          }
        >
          <div className={styles.writeup}>
            <h1>Get your records with just the click of a button.</h1>
            <p>
              {" "}
              Our GPA calculator brings convenience to the forefront by offering
              you instant access to your academic records. No more digging
              through piles of paperwork or searching for old report cards.
            </p>
            <button>Register with Us!</button>
          </div>
          <div className={styles.pictures}>
            <Image
              src={GetRecords}
              alt="Image Three"
              style={{
                height: "470px",
                width: "470px",
                objectFit: "cover",
                // borderRadius: "50%",
              }}
            />
          </div>
        </div>
        <div
          className={
            styles.custom_shape_divider_top_1686273595 +
            ` ${
              idx === 0 ? styles.red : idx === 1 ? styles.green : styles.blue
            }`
          }
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className={styles.shape_fill}
            ></path>
          </svg>
        </div>
      </div>
      <div className={styles.indicator_container}>
        {[0, 1, 2].map((index, id) => (
          <div
            key={id}
            className={
              styles.indicator + " " + (index === idx && styles.active)
            }
          ></div>
        ))}
      </div>
      <div className={styles.backbutton} onClick={changeSlideBackward}>
        <IoChevronBackSharp size={30} />
      </div>
      <div className={styles.forwardbutton} onClick={changeSlideForward}>
        <IoChevronForwardSharp size={30} />
      </div>
    </div>
  );
}
