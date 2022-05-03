import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'

import clsxm from '@/lib/clsxm'

import Button from '../buttons/Button'
import NextImage from '../NextImage'
import { Spinner } from '../spinner/Spinner'

type Props = {
  isConfirmLoading?: boolean
  handleCapture: (imageSrc: string) => void
  handleConfirm: () => void
  handleTryAgain?: () => void
  className?: string
  withOverlay?: boolean
}

const FaceCam = ({
  withOverlay = true,
  isConfirmLoading,
  className,
  handleCapture,
  handleTryAgain,
  handleConfirm,
}: Props) => {
  const [photo, setPhoto] = useState('')
  const webcamRef = useRef<Webcam>(null)
  const [isWebcamLoaded, setIsWebcamLoaded] = useState(false)

  const videoConstraints = {
    width: 640,
    height: 640,
    facingMode: 'user',
  }

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot()
    if (!imageSrc) return alert('Error, failed to take a picture')
    setPhoto(imageSrc)
    handleCapture(imageSrc)
  }, [webcamRef, handleCapture])

  const onTryAgain = () => {
    setIsWebcamLoaded(false)
    setPhoto('')
    handleTryAgain && handleTryAgain()
  }
  return (
    <div
      className={clsxm(
        'flex w-full flex-col items-center space-y-10',
        className
      )}
    >
      <div className='relative flex min-h-[300px] w-[300px] flex-col items-center justify-center'>
        {photo && (
          <NextImage
            src={photo}
            layout='fill'
            objectFit='contain'
            className='relative min-h-[300px] w-full'
          />
        )}
        {!photo && (
          <>
            {withOverlay && isWebcamLoaded && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className='absolute'
                src='/images/overlay.png'
                alt='overlay face shape'
              />
            )}
            <div></div>
            {!isWebcamLoaded && <Spinner className='mt-10' />}
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotQuality={1}
              className='w-full rounded'
              screenshotFormat='image/jpeg'
              videoConstraints={videoConstraints}
              onLoadedData={() => setIsWebcamLoaded(true)}
            />
          </>
        )}
      </div>

      {photo && (
        <div className='flex w-full flex-col items-center space-y-2'>
          <Button
            onClick={onTryAgain}
            variant='light'
            className='w-full max-w-sm'
          >
            Try again
          </Button>
          <Button
            onClick={handleConfirm}
            className='w-full max-w-sm'
            isLoading={isConfirmLoading}
          >
            Confirm
          </Button>
        </div>
      )}
      {!photo && (
        <Button
          onClick={capture}
          className='w-full max-w-sm'
          disabled={!isWebcamLoaded}
        >
          Take a picture
        </Button>
      )}
    </div>
  )
}

export default FaceCam
