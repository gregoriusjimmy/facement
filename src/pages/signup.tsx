import { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import Button from '@/components/buttons/Button';
import InputField from '@/components/input-field/InputField';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';
import Stepper from '@/components/stepper/Stepper';

import SuccessSVG from '~/svg/success.svg';
export default function SignUpPage() {
  const [activeStep, setActiveStep] = useState(3);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: 640,
    height: 640,
    facingMode: 'user',
  };

  return (
    <Layout>
      <Seo />
      <main className='layout relative overflow-hidden'>
        <div className='md:min-h-main mt-4 flex flex-col items-center md:mt-10 '>
          <Stepper
            activeStep={activeStep}
            steps={['111', '222', '333']}
            className='mb-8'
          />
          {activeStep === 1 && (
            <form className='card mb-4'>
              <h3 className='mb-8 text-center md:mb-10'>Create an account</h3>
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
                <InputField
                  label='Confirm Password'
                  type='password'
                  placeholder='*********'
                />
              </div>
              <div className='flex flex-col items-center space-y-4'>
                <Button className=' w-full max-w-sm'>Next</Button>
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
              <InputField
                label='Phone Number'
                placeholder='(e.g. 08274852922 or 628274852922)'
                type='number'
              />
              <Button className='w-full max-w-sm'>Next</Button>
            </div>
          )}
          {activeStep === 3 && (
            <div className='card flex max-w-3xl flex-col items-center space-y-10'>
              {/* <h3 className='text-center'>Let’s take a picture of yourself</h3>
              <p className='text-center'>
                You will use your face to authenticate every time you complete a
                transaction
              </p>
              <p className='text-center'>
                Please make sure your face is not covered
              </p>
              <div className='relative w-[300px]'>
                <img className='absolute' src='/images/overlay.png' />
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotQuality={1}
                  className='w-full rounded'
                  screenshotFormat='image/jpeg'
                  videoConstraints={videoConstraints}
                />
              </div>
              <Button onClick={capture} className='w-full max-w-sm'>
                Take a picture
              </Button> */}
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
  );
}
