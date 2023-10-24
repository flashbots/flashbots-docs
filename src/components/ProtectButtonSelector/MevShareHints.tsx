/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Checkbox from '../Checkbox';

interface MevShareHintsProps {
  hintLabels: string[];
  hints: Record<string, boolean>;
  hashOnly: boolean;
  setHint: (label: string, value: boolean) => void;
  onSetNoHints: (val: boolean) => void;
}

function MevShareHints({ hintLabels, hints, hashOnly, setHint, onSetNoHints }: MevShareHintsProps) {
  return (
    <div>
      <em>MEV-Share Hints</em>
      <hr className="my-0 py-0" />
      <div className="flex flex-row justify-start space-x-4">
        {hintLabels.map((label) => (
          <Checkbox
            label={label}
            id={label.toLowerCase()}
            key={label}
            checked={hints[label] || false}
            onChange={(value) => setHint(label, value)}
          />
        ))}
        <Checkbox
          label='Hash Only'
          id='hash_only'
          key='hash_only'
          checked={hashOnly}
          onChange={onSetNoHints}
        />
      </div>
    </div>
  );
}

export default MevShareHints;
