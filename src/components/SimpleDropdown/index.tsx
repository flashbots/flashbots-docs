/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Children, PropsWithChildren } from 'react'
import styles from './styles.module.css'

type SimpleDropdownParams = {
    header: string,
    italicHeader?: boolean,
    onClickHeader?: () => void,
    isOpen: boolean,
}

function SimpleDropdown({ children, header, italicHeader, onClickHeader, isOpen }: PropsWithChildren<SimpleDropdownParams>) {
    const useItalic = italicHeader !== false // default to true
    const subComponentList = Object.keys(SimpleDropdown)

    const subComponents = subComponentList.map((key) => Children.map(children, (child: any) => child.type({}).key === key ? child : null))

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

function Body(props) {
    return (<div key='Body' className={styles.dropdownBody}>
        <div>
            {props.children}
        </div>
    </div>)
}
SimpleDropdown.Body = Body

function HiddenBody({ children }) {
    return (
        <div key='HiddenBody' className="p-2 border-solid border-slate-200/75 rounded-xl">{children}</div>
    )
}
SimpleDropdown.HiddenBody = HiddenBody

export default SimpleDropdown
