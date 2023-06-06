import { LoginRequest } from "@/pages/auth/login";
import http from "../hooks/useHttp";
import {
  Course,
  UserInterface,
  Record,
  RecordWithSemester,
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
      baseURL: `${process.env.BASE_URL}/api/user`,
    });
  }

  static getUser() {
    return this.api.get<null, UserDetails>("/get_user");
  }

  static getRecords(payload: LoginRequest) {
    return this.api.post<LoginRequest, Array<Record>>("/get_records", payload);
  }

  static getRecord(payload: RecordRequest) {
    return this.api.post<RecordRequest, RecordWithSemester>(
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
