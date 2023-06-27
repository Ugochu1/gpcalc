import MainLayout from "@/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import styles from "./Homepage.module.scss";
import Button from "@/components/button/Button";
import { HiDocumentText } from "react-icons/hi";

const Homepage: NextPageWithLayout = () => {
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.landing}>
        <div className={styles.text}>
          <p>Easy to use platform</p>
          <h1>Boring stuff is our forte. &#128521;</h1>
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
    </div>
  );
};

Homepage.getLayout = function (page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Homepage;
