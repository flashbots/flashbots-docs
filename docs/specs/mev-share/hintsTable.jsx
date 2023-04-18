import React from "react"
import hints from "./hints.json"

export default () => {
    return (<table>
        <thead>
            <th>Hint</th>
            <th>Description</th>
        </thead>
        {hints.map(hint => <tr>
            <td>{hint.name}</td>
            <td>{hint.description}</td>
        </tr>)}
    </table>)
}
