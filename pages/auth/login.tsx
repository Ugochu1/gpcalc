import AuthLayout from "@/layouts/AuthLayout";
import { NextPageWithLayout } from "../_app";
import styles from "./Auth.module.scss";
import TextInput from "@/components/TextInput/TextInput";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import AuthService from "@/lib/services/auth";
import StorageService from "@/lib/services/storage";
import { useAuthContext } from "@/lib/contexts/AuthContext";

type Inputs = {
  username: string;
  password: string;
};

const Login: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const { setUser } = useAuthContext();

  const onLogin = () => {
    const { ref } = router.query;
    router.replace(ref ? (ref as string) : "/");
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await AuthService.login(data);
    if (typeof response !== "string") {
      // set access token
      StorageService.setAccessToken(response.token);
      // set user context.
      setUser(response.user);
      // call onLogin to redirect to last page.
      onLogin();
    } else {
      console.log(response);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <TextInput
            type="text"
            id="username"
            label="Username"
            register={register("username", { required: true })}
          />
          {errors.username && (
            <span className="text-xs text-red-600">
              Username field is required
            </span>
          )}
          <TextInput
            type="password"
            id="password"
            label="Password"
            register={register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-xs text-red-600">
              Password field is required
            </span>
          )}

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
