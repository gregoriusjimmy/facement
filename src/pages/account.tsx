import { useEffect, useState } from 'react'

import { useAccount } from '@/hooks/useAccount'
import { usePost } from '@/hooks/usePost'

import Button from '@/components/buttons/Button'
import Layout from '@/components/layout/Layout'
import ButtonLink from '@/components/links/ButtonLink'
import Modal from '@/components/modal/Modal'
import Seo from '@/components/Seo'

import {
  IAccountGetBalanceRes,
  ITopUpRes,
  ITopUpSpec,
} from '@/types/networkTypes'

export default function AccountPage() {
  const [showModal, setShowModal] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState(0)
  const account = useAccount()
  const [balance, setBalance] = useState(account?.balance || 0)
  const postTopUp = usePost<ITopUpRes, ITopUpSpec>('transaction/topUp')
  const postAccountGetBalance = usePost<IAccountGetBalanceRes, null>(
    'account/get/balance'
  )

  const handleTopUpSubmit = async () => {
    try {
      if (account) {
        await postTopUp({
          accountId: account.id,
          amount: topUpAmount,
        })
        const res = await postAccountGetBalance(null)
        setBalance(res.balance)
        setShowModal(false)
      } else {
        alert('Error account not found')
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
    }
  }
  useEffect(() => {
    if (account) setBalance(account.balance)
  }, [account])

  return (
    <Layout>
      <Seo />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className='flex flex-col justify-center space-y-10 text-center sm:space-y-12'>
          <h1>Top Up Amount</h1>
          <div className='flex items-center overflow-hidden border-b-2 text-5xl '>
            <span className='font-bold text-slate-500'>$</span>
            <input
              className='-mr-14 font-bold text-primary-500 focus:outline-none'
              type='number'
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(parseInt(e.target.value))}
            />
          </div>
          <Button variant='secondary' onClick={() => handleTopUpSubmit()}>
            CONFIRM
          </Button>
        </div>
      </Modal>
      <main className='layout'>
        <div className='mb-4 flex flex-col space-y-10 md:flex-row md:items-center'>
          <div className='flex flex-col md:w-1/2'>
            <h3 className='mb-2'>Balance</h3>
            <h1 className='mb-4 text-7xl font-bold text-primary-500'>
              {balance}
            </h1>
            <Button
              className='max-w-xs'
              onClick={() => setShowModal(true)}
              variant='secondary'
            >
              TOP UP
            </Button>
          </div>
          <div>
            <h3>Transactions History</h3>
          </div>
        </div>
        <div className='flex justify-center'>
          <ButtonLink href='/demo'>TRY FACE PAYMENT DEMO</ButtonLink>
        </div>
      </main>
    </Layout>
  )
}
