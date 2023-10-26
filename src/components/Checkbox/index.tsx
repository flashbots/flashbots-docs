/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react"

function Checkbox({ label, id, checked, onChange, disabled, arrangement, orientation }:
        {
            disabled?: boolean,
            label: string,
            id: string,
            arrangement?: "vertical" | "horizontal",
            orientation?: "first" | "last",
            checked: boolean,
            onChange: (val: boolean) => void
        }) {
    const elements = [
        <label htmlFor={id} key={0} className="px-1 enabled:cursor-pointer enabled:hover:text-blue-600 ">{label}</label>,
        <input id={id} type="checkbox" checked={checked} disabled={disabled} key={1} onChange={(e) => {
            onChange(e.target.checked)
        }} />
    ]
    return <div className="m-1 flex items-center cursor-pointer disabled:opacity-50 disabled:pointer-events-none">
        {orientation === "last" ? elements : elements.reverse()}
    </div>
}

export default Checkbox
