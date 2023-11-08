/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useSupportedBuilders} from './useSupportedBuilders';

export default function BuildersTable() {
  const supportedBuilders = useSupportedBuilders();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>RPC</th>
        </tr>
      </thead>
      <tbody>
        {supportedBuilders.map((builder) => (
          <tr key={`${builder.name}`}>
            <td>{builder.name}</td>
            <td>{builder.rpc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
