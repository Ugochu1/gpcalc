import AuthLayout from "@/layouts/AuthLayout";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import styles from "./Login.module.scss";
import TextInput from "@/components/TextInput/TextInput";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupRequest } from "../api/auth/signup";



const Signup: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequest>();

  const onSubmit: SubmitHandler<SignupRequest> = (data) => console.log(data);
  return (
    <>
      <Head>
        <title>Signup page</title>
      </Head>
      <div className={styles.header}>Create new account.</div>
      <div className={"mt-2 " + styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="Firstname"
            register={register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className={styles.error}>Firstname field is required</span>
          )}
          <TextInput
            name="Lastname"
            register={register("lastname", { required: true })}
          />
          {errors.firstname && (
            <span className={styles.error}>Firstname field is required</span>
          )}
          <TextInput
            name="Username"
            register={register("username", { required: true })}
          />
          {errors.username && (
            <span className={styles.error}>Username field is required</span>
          )}
          {/* <div className="flex justify-end text-sm text-blue-700 outline-none">
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </div> */}
          <TextInput
            name="Password"
            type="password"
            register={register("password", { required: true })}
          />
          {errors.password && (
            <span className={styles.error}>Password field is required</span>
          )}
          <button>Sign up</button>
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <Link href="/auth/login">
              <span className="text-blue-600">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

Signup.getLayout = function (page) {
  return <AuthLayout full={true}>{page}</AuthLayout>;
};

export default Signup;
