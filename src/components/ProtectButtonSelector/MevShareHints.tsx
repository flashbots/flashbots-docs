/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Checkbox from '../Checkbox';
import AlignItems from '../AlignItems/AlignItems';

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
      <hr style={{padding: 0, margin: 0}} />
      <AlignItems horizontal="left">
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
        <div style={{width: 64}} /> {/* spacer */}
      </AlignItems>
    </div>
  );
}

export default MevShareHints;
