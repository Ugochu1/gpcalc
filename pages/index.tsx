import MainLayout from "@/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import styles from "./Homepage.module.scss";
import Button from "@/components/button/Button";
import { HiDocumentText } from "react-icons/hi";
import { FaRocket } from "react-icons/fa";
import Collage from "@/components/imageDisplay/Collage";
import { useState, useRef, useEffect } from "react";
import useScreenSize from "@/hooks/useScreenSize";
import useScrollPos from "@/hooks/useScrollPos";

const Homepage: NextPageWithLayout = () => {
  const [divTop, setDivTop] = useState<number>(0);
  const scrollPos = useScrollPos();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    progressRef.current && setDivTop(progressRef.current.offsetTop);
  }, []);

  useScreenSize(false, () => {
    progressRef.current && setDivTop(progressRef.current.offsetTop);
  });

  function getRatio() {
    let ratio = scrollPos / divTop;
    if (ratio < 0) ratio = 0;
    else if (ratio > 1) ratio = 1;
    else return ratio;
  }

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.landing}>
        <div className={styles.text}>
          <p>An easy to use platform.</p>
          <h1>Boring stuff is our forte.</h1>
        </div>
        <div className={styles.buttons}>
          <Button>Get started</Button>
          <div className={styles.aboutbutton}>
            <div className={styles.button}>
              <HiDocumentText size={25} style={{ color: "white" }} />
            </div>
            <div className="text-sm">About Us</div>
          </div>
        </div>
      </div>
      <Collage />
      <div className={styles.progress} ref={progressRef}>
        <div className={styles.progressText}>
          Let&apos;s get straight into it.
        </div>
        <div className={styles.rocket} style={{ left: `${getRatio()! * 94}%` }}>
          <span
            style={{
              transform: `${
                getRatio()! > 0 && getRatio()! < 1
                  ? "rotate(45deg)"
                  : "rotate(-45deg)"
              }`,
              transition: ".2s linear",
            }}
          >
            <FaRocket />
          </span>
        </div>
      </div>
      <div className={styles.whatweoffer}>
        <div className={styles.header}>Why choose us?</div>
        <div className={styles.body}>
          <div className={styles.service}>
            <h1>Effortless GPA Calculation</h1>
            <p>
              Say goodbye to manual calculations and complex formulas. Our GPA
              calculator simplifies the process, allowing you to calculate your
              grade point average with just a few clicks. Save time and
              eliminate errors by utilizing our efficient tool.
            </p>
          </div>
          <div className={styles.service}>
            <h1>Accurate Results, Always</h1>
            <p>
              Our GPA calculator ensures precise calculations, giving you a
              reliable representation of your academic performance. With our
              advanced algorithms, you can trust that the results are accurate
              and consistent, empowering you to make informed decisions about
              your academic journey.
            </p>
          </div>
          <div className={styles.service}>
            <h1>Track Your Progress</h1>
            <p>
              Monitor your academic progress effortlessly. Our GPA calculator
              enables you to keep a close eye on your grade point average over
              time. By tracking your GPA, you can identify areas for improvement
              and set goals to achieve the academic success you desire.
            </p>
          </div>
          <div className={styles.service}>
            <h1>Plan Your Future</h1>
            <p>
              Want to set realistic goals for the future? Our GPA calculator
              lets you explore hypothetical scenarios by inputting potential
              grades for upcoming assignments or exams. By experimenting with
              different grades, you can gauge the impact on your GPA and plan
              your academic path accordingly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Homepage.getLayout = function (page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Homepage;
