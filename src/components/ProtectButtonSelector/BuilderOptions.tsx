/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Checkbox from '../Checkbox';

interface BuildersProps {
  supportedBuilders: string[];
  buildersSelection: Record<string, boolean>;
  fastMode: boolean;
  setBuilder: (name: string) => void;
}

function BuilderOptions({ supportedBuilders, buildersSelection, fastMode, setBuilder}: BuildersProps) {
  return (
    <div>
      <em>Builders</em>
      <hr style={{padding: 0, margin: 0}} />
      {supportedBuilders.map((builder: string) => (
        <Checkbox
          label={builder}
          id={`builder_${builder}`}
          key={builder}
          checked={buildersSelection[builder] || fastMode}
          disabled={fastMode === true}
          onChange={() => setBuilder(builder)}
        />
      ))}
    </div>
  );
}

export default BuilderOptions;
