import type { AxiosError } from 'axios';

export type DocumentTypeMap = {
  [key: string]: string;
};

export type Countries = {
  [key: string]: string;
};

export type ParsedError = {
  code?: number;
  errorCode?: string;
  errorMessage: string;
  method?: string;
  path?: string;
};

export type AxiosApiError = AxiosError<{
  errorCode?: string;
  errorMessage?: string;
}>;
