import AuthLayout from "@/layouts/AuthLayout";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import styles from "./Login.module.scss";
import TextInput from "@/components/TextInput/TextInput";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginRequest } from "../api/auth/login";

const Login: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit: SubmitHandler<LoginRequest> = (data) => console.log(data);
  return (
    <>
      <Head>
        <title>Login page</title>
      </Head>
      <div className={styles.header}>Login to your account.</div>
      <div className={"mt-2 " + styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="Username"
            register={register("username", { required: true })}
          />
          {errors.username && (
            <span className={styles.error}>Username field is required</span>
          )}
          <div className="flex justify-end text-sm text-blue-700 outline-none">
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </div>
          <TextInput
            name="Password"
            type="password"
            register={register("password", { required: true })}
          />
          {errors.password && (
            <span className={styles.error}>Password field is required</span>
          )}
          <button>Login</button>
          <p className="mt-5 text-center">
            Don&apos;t have an account yet?{" "}
            <Link href="/auth/signup">
              <span className="text-blue-600">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

Login.getLayout = function (page) {
  return <AuthLayout full={false}>{page}</AuthLayout>;
};

export default Login;
