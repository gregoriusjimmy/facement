import { TTransaction } from './common'

export interface IAccountExistRes {
  isAccountExist: boolean
}

export interface IAccountExistSpec {
  email: string
}

export interface IAccountExistPhoneNumberSpec {
  phoneNumber: string
}

export interface IFaceApiValidateSpec {
  photo: string
}

export interface IFaceApiValidateRes {
  isValid: boolean
}

export interface IValidatePhoneNumberSpec {
  phoneNumber: string
}
export interface IValidatePhoneNumberRes {
  isValid: boolean
}

export interface IAuthRegisterSpec {
  email: string
  password: string
  phoneNumber: string
  photo: string
}

export interface IAuthLoginRes {
  token: string
}

export interface IAuthLoginSpec {
  email: string
  password: string
}

export interface ITokenVerifyRes {
  isVerified: boolean
}
export interface ITopUpSpec {
  accountId: number
  amount: number
}

export interface ITopUpRes {
  transaction: TTransaction
  balance: number
}
export interface IPaySpec {
  phoneNumber: string
  photo: string
  amount: number
}

export interface IPayRes {
  transaction: TTransaction
  balance: number
}

export interface IAccountGetRes {
  account: {
    id: number
    email: string
    balance: number
  }
}
