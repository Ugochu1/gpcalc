import AuthLayout from "@/layouts/AuthLayout";
import { NextPageWithLayout } from "../_app";
import styles from "./Auth.module.scss";
import TextInput from "@/components/TextInput/TextInput";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupRequest } from "../api/auth/signup";
import AuthService from "@/lib/services/auth";
import { useState } from "react";
import { Loading } from "@/components/pageLoader/PageLoader";
import { useNotificationContext } from "@/lib/contexts/NotificationContext";
import { useRouter } from "next/router";

const Signup: NextPageWithLayout = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupRequest>();
  const [loading, setLoading] = useState(false);
  const { setNotification, setShowNotification } = useNotificationContext();
  const router = useRouter();

  const onSubmit: SubmitHandler<SignupRequest> = async (data) => {
    setLoading(true);
    const response = await AuthService.signup(data);
    if (typeof response !== "string") {
      setNotification(
        "New user created successfully! Sign in to your account to continue."
      );
      setShowNotification(true);
      router.replace("/auth/login");
    } else {
      setNotification(response);
      setShowNotification(true);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <TextInput
            type="text"
            id="firstname"
            label="Firstname"
            register={register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-xs text-red-500">Firstname is required</span>
          )}
          <TextInput
            type="text"
            id="lastname"
            label="Lastname"
            register={register("lastname", { required: true })}
          />
          {errors.lastname && (
            <span className="text-xs text-red-500">Lastname is required</span>
          )}

          <TextInput
            type="text"
            id="username"
            label="Username"
            register={register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-xs text-red-500">Username is required</span>
          )}

          <TextInput
            type="password"
            id="password"
            label="Password"
            register={register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-xs text-red-500">Password is required</span>
          )}

          {/* <div className="text-xs text-right text-blue-600">
            Forgot Password?
          </div> */}
          <button>Sign Up {loading && <Loading />}</button>
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
