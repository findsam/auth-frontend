export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInResponse {
  firstName: string;
  lastName: string;
  email: string;
  id: string | number;
}

export interface Response<T> {
  results: T[];
  message?: string;
  status: number;
}

export interface ResponseError {
  error: string;
}
