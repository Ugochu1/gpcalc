import { LoginRequest, LoginResponse } from "@/pages/auth/login";
import http from "../hooks/useHttp";
import { SignupRequest } from "@/pages/auth/signup";
import { UserDetails } from "./client";

class AuthService {
  // instantiate the api
  static get api() {
    return http({
      baseURL: `${process.env.BASE_URL}/api/auth`,
    });
  }

  static login(payload: LoginRequest) {
    return this.api.post<LoginRequest, LoginResponse>("/login", payload);
  }

  static signup(payload: SignupRequest) {
    return this.api.post<SignupRequest, { message: string }>(
      "/signup",
      payload
    );
  }

  static signout() {
    return this.api.post<UserDetails, { signedOut: boolean }>("/signOut")
  }
}

export default AuthService;
