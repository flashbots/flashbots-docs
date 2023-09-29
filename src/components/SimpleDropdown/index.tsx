import React, { Children, PropsWithChildren } from 'react'
import styles from './styles.module.scss'

type SimpleDropdownParams = {
    header: string,
    italicHeader?: boolean,
    onClickHeader?: () => void,
    isOpen: boolean,
}

const SimpleDropdown = ({ children, header, italicHeader, onClickHeader, isOpen }: PropsWithChildren<SimpleDropdownParams>) => {
    const useItalic = italicHeader !== false // default to true
    const subComponentList = Object.keys(SimpleDropdown)

    let subComponents = subComponentList.map((key) => {
        return Children.map(children, (child: any) => {
            return child.type({}).key === key ? child : null
        })
    })

    return (
        <div className='dropdown-container'>
            {subComponents[0]}
            <details open={isOpen}>
                <summary
                    className={styles.dropdownHeader}
                    onClick={(event) => {
                        event.preventDefault();
                        onClickHeader();
                    }}
                >
                    {useItalic ? <em>{header}</em> : header}
                </summary>
                {subComponents[1]}
            </details>
        </div>
    )
}

const Body = (props) => {
    return (<div key='Body' className={styles.dropdownBody}>
        <div>
            {props.children}
        </div>
    </div>)
}
SimpleDropdown.Body = Body

const HiddenBody = ({ children }) => {
    return (
        <div key='HiddenBody' className={styles.dropdownHiddenBody}>{children}</div>
    )
}
SimpleDropdown.HiddenBody = HiddenBody

export default SimpleDropdown
