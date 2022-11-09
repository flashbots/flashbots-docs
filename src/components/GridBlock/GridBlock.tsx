import React, { ReactNode } from "react"
import styles from  './styles.module.scss';

interface IGridBlock {
  children: ReactNode | ReactNode[]
  title?: string
}

const GridBlock = ({ children, title }: IGridBlock) => {
  console.log(children)

  return (<div className={styles.root}>
    {
      title && (
        <div className={styles.title}>
          { title }
        </div>
      )
    }
    <div className={styles.content}>
      {children}
    </div>
  </div>)
}

export default GridBlock