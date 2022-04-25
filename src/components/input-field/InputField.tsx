import React from 'react';

import clsxm from '@/lib/clsxm';
type Props = {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
  error?: { isError: boolean; message: string };
} & React.ComponentPropsWithRef<'input'>;

const InputField = React.forwardRef<HTMLInputElement, Props>(
  (
    { label, className, labelClassName, inputClassName, error, id, ...rest },
    ref
  ) => {
    return (
      <div className={clsxm('w-full', className)}>
        <label className={clsxm('mb-1 block', labelClassName)} htmlFor={id}>
          {label}
        </label>
        <input
          ref={ref}
          className={clsxm(
            'w-full appearance-none rounded border px-4 py-2 outline-none',
            'transition-colors duration-75 focus:border-primary-500 focus:outline-none',
            inputClassName
          )}
          {...rest}
        />
        <span className='text-sm text-red-500'>
          {error?.isError ? error?.message : ''}
        </span>
      </div>
    );
  }
);
export default InputField;
