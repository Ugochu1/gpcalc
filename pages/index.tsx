import MainLayout from "@/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import styles from "./Homepage.module.scss";
import Button from "@/components/button/Button";
import { HiDocumentText, HiLightBulb } from "react-icons/hi";
import { FaRocket } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { AiOutlineCheck } from "react-icons/ai";
import { MdCalculate } from "react-icons/md";

import Collage from "@/components/imageDisplay/Collage";
import { useState, useRef, useEffect } from "react";
import useScreenSize from "@/hooks/useScreenSize";
import useScrollPos from "@/hooks/useScrollPos";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

const iconStyle = {
  color: "white",
};

const Homepage: NextPageWithLayout = () => {
  const [divTop, setDivTop] = useState<number>(0);
  const scrollPos = useScrollPos();
  const progressRef = useRef<HTMLDivElement>(null);

  function scrollToAbout() {
    if (progressRef.current) {
      progressRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

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
          <Link href="/auth/signup">
            <Button>Get started</Button>
          </Link>
          <div className={styles.aboutbutton} onClick={scrollToAbout}>
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
          Cutting straight to the chase...
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
            <div className={styles.icon}>
              <MdCalculate style={iconStyle} />
            </div>
            <h1>Easy Calculation</h1>
            <p>
              Say goodbye to manual calculations and complex formulas. Our GPA
              calculator simplifies the process, allowing you to calculate your
              grade point average with just a few clicks. Save time and
              eliminate errors by utilizing our efficient tool.
            </p>
          </div>
          <div className={styles.service}>
            <div className={styles.icon}>
              <AiOutlineCheck style={iconStyle} />
            </div>
            <h1>Accurate Results</h1>
            <p>
              Our GPA calculator ensures precise calculations, giving you a
              reliable representation of your academic performance. With our
              advanced algorithms, you can trust that the results are accurate
              and consistent, empowering you to make informed decisions about
              your academic journey.
            </p>
          </div>
          <div className={styles.service}>
            <div className={styles.icon}>
              <GiProgression style={iconStyle} />
            </div>
            <h1>Track Your Progress</h1>
            <p>
              Monitor your academic progress effortlessly. Our GPA calculator
              enables you to keep a close eye on your grade point average over
              time. By tracking your GPA, you can identify areas for improvement
              and set goals to achieve the academic success you desire.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.how_we_work}>
        <div className={styles.header}>
          <div className={styles.text}>
            <p className={styles.subheader}>How it works</p>
            <p className={styles.mainheader}>How our platform works</p>
          </div>
          <div className={styles.button}>
            <Link href="/auth/signup">
              <Button>Try us out today.</Button>
            </Link>
          </div>
        </div>
        <div className={styles.mainsection}>
          <div className={styles.bgImage}></div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.icon}>
                <HiLightBulb />
              </div>
              <div className={styles.text}>
                Click on &quot;Calculate Now&quot; to begin the process of
                calculating your grade point average.{" "}
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.icon}>
                <HiLightBulb />
              </div>
              <div className={styles.text}>
                We keep your records safe and ready for you whenever you so
                need. All you need to do to access this is, login to your
                account and all your records will be immediately available.
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.icon}>
                <HiLightBulb />
              </div>
              <div className={styles.text}>
                However, you cannot access all privileges if you do not register
                an account with us. So, grab this opportunity. CREATING AN
                ACCOUNT IS TOTALLY FREE!
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

Homepage.getLayout = function (page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Homepage;
