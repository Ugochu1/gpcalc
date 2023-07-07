import { AxiosRequestConfig } from "axios";
import { GetServerSidePropsContext } from "next";
import { jwtVerify } from "../jwt";
import { Verified } from "@/pages/api/user/get_user";

const ACCESS_TOKEN_KEY = "873ue874834eu927382";

type Handler = (
  context: GetServerSidePropsContext,
  config?: AxiosRequestConfig
) => any;

export default function withSession(handler?: Handler) {
  return async (context: GetServerSidePropsContext) => {
    try {
      if (handler) {
        const accessToken = context.req.cookies[ACCESS_TOKEN_KEY];
        const options: AxiosRequestConfig = {};
        if (accessToken) {
          const verified = jwtVerify(accessToken) as Verified;
          if (verified.message) {
            throw new Error("Verification failed");
          } else {
            options.headers = {
              ...options.headers,
              Authorization: `Bearer ${accessToken}`,
            };
          }
        } else {
          throw new Error("error");
        }
        var handlerData = await handler(context, options);
      }

      return {
        props: {
          ...handlerData,
        },
      };
    } catch (err: any) {
      console.log(err.message);
      return {
        redirect: {
          permanent: false,
          destination: `/auth/login?ref=${context.resolvedUrl}`,
        },
      };
    }
  };
}
