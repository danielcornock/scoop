export interface IResponseObject<T> {
  data: T;
  meta?: unknown;
}

export type HttpResponse<T> = Promise<IResponseObject<T> | void>;
