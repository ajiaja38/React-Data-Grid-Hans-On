export interface IResWrap<T> {
  code: number;
  message: string;
  status: boolean;
  data: T;
}
