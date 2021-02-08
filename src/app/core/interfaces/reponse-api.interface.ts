export interface ResponseApi<T> {
  status: number,
  data: T;
  message: string;
  success: boolean;
}
