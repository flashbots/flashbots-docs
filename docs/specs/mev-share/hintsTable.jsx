import React from "react"
import hints from "./hints.json"

export default () => {
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
