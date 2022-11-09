import React, { ReactNode } from "react"
import styles from  './styles.module.scss';

interface ICenter {
  children: ReactNode | ReactNode[]
}

const Center = ({ children }: ICenter) => {

  return (<span className={styles.root}>
    {children}
  </span>)
}

export default Center