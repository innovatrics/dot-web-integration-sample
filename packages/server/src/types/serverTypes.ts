export type DocumentTypeMap = {
  [key: string]: string;
};

export type Countries = {
  [key: string]: string;
};

export type ParsedError = {
  errorMessage: string;
  errorCode?: string;
  code?: number;
  path?: string;
  method?: string;
};

export enum Connection {
  SERVER = 'SERVER',
  CONTACT_FORM = 'CONTACT_FORM',
  RECAPTCHA = 'RECAPTCHA',
}
