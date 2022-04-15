import { useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import { Modal } from '@/components/modal/modal';
import Seo from '@/components/Seo';

export default function AccountPage() {
  const [showModal, setShowModal] = useState(false);

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
            />
          </div>
          <Button variant='secondary'>CONFIRM</Button>
        </div>
      </Modal>
      <main className='layout'>
        <div className='md:min-h-main  flex flex-col space-y-10 md:flex-row md:items-center'>
          <div className='flex flex-col md:w-1/2'>
            <h3 className='mb-2'>Balance</h3>
            <h1 className='mb-4 text-7xl font-bold text-primary-500'>$150</h1>
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
      </main>
    </Layout>
  );
}
