import React, { ReactNode, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import clsxm from '@/lib/clsxm'

type Props = {
  show: boolean
  children: ReactNode
  className?: string
  onClose: () => void
}

const Modal = ({ show, children, className, onClose }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleCloseClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div
      className='fixed top-0 right-0 left-0 bottom-0 
      z-50 flex h-full w-full items-center justify-center bg-black/50'
    >
      <div
        className={clsxm(
          'relative max-h-[95vh] min-w-[95%] max-w-[95%] overflow-hidden',
          'overflow-y-auto rounded-2xl bg-white p-8 sm:min-w-[600px]',
          className
        )}
      >
        <div className='absolute top-1 right-4 text-2xl '>
          <a href='#' onClick={handleCloseClick}>
            x
          </a>
        </div>
        {children}
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')!
    )
  } else {
    return null
  }
}

export default Modal
