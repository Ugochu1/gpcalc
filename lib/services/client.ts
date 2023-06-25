// import { LoginRequest } from "@/pages/auth/login";
import { LoginRequest } from "@/pages/api/auth/login";
import http from "../hooks/useHttp";
import {
  Course,
  UserInterface,
} from "../interfaces/UserInterface";

export interface RecordRequest {
  title: string;
}

export interface UserDetails {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

class ClientService {
  static get api() {
    return http({
      baseURL: `http://localhost:3000/api/user`,
    });
  }

  static getUser() {
    return this.api.get<null, UserInterface | string>("/get_user");
  }

  static getRecords(payload: LoginRequest) {
    return this.api.post<LoginRequest>("/get_records", payload);
  }

  static getRecord(payload: RecordRequest) {
    return this.api.post<RecordRequest>(
      "/get_record",
      payload
    );
  }

  static calculateGPA(payload: Array<Course>) {
    return this.api.post<Array<Course>, { gpa: number }>(
      "/calculate_gpa",
      payload
    );
  }
}

export default ClientService;
