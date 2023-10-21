/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useHistory } from "@docusaurus/router";
import React, { ReactNode, useCallback } from "react"
import styles from  './styles.module.css';

interface IButton {
  children: ReactNode | ReactNode[]
  href?: string
  action?: () => void
  inline?: boolean
}

function Button({ children, href, action, inline = false }: IButton) {
  const history = useHistory()
  const onClick = useCallback(() => {
    action && action()
    if (href) {
      if (href.includes("http://") || href.includes("https://")) {
        const a = document.createElement('a');
        a.target = '_blank';
        a.href= href;
        a.click();
      } else {
        history.push(href)
      }
    }
  }, [href, action]);

  return inline ? (<button
      onClick={onClick}
      className={styles.root}
    >
    {children}
  </button>) : (
    <div className={styles.wrapper}>
      <button
        onClick={onClick}
        className={styles.root}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
