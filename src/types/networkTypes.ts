import { TTransaction } from './common'

export interface IAccountExistRes {
  isAccountExist: boolean
}

export interface IAccountExistSpec {
  email: string
}
export interface IFaceApiValidRes {
  isValid: boolean
}

export interface IFaceApiValidSpec {
  photo: string
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
}

export interface IAccountGetRes {
  account: {
    id: number
    email: string
    balance: number
  }
}
export interface IAccountGetBalanceRes {
  balance: number
}
