import React, { Children, ReactElement, ReactNode, useMemo } from "react"
import styles from  './styles.module.scss';

interface IAlignItems {
  children: ReactNode | ReactNode[]
  horizontal?: "left" | "center" | "right" | "space-evenly" | "space-between"
  vertical?: "top" | "center" | "bottom" 
  direction?: "column" | "row"
  sideMargin?: number
}

const AlignItems = ({ 
  children,
  horizontal = "center",
  sideMargin = 0,
  vertical = "center"
 }: IAlignItems) => {

  const justifyContent = useMemo(() => {
    switch (horizontal) {
      case "left":
        return "flex-start"
      case "center":
        return "center"
      case "right":
        return "flex-end"
      case "space-between":
        return "space-between"
      case "space-evenly": 
        return "space-evenly"
      default:
        return "center"
    }
  }, [horizontal])

  const alignItems = useMemo(() => {
    switch (vertical) {
      case "top":
        return "flex-start"
      case "center":
        return "center"
      case "bottom":
        return "flex-end"
      default:
        return "center"
    }
  }, [vertical])

  const margin = useMemo(() => {
    return sideMargin ? `0 ${sideMargin}rem` : undefined
  }, [sideMargin])

  const correctChildren = useMemo(() => {
    if (Children.count(children) === 1) {
      let childrenParsed;
      Children.toArray(children).map((child)=> {
        if (!childrenParsed) { 
          childrenParsed = (child as ReactElement).props.children
        }
      })
      return childrenParsed
    } else {
      return children
    }
  }, [children, margin])


  return (
    <section 
      className={styles.root}
      style={{
        justifyContent,
        alignItems,
        // @ts-ignore This is a standard css variable assignment
        ["--align-items-margin"]: margin
      } }  
    >
      {
        correctChildren
      }
    </section>
  )
}

export default AlignItems