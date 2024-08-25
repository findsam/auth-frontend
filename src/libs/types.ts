export interface ResetPasswordRequest {
  email: string;
}

export interface ConfirmNewPasswordRequest {
  token: string;
  password: string;
}

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
  message: string;
}

export interface SignInResponseWithToken extends Response<SignInResponse> {
  token: string;
}

interface UserSecurity {
  emailVerified: boolean;
  hasTwoFactor: boolean;
  twoFactorCode: number;
}

interface UserMeta {
  createdAt: Date;
}

interface User {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  security: UserSecurity;
  meta: UserMeta;
}
