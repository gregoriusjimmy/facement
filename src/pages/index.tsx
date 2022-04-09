import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import ManStandOutSVG from '~/svg/man-stand-out.svg';
import Work1SVG from '~/svg/work1.svg';
import Work2SVG from '~/svg/work2.svg';
import Work3SVG from '~/svg/work3.svg';

export default function HomePage() {
  return (
    <Layout>
      <Seo />
      <main>
        <div className='flex h-[92vh] flex-col bg-primary-500'>
          <section className='flex h-full items-center'>
            <div className='layout flex flex-col space-y-5 md:flex-row-reverse md:items-center md:justify-between'>
              <NextImage
                className='relative h-[250px] md:h-[300px] md:w-1/2 lg:h-[400px]'
                src='/images/hero-image.png'
                layout='fill'
                objectFit='contain'
              />
              <div className='space-y-4 text-center md:w-2/5 md:space-y-8 md:text-left'>
                <h1 className='font-bold text-white lg:text-5xl lg:leading-[50px]'>
                  Easy face scan to pay your needs.
                </h1>
                <h3 className='font-secondary text-white'>
                  Simple e-wallet with face recognition
                </h3>
                <div className='flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6'>
                  <Button variant='secondary'>Create an account</Button>
                  <Button variant='outline'>How it Works</Button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className='relative overflow-hidden bg-[#F1F3FA] py-[100px] md:py-[200px]'>
          <div className='layout z-10 space-y-5 lg:space-y-8 '>
            <h1 className='font-semibold lg:text-5xl'>Try Our Demo</h1>
            <p className='max-w-xs md:max-w-sm'>
              Be the first to try our e-wallet account with face payment demo by
              creating your account
            </p>
            <Button variant='primary'>Create an account</Button>
          </div>
          <ManStandOutSVG
            className='absolute bottom-[-100px] right-[-100px] z-0 h-[200px] w-full
          max-w-md sm:top-[100px] sm:right-[-100px] sm:h-[400px] md:right-[-20px] lg:right-[150px] lg:h-[400px] lg:max-w-xl '
          />
        </section>
        <section className='bg-primary-500'>
          <div className='layout space-y-12 py-16 text-white'>
            <h1 className='text-center sm:mb-14 md:mb-24 lg:mb-28'>
              How Facement Works
            </h1>
            <div className='flex flex-col space-y-5 md:flex-row md:items-center'>
              <div className='md:w-1/2'>
                <Work1SVG className='h-[200px] w-full md:h-[300px]' />
              </div>
              <div className='md:w-1/2 lg:max-w-md'>
                <h2 className='mb-4'>Create your account</h2>
                <p>
                  Your account will be a place for you to store your e-wallet.
                  In this step, we will ask you to take a picture of yourself.
                  Later on, your picture will be used for validation when you
                  did a transaction
                </p>
              </div>
            </div>
            <div className='md:jus flex flex-col space-y-5 md:flex-row-reverse md:items-center'>
              <div className='md:w-1/2'>
                <Work2SVG className='h-[200px] w-full md:h-[300px]' />
              </div>
              <div className='md:w-1/2 lg:max-w-md'>
                <h2 className='mb-4'>Top up</h2>
                <p>
                  After you created an account, you need to top up your e-wallet
                  to enable you to pay cashlessly. In this demo, the Top-Up is
                  not real! So you don&apos;t need to spend your real money.
                </p>
              </div>
            </div>
            <div className='md:jus flex flex-col space-y-5 md:flex-row md:items-center'>
              <div className='md:w-1/2'>
                <Work3SVG className='h-[180px] w-full md:h-[280px]' />
              </div>
              <div className='md:w-1/2 lg:max-w-md'>
                <h2 className='mb-4'>Create your account</h2>
                <p>
                  Your account will be a place for you to store your e-wallet.
                  In this step, we will ask you to take a picture of yourself.
                  Later on, your picture will be used for validation when you
                  did a transaction
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
