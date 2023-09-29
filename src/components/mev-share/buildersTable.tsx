import React from "react"
import { useSupportedBuilders} from "./useSupportedBuilders"

export default () => {
    const supportedBuilders = useSupportedBuilders()

    return (<table>
        <thead>
            <th>Name</th>
            <th>RPC</th>
        </thead>
        {supportedBuilders.map(builder => <tr>
            <td>{builder.name}</td>
            <td>{builder.rpc}</td>
        </tr>)}
    </table>)
}
