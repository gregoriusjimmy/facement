import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'

import { useFormError } from '@/hooks/useFormError'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { saveToken, usePost } from '@/hooks/usePost'

import Button from '@/components/buttons/Button'
import InputField from '@/components/input-field/InputField'
import Layout from '@/components/layout/Layout'
import PrimaryLink from '@/components/links/PrimaryLink'
import Seo from '@/components/Seo'

import { handleAxiosError } from '@/utils/common'

import {
  IAuthLoginRes,
  IAuthLoginSpec,
  ITokenVerifyRes as IVerifyTokenRes,
} from '@/types/networkTypes'

import SignInSVG from '~/svg/signin.svg'

type TKeyFormData = 'email' | 'password'

const keyFormData = ['email', 'password']

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const formError = useFormError<TKeyFormData>(keyFormData)

  const postAuthLogin = usePost<IAuthLoginRes, IAuthLoginSpec>('/auth/login')
  const postAuthVerifyToken = usePost<IVerifyTokenRes, null>(
    '/auth/verify/token'
  )

  const isMd = useMediaQuery('(max-width: 768px)')
  const router = useRouter()

  useEffect(() => {
    const fetchVerifyToken = async () => {
      try {
        const { isVerified } = await postAuthVerifyToken(null)
        if (isVerified) router.push('/account')
      } catch (error) {
        console.error(error instanceof Error ? error.message : error)
      }
    }
    fetchVerifyToken()
  }, [postAuthVerifyToken, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsLoadingSubmit(true)
      const { token } = await postAuthLogin({ email, password })
      saveToken(token)
      formError.setDataToDefault()
      router.push('/account')
    } catch (error) {
      handleAxiosError(error, (axiosErr) => {
        formError.setDataToError('email', axiosErr.response?.data.message)
      })
      console.error(error instanceof Error ? error.message : error)
    } finally {
      setIsLoadingSubmit(false)
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
                name='email'
                label='Email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={formError.data.email}
                required
              />
              <InputField
                name='password'
                label='Password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={formError.data.password}
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
