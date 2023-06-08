import React from "react"
import styles from './styles.module.scss'

const Checkbox = (
    { label, id, checked, onChange, disabled, arrangement, orientation }:
        {
            disabled?: boolean,
            label: string,
            id: string,
            arrangement?: "vertical" | "horizontal",
            orientation?: "first" | "last",
            checked: boolean,
            onChange: (val: boolean) => void
        }
) => {
    const elements = [
        <label htmlFor={id} key={0}>{label}</label>,
        <input id={id} type="checkbox" checked={checked} disabled={disabled} key={1} onChange={(e) => {
            onChange(e.target.checked)
        }} />
    ]
    return <div className={styles.checkboxContext}>
        {orientation === "last" ? elements : elements.reverse()}
    </div>
}

export default Checkbox
