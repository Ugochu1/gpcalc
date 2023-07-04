import AuthLayout from "@/layouts/AuthLayout";
import { NextPageWithLayout } from "../_app";
import styles from "./Auth.module.scss";
import TextInput from "@/components/TextInput/TextInput";
import Link from "next/link";

const Login: NextPageWithLayout = () => {
  return (
    <>
      <form>
        <div className={styles.input}>
          <TextInput type="text" id="username" label="Username" />
          <TextInput type="password" id="password" label="Password" />
          <div className="text-xs text-right text-blue-600">
            Forgot Password?
          </div>
          <button>Sign In</button>
          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <span className="text-blue-600 uppercase">
              <Link href="/auth/signup">Signup Now</Link>
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

Login.getLayout = function (page) {
  return <AuthLayout title="Sign In">{page}</AuthLayout>;
};

export default Login;
