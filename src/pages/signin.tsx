import { useMediaQuery } from '@/hooks/useMediaQuery';

import Button from '@/components/buttons/Button';
import InputField from '@/components/input-field/InputField';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';

import SignInSVG from '~/svg/signin.svg';

export default function SignInPage() {
  const isMd = useMediaQuery('(max-width: 768px)');

  return (
    <Layout>
      <Seo />
      <main className='relative h-[90vh] overflow-hidden'>
        <div
          className='layout flex h-full flex-col items-center 
      justify-center md:flex-row md:justify-start '
        >
          <form className='card w-full'>
            <h3 className='mb-8 text-center md:mb-10'>
              Sign in into your account
            </h3>
            <div className='mb-8 space-y-4 md:mb-10'>
              <InputField
                label='Email'
                type='email'
                placeholder='email@mail.com'
              />
              <InputField
                label='Password'
                type='password'
                placeholder='*********'
              />
            </div>
            <div className='flex flex-col items-center space-y-4'>
              <Button className=' w-full max-w-sm'>Sign in</Button>
              <p className='text-center'>
                Don&apos;t have an account?{' '}
                <PrimaryLink href='/signup'>Create an account</PrimaryLink>
              </p>
            </div>
          </form>
        </div>
        {!isMd && (
          <SignInSVG className='absolute right-[-200px] top-1/2 h-[400px] w-[500px] -translate-y-1/2 transform lg:right-[50px] xl:right-[200px]' />
        )}
      </main>
    </Layout>
  );
}
