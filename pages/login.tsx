import { ChangeEvent, useState } from "react";
import { wfetch } from "@/lib/wfetch";
import { FetchOptions } from "@/lib/interfaces/FetchOptions";
import { setCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  interface userDetails {
    username: string;
    password: string;
  }

  const [details, setDetails] = useState<userDetails>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async () => {
    // here, we submit our form
    const options: FetchOptions = {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await wfetch("/api/login", options);
    if (result.user && result.token) {
      let expiryTime = 604800*7
      setCookie("user", result.user, {
        expires: new Date((Date.now() + expiryTime))
      }); // set user cookie

      setCookie("accessToken", result.token, {
        expires: new Date((Date.now() + expiryTime))
      }); // set your access Token cookie

      // after setting the cookies, redirect to home page.
      router.push("/");
    } else {
      console.log(result);
    }
  };

  return (
    <main>
      {/* {JSON.stringify(details)} */}
      <input
        type="text"
        placeholder="Username"
        name="username"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
      />
      <button onClick={submitForm}>Submit</button>
    </main>
  );
}
