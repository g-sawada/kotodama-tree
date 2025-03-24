export type FetchResult<T> = SuccessResponse<T> | ErrorResponse;

type SuccessResponse<T> = {
  status: number;
  isOk: true;
  body: {
    data: T;               // ジェネリック型 T を置いておき，引数で型を指定
    message?: string
  };
};

type ErrorResponse = {
  status: number;
  isOk: false;
  body: {
    error: string;
  };
};
