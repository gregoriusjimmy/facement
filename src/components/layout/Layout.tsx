import * as React from 'react';

import ButtonLink from '../links/ButtonLink';
import UnstyledLink from '../links/UnstyledLink';

import Logo from '~/svg/facement-logo.svg';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div>
      <div className='bg-primary-500'>
        <nav className='layout flex h-20 items-center justify-between py-4'>
          <UnstyledLink href='/'>
            <Logo className='h-11 text-9xl' />
          </UnstyledLink>
          <ButtonLink href='/signin' variant='outline'>
            Sign in
          </ButtonLink>
        </nav>
      </div>
      {children}
    </div>
  );
}
