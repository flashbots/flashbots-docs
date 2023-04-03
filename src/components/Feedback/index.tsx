import React, { ReactNode, useEffect, useState } from "react"
import styles from  './styles.module.scss';

interface IFeedback {
}



const Feedback = ({  }: IFeedback) => {
  

  useEffect(() => {

  }, [])

  return (<section className={styles.root}>
    <div>
      😞
    </div>
    <div>
      😐
    </div>
    <div>
      😃
    </div>
  </section>)
}

export default Feedback