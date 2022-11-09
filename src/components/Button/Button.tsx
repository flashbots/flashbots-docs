import { useHistory } from "@docusaurus/router";
import React, { ReactNode, useCallback } from "react"
import styles from  './styles.module.scss';

interface IButton {
  children: ReactNode | ReactNode[]
  href?: string
  action?: () => void
  inline?: boolean
}

const Button = ({ children, href, action, inline = false }: IButton) => {
  const history = useHistory()
  const onClick = useCallback(() => {
    action && action()
    if (href) {
      if (href.includes("http://") || href.includes("https://")) {
        let a = document.createElement('a');
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