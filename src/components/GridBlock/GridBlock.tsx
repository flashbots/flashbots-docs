import React, { ReactNode } from "react"
import styles from  './styles.module.scss';

interface IGridBlock {
  children: ReactNode | ReactNode[]
  symbol?: string
  title?: string
}

const GridBlock = ({ children, symbol, title }: IGridBlock) => {
  return (<div className={styles.root}>
    <div className={styles.background}>
      <div></div>
      <div></div>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.23804 0.5H23.5309L1.23804 22.7929V0.5Z" fill="#DBDDE1" fillOpacity="0.25" stroke="#DBDDE1"/>
      </svg>

    </div>
    {
      title && (
        <div className={styles.title}>
          {
            symbol && <p>{ symbol }</p>
          }
          <span>
            { title }
          </span>
          <hr />
        </div>
      )
    }
    <div className={styles.content}>
      {children}
    </div>
  </div>)
}

export default GridBlock