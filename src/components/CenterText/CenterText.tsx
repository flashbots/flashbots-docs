import React, { ReactNode } from "react"
import styles from  './styles.module.scss';

interface ICenterText {
  children: ReactNode | ReactNode[]
}

const CenterText = ({ children }: ICenterText) => {

  return (<span className={styles.root}>
    {children}
  </span>)
}

export default CenterText