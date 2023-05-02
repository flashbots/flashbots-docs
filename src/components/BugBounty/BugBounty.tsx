import React, { ReactNode } from "react"
import styles from  './styles.module.scss';

interface IBugBounty {
  children: ReactNode | ReactNode[]
  amount?: string
  severity?: string
}

const BugBounty = ({ children, amount, severity }: IBugBounty) => {
  return (<div className={styles.root}>
    <div className={styles.background}>
      <div></div>
      <div></div>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.23804 0.5H23.5309L1.23804 22.7929V0.5Z" fill="#CACBCE" fillOpacity="0.15" stroke="#A8ABB2" strokeOpacity="0.3"/>
      </svg>

    </div>
    {
      severity && (
        <div className={styles.severity}>
          <h3>
            { severity }
          </h3>
          {
            amount && <p>Up to { amount } USD</p>
          }
          <hr />
        </div>
      )
    }
    <div className={styles.content}>
      {children}
    </div>
  </div>)
}

export default BugBounty