import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePost } from '@/hooks/usePost'

import Button from '@/components/buttons/Button'
import InputField from '@/components/input-field/InputField'
import Layout from '@/components/layout/Layout'
import PrimaryLink from '@/components/links/PrimaryLink'
import Seo from '@/components/Seo'

import {
  IAccountExistRes,
  IAccountExistSpec,
  IAuthLoginRes,
  IAuthLoginSpec,
  ITokenVerifyRes as IVerifyTokenRes,
} from '@/types/networkTypes'

import SignInSVG from '~/svg/signin.svg'

type TKeyFormData = 'email' | 'password'

type TFormError = {
  [k in TKeyFormData]: { isError: boolean; message: string }
}

const formErrorDefault = {
  email: { isError: false, message: '' },
  password: { isError: false, message: '' },
}

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<TFormError>(formErrorDefault)
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)

  const postAuthLogin = usePost<IAuthLoginRes, IAuthLoginSpec>('/auth/login')
  const postAccountExist = usePost<IAccountExistRes, IAccountExistSpec>(
    'accounts/exist'
  )
  const postIsTokenVerify = usePost<IVerifyTokenRes, null>('auth/verify/token')

  const isMd = useMediaQuery('(max-width: 768px)')
  const router = useRouter()

  const setFormDataToError = (key: TKeyFormData, message = '') => {
    setFormError({ ...formError, [key]: { isError: true, message } })
  }

  useEffect(() => {
    const fetchVerifyToken = async () => {
      try {
        const res = await postIsTokenVerify(null)
        if (res.ok && res.isVerified) router.push('/account')
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)
      }
    }
    fetchVerifyToken()
  }, [postIsTokenVerify, router])

  const isFormDataValid = async () => {
    try {
      const res = await postAccountExist({
        email,
      })
      if (!res.isAccountExist) {
        setFormDataToError('email', res.message)
        return false
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
      setFormDataToError('email', 'Server error, please try again later')
      return false
    }

    setFormError(formErrorDefault)
    return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (await isFormDataValid()) {
      try {
        setIsLoadingSubmit(true)
        const res = await postAuthLogin({ email, password })
        if (res.ok) router.push('/account')
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)
      } finally {
        setIsLoadingSubmit(false)
      }
    }
  }

  return (
    <Layout>
      <Seo />
      <main className='relative overflow-hidden'>
        <div
          className='layout min-h-main flex flex-col items-center 
      justify-center md:flex-row md:justify-start '
        >
          <form className='card w-full' onSubmit={(e) => handleSubmit(e)}>
            <h3 className='mb-8 text-center md:mb-10'>
              Sign in into your account
            </h3>
            <div className='mb-8 space-y-4 md:mb-10'>
              <InputField
                label='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={formError.email}
                required
              />
              <InputField
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={formError.password}
                required
                minLength={6}
              />
            </div>
            <div className='flex flex-col items-center space-y-4'>
              <Button
                className=' w-full max-w-sm'
                type='submit'
                isLoading={isLoadingSubmit}
              >
                Sign in
              </Button>
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
  )
}
