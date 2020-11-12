export interface IEmailSingleOptions extends IBaseEmail {
  to: string;
}

export interface IEmailMultiOptions extends IBaseEmail {
  to: string[];
}

export interface IBaseEmail {
  subject: string;
  message: string;
}
