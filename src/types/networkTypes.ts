export interface IStandardResponse {
  ok: boolean
  message: string
  token?: string
}

export interface IAccountExistRes extends IStandardResponse {
  isAccountExist: boolean
}

export interface IAccountExistSpec {
  email: string
}
export interface IFaceApiValidRes extends IStandardResponse {
  isValid: boolean
}

export interface IFaceApiValidSpec {
  photo: string
}

export interface IAuthRegisterRes extends IStandardResponse {
  token: string
}

export interface IAuthRegisterSpec {
  email: string
  password: string
  phoneNumber: string
  photo: string
}

export interface IAuthLoginRes extends IStandardResponse {
  token: string
}

export interface IAuthLoginSpec {
  email: string
  password: string
}

export interface ITokenVerifyRes extends IStandardResponse {
  isVerified: boolean
}
