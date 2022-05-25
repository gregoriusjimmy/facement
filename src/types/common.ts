export type TTransaction = {
  id: number
  accountId: number
  amount: number
  type: TTransactionType
  createdAt: string
}

export type TTransactionType = 'ADD' | 'SUBTRACT'

export type TAccount = {
  id: number
  email: string
  balance: number
}
