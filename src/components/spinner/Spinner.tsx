import styles from './Spinner.module.css'

import clsxm from '@/lib/clsxm'

type Props = {
  className?: string
}

export const Spinner = ({ className }: Props) => {
  return <div className={clsxm(styles.loader, className)}>Loading...</div>
}
