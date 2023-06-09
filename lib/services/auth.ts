// import { LoginRequest, LoginResponse } from "@/pages/auth/login";
import http from "../hooks/useHttp";
import { SignupRequest } from "@/pages/api/auth/signup";
import { UserDetails } from "./client";
import { LoginRequest, LoginResponse } from "@/pages/api/auth/login";

class AuthService {
  // instantiate the api
  static get api() {
    return http({
      baseURL: `http://localhost:3000/api/auth`,
    });
  }

  static login(payload: LoginRequest) {
    return this.api.post<LoginRequest, LoginResponse | string>("/login", payload);
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
