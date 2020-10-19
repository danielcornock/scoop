export interface IResponseObject<TData, TMeta> {
  data: TData;
  meta?: TMeta;
}

export type HttpResponse<TData, TMeta = undefined> = Promise<IResponseObject<
  TData,
  TMeta
> | void>;
