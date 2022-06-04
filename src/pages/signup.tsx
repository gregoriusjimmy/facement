import { useState } from 'react'

import { useFormError } from '@/hooks/useFormError'
import { deleteToken, usePost } from '@/hooks/usePost'

import Button from '@/components/buttons/Button'
import FaceCam from '@/components/facecam/FaceCam'
import InputField from '@/components/input-field/InputField'
import Layout from '@/components/layout/Layout'
import ButtonLink from '@/components/links/ButtonLink'
import PrimaryLink from '@/components/links/PrimaryLink'
import Seo from '@/components/Seo'
import Stepper from '@/components/stepper/Stepper'

import {
  IAccountExistPhoneNumberSpec,
  IAccountExistRes,
  IAccountExistSpec,
  IAuthRegisterSpec,
  IFaceApiValidateRes,
  IFaceApiValidateSpec,
} from '@/types/networkTypes'

import SuccessSVG from '~/svg/success.svg'

type TKeyFormData =
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'phoneNumber'
  | 'photo'

const keyFormData = [
  'email',
  'password',
  'confirmPassword',
  'phoneNumber',
  'photo',
]

export default function SignUpPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [photo, setPhoto] = useState('')
  const [isConfirmPhoneNumberLoading, setIsConfirmPhoneNumberLoading] =
    useState(false)
  const [isConfirmPhotoLoading, setIsConfirmPhotoLoading] = useState(false)
  const formError = useFormError<TKeyFormData>(keyFormData)

  const postAccountExist = usePost<IAccountExistRes, IAccountExistSpec>(
    'account/exist'
  )
  const postFaceApiValidate = usePost<
    IFaceApiValidateRes,
    IFaceApiValidateSpec
  >('face-api/validate')
  const postAuthRegister = usePost<null, IAuthRegisterSpec>('auth/register')
  const postIsAccountExistPhoneNumber = usePost<
    IAccountExistRes,
    IAccountExistPhoneNumberSpec
  >('account/exist/phoneNumber')

  const isStepOneValid = async () => {
    try {
      const { isAccountExist } = await postAccountExist({
        email,
      })
      if (isAccountExist) {
        formError.setDataToError('email', 'Email already in used')
        return false
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
      formError.setDataToError('email', 'Server error, please try again later')
      return false
    }
    if (password !== confirmPassword) {
      formError.setDataToError('confirmPassword', "Password didn't match")
      return false
    }
    formError.setDataToDefault()
    return true
  }

  const isStepTwoValid = async () => {
    if (phoneNumber.length > 15) {
      formError.setDataToError(
        'phoneNumber',
        'Phone number maximum length is 15'
      )
      return false
    }
    if (phoneNumber.length < 10) {
      formError.setDataToError(
        'phoneNumber',
        'Phone number minimum length is 10'
      )
      return false
    }
    try {
      setIsConfirmPhoneNumberLoading(true)
      const res = await postIsAccountExistPhoneNumber({ phoneNumber })
      if (res.isAccountExist) {
        formError.setDataToError(
          'phoneNumber',
          'Phone number is already registered, please use another number'
        )
        return false
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
      formError.setDataToError(
        'phoneNumber',
        'Server error, please try again later'
      )
      return false
    } finally {
      setIsConfirmPhoneNumberLoading(false)
    }
    formError.setDataToDefault()
    return true
  }

  const isStepThreeValid = async () => {
    try {
      setIsConfirmPhotoLoading(true)
      const { isValid } = await postFaceApiValidate({ photo: photo })
      if (!isValid) {
        formError.setDataToError(
          'photo',
          'Face is not detected, please try again'
        )
        return false
      }
      await postAuthRegister({
        email,
        password,
        phoneNumber,
        photo,
      })
      deleteToken()
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
      formError.setDataToError('photo', 'Server error, please try again later')
      return false
    } finally {
      setIsConfirmPhotoLoading(false)
    }
    formError.setDataToDefault()
    return true
  }

  const validateForm = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()

    if (activeStep === 1 && !(await isStepOneValid())) return
    if (activeStep === 2 && !(await isStepTwoValid())) return
    if (activeStep === 3 && !(await isStepThreeValid())) return

    setActiveStep(activeStep + 1)
  }

  return (
    <Layout>
      <Seo />
      <main className='layout relative overflow-hidden'>
        <div className='min-h-main mt-2 flex flex-col items-center justify-center md:justify-start'>
          <Stepper
            activeStep={activeStep}
            steps={['Fill in form', 'Phone number', 'Take a picture', 'Finish']}
            className='mb-8 md:mt-[100px]'
          />
          {activeStep === 1 && (
            <form className='card mb-4' onSubmit={(e) => validateForm(e)}>
              <h3 className='mb-8 text-center md:mb-10'>Create an account</h3>
              <div className='mb-8 space-y-4 md:mb-10'>
                <InputField
                  label='Email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={formError.data.email}
                  required
                />
                <InputField
                  label='Password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={formError.data.password}
                  required
                  minLength={6}
                />
                <InputField
                  label='Confirm Password'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={formError.data.confirmPassword}
                  required
                  minLength={6}
                />
              </div>
              <div className='flex flex-col items-center space-y-4'>
                <Button type='submit' className='w-full max-w-sm'>
                  Next
                </Button>
                <p className='text-center'>
                  Already have an account?{' '}
                  <PrimaryLink href='/signin'>Sign in</PrimaryLink>
                </p>
              </div>
            </form>
          )}
          {activeStep === 2 && (
            <div className='card flex flex-col items-center space-y-10'>
              <h3 className='text-center'>Input Your Phone Number</h3>
              <p className='text-center'>
                Please remember your phone number, since it will be used when
                you did the transaction
              </p>
              <form
                className='flex w-full flex-col items-center'
                onSubmit={(e) => validateForm(e)}
              >
                <InputField
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  label='Phone Number'
                  placeholder='(e.g. 08274852922 or 628274852922)'
                  type='number'
                  error={formError.data.phoneNumber}
                />
                <Button
                  type='submit'
                  className='mt-10 w-full max-w-sm'
                  isLoading={isConfirmPhoneNumberLoading}
                >
                  Next
                </Button>
              </form>
            </div>
          )}
          {activeStep === 3 && (
            <div className='card mb-10 flex max-w-3xl flex-col items-center space-y-10'>
              <h3 className='text-center'>Let’s take a picture of yourself</h3>
              <p className='text-center'>
                You will use your face to authenticate every time you complete a
                transaction
              </p>
              <p className='text-center'>
                Please make sure your face is not covered
              </p>
              {formError.data && (
                <p className='text-sm text-red-500'>
                  {formError.data.photo.message}
                </p>
              )}
              <FaceCam
                handleCapture={(imageSrc) => setPhoto(imageSrc)}
                handleConfirm={validateForm}
                handleTryAgain={() => formError.setDataToDefault()}
                isConfirmLoading={isConfirmPhotoLoading}
              />
            </div>
          )}
          {activeStep === 4 && (
            <div className='card flex flex-col items-center space-y-10'>
              <h3 className='text-center'>
                Congratulations, your account has been created
              </h3>
              <SuccessSVG className='h-[150px] w-full md:h-[200px]' />
              <p className='text-center'>
                Press the button below to sign in with your new account
              </p>
              <ButtonLink href='/signin' className='w-full max-w-sm'>
                Sign in
              </ButtonLink>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}
