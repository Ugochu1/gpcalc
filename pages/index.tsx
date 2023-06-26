import MainLayout from "@/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";

const Homepage: NextPageWithLayout = () => {
  return <div></div>;
};

Homepage.getLayout = function (page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Homepage;
