import { useEffect, useState } from 'react'

import { usePost } from './usePost'

import { TAccount } from '@/types/common'
import { IAccountGetRes } from '@/types/networkTypes'

export function useAccount() {
  const postAccountGet = usePost<IAccountGetRes, null>('/account/get')
  const [account, setAccount] = useState<TAccount>()

  useEffect(() => {
    const fetchAccountGet = async () => {
      try {
        const { account } = await postAccountGet(null)
        setAccount(account)
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)
      }
    }
    fetchAccountGet()
  }, [postAccountGet])

  return account
}
