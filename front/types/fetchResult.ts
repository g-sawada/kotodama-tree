export interface FetchResult<T> {
  status: number;
  isOk: boolean;
  body: SuccessResponse<T> | ErrorResponse;
};

interface SuccessResponse<T> {
  data: T;               // ジェネリック型 T を置いておき，引数で型を指定
  message?: string
};

interface ErrorResponse {
  error: string
};
