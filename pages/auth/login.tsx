import AuthLayout from "@/layouts/AuthLayout";
import { NextPageWithLayout } from "../_app";

const Login: NextPageWithLayout = () => {
  return <></>
}

Login.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>
}

export default Login;