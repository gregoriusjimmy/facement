import { useRouter } from 'next/router'
import * as React from 'react'
import { MdAccountCircle } from 'react-icons/md'

import { useAccount } from '@/hooks/useAccount'

import Button from '../buttons/Button'
import ButtonLink from '../links/ButtonLink'
import UnstyledLink from '../links/UnstyledLink'

import Logo from '~/svg/facement-logo.svg'
import LogoBlue from '~/svg/facement-logo-primary.svg'
export default function Layout({ children }: { children: React.ReactNode }) {
  const account = useAccount()
  const router = useRouter()
  const whiteHeaderRoutes = ['/account', '/demo']
  return (
    <div>
      {whiteHeaderRoutes.includes(router.pathname) ? (
        <div className='bg-white'>
          <nav className='layout flex h-20 items-center justify-between py-4'>
            <UnstyledLink href='/'>
              <LogoBlue className='h-11 text-8xl sm:text-9xl' />
            </UnstyledLink>
            {account?.email && (
              <Button variant='ghost'>
                <MdAccountCircle className='mr-2 text-3xl text-primary-500' />
                <p>{account.email}</p>
              </Button>
            )}
          </nav>
        </div>
      ) : (
        <div className='bg-primary-500'>
          <nav className='layout flex h-20 items-center justify-between py-4'>
            <UnstyledLink href='/'>
              <Logo className='h-11 text-9xl' />
            </UnstyledLink>
            {router.pathname === '/signin' && (
              <ButtonLink href='/signup' variant='outline'>
                Sign up
              </ButtonLink>
            )}
            {router.pathname !== '/signin' && (
              <ButtonLink href='/signin' variant='outline'>
                Sign in
              </ButtonLink>
            )}
          </nav>
        </div>
      )}
      {children}
    </div>
  )
}
