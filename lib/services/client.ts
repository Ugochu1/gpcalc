// import { LoginRequest } from "@/pages/auth/login";
import { LoginRequest } from "@/pages/api/auth/login";
import http, { serverHttp } from "../hooks/useHttp";
import { Course, UserInterface } from "../interfaces/UserInterface";
import { MainRecord } from "../interfaces/RecordsInterface";
import { AxiosRequestConfig } from "axios";
import { CreateRecordInputs } from "@/components/createRecord/CreateRecord";

export interface RecordRequest {
  id: string;
}

export interface UserDetails {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export interface GetProps {
  preview?: string;
  page_number?: string;
  skip?: string;
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

  static getRecords(options?: GetProps) {
    return this.api.get<
      null,
      { response: MainRecord[]; count: number } | string
    >(
      `/record/get_records?preview=${options?.preview}&page_number=${options?.page_number}&skip=${options?.skip}`
    );
  }

  static getRecord(payload: RecordRequest) {
    return this.api.get<null, MainRecord>(
      "/record/get_record?id=" + payload.id
    );
  }

  static initializeRecord(payload: CreateRecordInputs) {
    return this.api.post<
      CreateRecordInputs,
      string | boolean | { record: MainRecord }
    >("/record/initialize", payload);
  }

  static calculateGPA(payload: Array<Course>) {
    return this.api.post<Array<Course>, number | string>(
      "/calculate_gpa",
      payload
    );
  }

  static save(payload: Pick<MainRecord, "_id" | "records" | "gpa">) {
    return this.api.post<
      Pick<MainRecord, "_id" | "records" | "gpa">,
      MainRecord
    >("/record/save", payload);
  }

  // server requests go here
  static get serverapi() {
    return serverHttp({
      baseURL: `http://localhost:3000/api/user`,
    });
  }

  static getServerRecords(config?: AxiosRequestConfig, options?: GetProps) {
    return this.serverapi.get<
      null,
      { response: MainRecord[]; count: number } | string
    >(
      `/record/get_records?preview=${options?.preview}&page_number=${options?.page_number}`,
      config
    );
  }
}

export default ClientService;
