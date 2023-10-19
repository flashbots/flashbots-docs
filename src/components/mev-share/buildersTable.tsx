import { useSupportedBuilders} from "./useSupportedBuilders"

export default () => {
  const supportedBuilders = useSupportedBuilders()

  return (<table>
      <thead>
          <tr>
              <th>Name</th>
              <th>RPC</th>
          </tr>
      </thead>
      <tbody>
          {supportedBuilders.map((builder, index) => <tr key={index}>
              <td>{builder.name}</td>
              <td>{builder.rpc}</td>
          </tr>)}
      </tbody>
  </table>)
}
