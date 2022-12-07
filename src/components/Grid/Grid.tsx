import React, { ReactNode } from "react"
import styles from  './styles.module.scss';

interface IGrid {
  children: ReactNode | ReactNode[]
}

const Grid = ({ children }: IGrid) => {

  return (<section className={styles.root}>
    { children }
  </section>)
}

export default Grid