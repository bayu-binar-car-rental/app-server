import { Response } from "express";

class ResponseBuilder {
  constructor() {}
  static response<T = any>({
    ...params
  }: {
    res: Response;
    code: number;
    data: T;
    message?: string;
    meta?: {
      page: number;
      size: number;
      totalPages?: number;
      totalData: number;
    };
  }) {
    return params.res.status(params.code).json({
      message: params.message,
      data: params.data,
    });
  }
}

export default ResponseBuilder;
