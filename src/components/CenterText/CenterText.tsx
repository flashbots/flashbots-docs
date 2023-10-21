/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { ReactNode } from "react"
import styles from  './styles.module.css';

interface ICenterText {
  children: ReactNode | ReactNode[]
}

function CenterText({ children }: ICenterText) {

  return (<span className={styles.root}>
    {children}
  </span>)
}

export default CenterText
