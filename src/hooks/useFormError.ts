import { useState } from 'react'

export type TFormError<T> = {
  [k in T]: { isError: boolean; message: string }
}

export function useFormError<T>(keys: Array<string>) {
  const generateData = () =>
    keys.reduce(
      (acc, key) => ({
        ...acc,
        [key]: { isError: false, message: '' },
      }),
      {}
    )

  const formErrorDefault = generateData() as TFormError<T>

  const [data, setData] = useState<TFormError<T>>(formErrorDefault)

  const setDataToError = (key: string, message = '') => {
    setData({ ...data, [key]: { isError: true, message } })
  }

  const setDataToDefault = () => {
    setData(formErrorDefault)
  }

  return { data, setDataToError, setDataToDefault }
}
