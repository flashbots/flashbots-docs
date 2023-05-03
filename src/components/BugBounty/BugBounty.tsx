import React, { ReactNode } from "react"
import styles from  './styles.module.scss';

interface IBugBounty {
  children: ReactNode | ReactNode[]
  severity?: string
  amount?: string
  emoji?: string
  example?: string
}

const BugBounty = ({ children, amount, severity, example, emoji }: IBugBounty) => {
  return (<div className={styles.root + ' ' + styles[severity]}>

    <div className={styles.background}>
      <div></div>
      <div></div>
      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.23804 0.5H23.5309L1.23804 22.7929V0.5Z" fill="#CACBCE" fillOpacity="0.15" stroke="#A8ABB2" strokeOpacity="0.3"/>
      </svg>

    </div>
    
    <div className={styles.header}>
      <div className={styles.severity}>
        <h3>{ severity } <span>{ emoji }</span></h3>
        <b>Up to { amount } USD</b>
      </div>
      <a href="#">Submit { severity } risk bug
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.6977 13.3023C4.96131 13.5659 5.38869 13.5659 5.6523 13.3023L12.15 6.80459V11.925C12.15 12.2978 12.4522 12.6 12.825 12.6C13.1978 12.6 13.5 12.2978 13.5 11.925V5.175C13.5 4.80221 13.1978 4.5 12.825 4.5H6.075C5.70221 4.5 5.4 4.80221 5.4 5.175C5.4 5.54779 5.70221 5.85 6.075 5.85H11.1954L4.6977 12.3477C4.4341 12.6113 4.4341 13.0387 4.6977 13.3023Z"/>
        </svg>
      </a>
    </div>

    <hr />

    <div className={styles.content}>
      <div>
      <b>Criteria</b>
        { children }
      </div>
      <div>
        <b>Example</b>
        <p>{ example }</p>
      </div>
    </div>
  </div>)
}

export default BugBounty