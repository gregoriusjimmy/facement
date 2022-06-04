import styles from './Stepper.module.css'

import clsxm from '@/lib/clsxm'

type Props = {
  steps: string[]
  activeStep: number
  className?: string
}

const Stepper = ({ steps, activeStep, className }: Props) => {
  return (
    <>
      <ol
        className={clsxm(
          'mx-auto hidden w-full justify-center overflow-hidden font-secondary md:flex',
          className
        )}
      >
        {steps.map((step: string, idx: number) => (
          // stepper item
          <li
            key={idx}
            className={clsxm(
              'flex flex-col text-center',
              styles.stepperItem,
              idx + 1 === activeStep ? 'flex' : '',
              idx + 1 === activeStep + 1 ? 'flex' : ''
            )}
          >
            {/* stepper bulletin */}
            <div
              className={clsxm(
                'mx-32 flex h-7 w-7 items-center justify-center rounded-full font-bold text-neutral-100 md:mx-[7vw]',
                idx + 1 === activeStep ? 'bg-primary-500' : 'bg-neutral-300'
              )}
            >
              {idx + 1}
            </div>
            <p
              className={clsxm(
                'mt-2 font-medium',
                idx + 1 === activeStep ? 'text-primary-500' : 'text-neutral-300'
              )}
            >
              {step}
            </p>
          </li>
        ))}
      </ol>
      {/* Mobile View */}
      <div
        className={clsxm(
          'flex flex-row items-center justify-center',
          'font-primary md:hidden',
          className
        )}
      >
        <div
          className='flex h-16 w-16 items-center justify-center rounded-full
                        border-4 border-primary-500 text-lg font-bold'
        >
          {`${activeStep} of ${steps.length}`}
        </div>
        <div className='ml-8 text-right'>
          <p className='font-secondary text-xl font-semibold'>
            {steps[activeStep - 1]}
          </p>
          {activeStep < steps.length && <p>{`Next: ${steps[activeStep]}`}</p>}
        </div>
      </div>
    </>
  )
}

export default Stepper
