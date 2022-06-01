import { useEffect, useState } from 'react'

import { useFormError } from '@/hooks/useFormError'
import { usePost } from '@/hooks/usePost'

import Button from '@/components/buttons/Button'
import FaceCam from '@/components/facecam/FaceCam'
import InputField from '@/components/input-field/InputField'
import Layout from '@/components/layout/Layout'
import ButtonLink from '@/components/links/ButtonLink'
import PrimaryLink from '@/components/links/PrimaryLink'
import NextImage from '@/components/NextImage'
import Seo from '@/components/Seo'

import { handleAxiosError } from '@/utils/common'

import {
  IAccountExistPhoneNumberSpec,
  IAccountExistRes,
  IFaceApiValidateRes,
  IFaceApiValidateSpec,
  IPayRes,
  IPaySpec,
} from '@/types/networkTypes'

import LogoBlue from '~/svg/facement-logo-primary.svg'
import SuccessSVG from '~/svg/success.svg'

const ITEMS: TItem[] = [
  { id: 1, name: 'Brown Brim', price: 25, imageName: 'brown-brim.jpg' },
  { id: 2, name: 'Snapback', price: 50, imageName: 'snapback.jpg' },
]

type TItem = {
  id: number
  name: string
  price: number
  imageName: string
}

type TKeyFormData = 'phoneNumber' | 'photo'

const keyFormData = ['phoneNumber', 'photo']

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(1)
  const [selectedItem, setSelectedItem] = useState<TItem>()
  const [quantity, setQuantity] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [photo, setPhoto] = useState('')
  const [remainingBalance, setRemainingBalance] = useState(0)
  const [isConfirmPhotoLoading, setIsConfirmPhotoLoading] = useState(false)
  const [isConfirmPhoneNumberLoading, setIsConfirmPhoneNumberLoading] =
    useState(false)
  const postFaceApiValidate = usePost<
    IFaceApiValidateRes,
    IFaceApiValidateSpec
  >('face-api/validate')
  const postIsAccountExistPhoneNumber = usePost<
    IAccountExistRes,
    IAccountExistPhoneNumberSpec
  >('account/exist/phoneNumber')
  const postPay = usePost<IPayRes, IPaySpec>('transaction/pay')
  const formError = useFormError<TKeyFormData>(keyFormData)

  const handleBuyNow = (item: TItem) => {
    setSelectedItem(item)
    setActiveStep(activeStep + 1)
    setQuantity(1)
  }

  useEffect(() => {
    if (activeStep > 3 && !selectedItem) setActiveStep(2)
  }, [selectedItem, activeStep])

  useEffect(() => {
    setTotalPrice((selectedItem?.price || 0) * quantity)
  }, [quantity, selectedItem])

  const handleConfirmPhoneNumber = async () => {
    if (phoneNumber.length > 15) {
      formError.setDataToError(
        'phoneNumber',
        'Phone number maximum length is 15'
      )
      return
    }
    if (phoneNumber.length < 10) {
      formError.setDataToError(
        'phoneNumber',
        'Phone number minimum length is 10'
      )
      return
    }
    try {
      setIsConfirmPhoneNumberLoading(true)
      const res = await postIsAccountExistPhoneNumber({ phoneNumber })
      if (!res.isAccountExist) {
        formError.setDataToError(
          'phoneNumber',
          'Phone number is not registered'
        )
        return
      }
    } catch (error) {
      console.error(error instanceof Error ? error.message : error)
      formError.setDataToError(
        'phoneNumber',
        'Server error, please try again later'
      )
    } finally {
      setIsConfirmPhoneNumberLoading(true)
    }
    formError.setDataToDefault()
    setActiveStep(activeStep + 1)
  }

  const handleConfirmPhoto = async () => {
    try {
      setIsConfirmPhotoLoading(true)
      const { isValid } = await postFaceApiValidate({ photo: photo })
      if (!isValid) {
        formError.setDataToError(
          'photo',
          'Face is not detected, please try again'
        )
        return
      }
      const { transaction, balance } = await postPay({
        amount: totalPrice,
        phoneNumber,
        photo,
      })
      if (!transaction.id) return
      setRemainingBalance(balance)
    } catch (error) {
      handleAxiosError(error, (axiosErr) => {
        formError.setDataToError('photo', axiosErr.response?.data.message)
      })
      console.error(error instanceof Error ? error.message : error)
    } finally {
      setIsConfirmPhotoLoading(false)
    }
    formError.setDataToDefault()
    setActiveStep(activeStep + 1)
  }

  return (
    <Layout>
      <Seo />
      <main className='layout'>
        <div className='min-h-main mb-4 flex flex-col items-center justify-center sm:mb-0'>
          {activeStep === 1 && (
            <div className='flex flex-col items-center space-y-8 text-center'>
              <h1>Welcome to face payment demo</h1>
              <p className='max-w-[400px]'>
                During this demonstration, you will see how to do face payment
                using your e-wallet account
              </p>
              <p className='max-w-[400px]'>
                To get started, you must have already created an account. If you
                do not have one, please{' '}
                <PrimaryLink href='/signup'> Sign up</PrimaryLink>
              </p>
              <Button onClick={() => setActiveStep(activeStep + 1)}>
                Start face payment demo
              </Button>
            </div>
          )}
          {activeStep === 2 && (
            <div>
              <h1 className='mb-4 text-center sm:mb-8'>
                Suppose you are shopping for a hat
              </h1>

              <div className='flex flex-col items-center justify-center space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0'>
                {ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className='flex min-h-[200px] w-full max-w-[300px] flex-col rounded border-2 sm:min-h-[300px] sm:w-1/2'
                  >
                    <NextImage
                      src={`/images/${item.imageName}`}
                      className='relative w-full'
                      layout='responsive'
                      width={346}
                      height={346}
                    />
                    <div className='flex flex-col p-2'>
                      <div className='mb-8 flex justify-between'>
                        <h4>{item.name}</h4>
                        <h4>${item.price}</h4>
                      </div>
                      <Button
                        variant='secondary'
                        onClick={() => handleBuyNow(item)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div className='flex w-full max-w-[600px] flex-col'>
              <h3 className='mb-8'>Cart</h3>
              <div className='flex w-full space-x-4 sm:space-x-8'>
                <div className='w-1/2 max-w-[300px]'>
                  <NextImage
                    src={`/images/${selectedItem?.imageName}`}
                    className='relative w-full'
                    layout='responsive'
                    width={300}
                    height={300}
                  />
                </div>
                <div className='flex flex-col space-y-4'>
                  <h4 className='font-semibold'>{selectedItem?.name}</h4>
                  <p className='text-lg'>${selectedItem?.price}</p>
                  <div className='space-y-4'>
                    <h4 className='mb-2 '>Quantity</h4>
                    <div className='flex flex-row space-x-4'>
                      <button
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                      >
                        {'<'}
                      </button>
                      <p>{quantity}</p>
                      <button
                        onClick={() =>
                          quantity < 10 && setQuantity(quantity + 1)
                        }
                      >
                        {'>'}
                      </button>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <h4>Total</h4>
                    <p className='text-lg font-semibold'>${totalPrice}</p>
                  </div>
                  <Button onClick={() => setActiveStep(activeStep + 1)}>
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
          {activeStep === 4 && (
            <div className='flex w-full max-w-[600px] flex-col'>
              <h3 className='mb-12'>Order Summary</h3>
              <div className='mb-12 flex w-full flex-col space-y-8'>
                <div className='mb-2 flex justify-between'>
                  <div className='flex flex-col space-y-4'>
                    <p>Item</p>
                    <h4>{selectedItem?.name}</h4>
                  </div>
                  <div className='flex flex-col items-center space-y-4'>
                    <p>Quantity</p>
                    <h4>{quantity}</h4>
                  </div>
                  <div className='flex flex-col items-end space-y-4'>
                    <p>Total</p>
                    <h4>${totalPrice}</h4>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <p>Grand Total</p>
                  <h4 className='font-bold'>${totalPrice}</h4>
                </div>
                <div className='flex items-center justify-between'>
                  <p>Payment method</p>
                  <LogoBlue className='h-11 text-8xl sm:text-9xl' />
                </div>
              </div>
              <Button
                className='mx-auto w-full max-w-xs'
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Pay with facement
              </Button>
            </div>
          )}
          {activeStep === 5 && (
            <div className='flex w-full flex-col items-center'>
              <h3 className='mb-12 text-center'>Input Phone Number</h3>
              <InputField
                value={phoneNumber}
                className='mb-[100px] max-w-sm'
                onChange={(e) => setPhoneNumber(e.target.value)}
                label='Phone Number'
                placeholder='(e.g. 08274852922 or 628274852922)'
                type='number'
                required
                maxLength={15}
                minLength={10}
                error={formError.data.phoneNumber}
              />
              <Button
                className='mx-auto w-full max-w-xs'
                isLoading={isConfirmPhoneNumberLoading}
                onClick={() => handleConfirmPhoneNumber()}
              >
                Confirm
              </Button>
            </div>
          )}
          {activeStep === 6 && (
            <div>
              <h3 className='text-center'>Let&apos;s Verify Yourself</h3>
              <p className='text-center'>
                Take a picture of yourself and make sure your face is not
                covered
              </p>

              {formError.data && (
                <p className='text-sm text-red-500'>
                  {formError.data.photo.message}
                </p>
              )}
              <FaceCam
                handleCapture={(imageSrc) => setPhoto(imageSrc)}
                handleConfirm={handleConfirmPhoto}
                handleTryAgain={() => formError.setDataToDefault()}
                isConfirmLoading={isConfirmPhotoLoading}
              />
            </div>
          )}
          {activeStep === 7 && (
            <div>
              <h3 className='text-center'>Payment Successful</h3>
              <p className='text-center'>
                Congratulations you have finished this face payment demo
              </p>
              <p>
                Your remaining balance is <strong>${remainingBalance}</strong>
              </p>
              <SuccessSVG className='h-[150px] w-full md:h-[200px]' />
              <ButtonLink href='/signin'>Sign in to your account</ButtonLink>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}
