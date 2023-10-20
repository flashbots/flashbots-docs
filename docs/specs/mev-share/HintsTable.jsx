/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import hints from "./hints.json"

export default function HintsTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Hint</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {hints.map((hint, index) => (
          <tr key={index}>
            <td><code>{hint.name}</code></td>
            <td>{hint.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
