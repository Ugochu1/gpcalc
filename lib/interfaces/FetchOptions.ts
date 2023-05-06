export interface FetchOptions {
  method: string;
  body?: BodyInit;
  headers?: {
    "Content-Type": "application/json";
    Authorization?: string;
  };
}