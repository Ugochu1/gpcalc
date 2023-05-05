import { ChangeEvent, useState } from "react";
import { wfetch } from "@/lib/wfetch";

interface Options {
  method: string;
  body?: BodyInit;
  headers?: {
    "Content-Type": "application/json";
    Authorization?: string;
  };
}

export default function Signup() {
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
    const options: Options = {
      method: "POST",
      body: JSON.stringify(details),
    };

    const result = await wfetch("/api/signup", options);
  };

  return (
    <main>
      {JSON.stringify(details)}
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
