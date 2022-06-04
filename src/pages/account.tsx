import { useEffect, useState } from 'react'

import clsxm from '@/lib/clsxm'
import { useAccount } from '@/hooks/useAccount'
import { usePost } from '@/hooks/usePost'

import Button from '@/components/buttons/Button'
import Layout from '@/components/layout/Layout'
import ButtonLink from '@/components/links/ButtonLink'
import Modal from '@/components/modal/Modal'
import Seo from '@/components/Seo'
import { Spinner } from '@/components/spinner/Spinner'

import { MONTHS } from '@/utils/constants'

import { TTransaction } from '@/types/common'
import {
  IGetTransactionsRes,
  IGetTransactionsSpec,
  ITopUpRes,
  ITopUpSpec,
} from '@/types/networkTypes'

export default function AccountPage() {
  const [showModal, setShowModal] = useState(false)
  const [topUpAmount, setTopUpAmount] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<TTransaction[]>([])
  const account = useAccount()
  const [balance, setBalance] = useState(account?.balance || 0)
  const postTopUp = usePost<ITopUpRes, ITopUpSpec>('transaction/topUp')
  const postTransactionsGet = usePost<
    IGetTransactionsRes,
    IGetTransactionsSpec
  >('transaction/get/lastFive')

  const handleTopUpSubmit = async () => {
    try {
      if (account) {
        setIsLoading(true)
        const resTopUp = await postTopUp({
          accountId: account.id,
          amount: parseInt(topUpAmount),
        })
        setBalance(resTopUp.balance)
        setShowModal(false)
        const resTransactionsGet = await postTransactionsGet({
          accountId: account.id,
        })
        setTransactions(resTransactionsGet.transactions)
      } else {
        alert('Error account not found')
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!account) {
      setIsLoading(true)
      return
    }
    const fetchTransactions = async () => {
      try {
        const resTransactionsGet = await postTransactionsGet({
          accountId: account.id,
        })
        setTransactions(resTransactionsGet.transactions)
      } catch (error) {
        console.error(error)
      }
    }
    setBalance(account.balance)
    fetchTransactions()
    setIsLoading(false)
  }, [account, postTransactionsGet])

  const renderTransactionsHistory = () => (
    <table className='w-full table-auto text-center'>
      {transactions.map((transaction) => {
        const date = new Date(transaction.createdAt)
        return (
          <tr key={transaction.id} className='w-full'>
            <td className='border'>
              {transaction.type === 'ADD' ? 'Cash In' : 'Cash Out'}
            </td>
            <td
              className={clsxm(
                transaction.type === 'ADD' ? 'text-green-600' : 'text-red-600',
                'border'
              )}
            >{`${transaction.type === 'ADD' ? '+' : '-'}$${
              transaction.amount
            }`}</td>
            <td className='border'>{`${date.getDate()} ${
              MONTHS[date.getMonth()]
            } ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`}</td>
          </tr>
        )
      })}
    </table>
  )

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
              onChange={(e) => setTopUpAmount(e.target.value)}
            />
          </div>
          <Button variant='secondary' onClick={() => handleTopUpSubmit()}>
            CONFIRM
          </Button>
        </div>
      </Modal>
      <main className='layout'>
        {isLoading && (
          <div className='min-h-main flex w-full items-center justify-center'>
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <div className='min-h-main flex flex-col justify-center space-y-16'>
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
              <div className='flex flex-col space-y-4 md:w-1/2'>
                <h3>Transactions History</h3>
                {transactions && renderTransactionsHistory()}
                {!transactions && <h2>No recent transactions</h2>}
              </div>
            </div>
            <div className='flex justify-center'>
              <ButtonLink href='/demo'>TRY FACE PAYMENT DEMO</ButtonLink>
            </div>
          </div>
        )}
      </main>
    </Layout>
  )
}
