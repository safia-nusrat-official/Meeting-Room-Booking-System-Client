import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TErrorSources = {
  path: number | string;
  message: string;
}[];

export interface TMeta {
  limit: number;
  page: number;
  totalDocuments: number;
  totalPages: number;
}

export interface TResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?:TMeta;
  errorMessages?: TErrorSources[];
  stack?: null | string;
  error?: any;
}

export type TReduxResponse<T> = TResponse<T> & BaseQueryApi;
