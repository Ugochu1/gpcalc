import AuthLayout from "@/layouts/AuthLayout";
import { NextPageWithLayout } from "../_app";
import styles from "./Auth.module.scss";
import TextInput from "@/components/TextInput/TextInput";
import Link from "next/link";

const Signup: NextPageWithLayout = () => {
  return (
    <>
      <form>
        <div className={styles.input}>
          <TextInput type="text" id="firstname" label="Firstname" />
          <TextInput type="text" id="lastname" label="Lastname" />
          <TextInput type="text" id="username" label="Username" />
          <TextInput type="password" id="password" label="Password" />
          {/* <div className="text-xs text-right text-blue-600">
            Forgot Password?
          </div> */}
          <button>Sign Up</button>
          <p className="text-sm">
            Already have an account?{" "}
            <span className="text-blue-600 uppercase">
              <Link href="/auth/signup">Sign In</Link>
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

Signup.getLayout = function (page) {
  return <AuthLayout title="Sign Up">{page}</AuthLayout>;
};

export default Signup;
