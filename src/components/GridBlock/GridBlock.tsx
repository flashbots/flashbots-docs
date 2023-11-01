/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from "react"
import styles from  './styles.module.css';

interface IGridBlock {
  children: ReactNode | ReactNode[]
  symbol: string
  title: string
}

function GridBlock({ children, symbol, title }: IGridBlock) {
  return (<div className={styles.root}>
    <div className={styles.background}>
      <div />
      <div />
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.23804 0.5H23.5309L1.23804 22.7929V0.5Z" fill="#CACBCE" fillOpacity="0.15" stroke="#A8ABB2" strokeOpacity="0.3"/>
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
