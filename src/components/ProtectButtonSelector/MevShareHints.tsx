/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {capitalCase} from 'change-case';
import Checkbox from '../Checkbox';

interface MevShareHintsProps {
  hintLabels: string[];
  hints: Record<string, boolean>;
  hashOnly: boolean;
  setHint: (label: string, value: boolean) => void;
  onSetHashOnly: (val: boolean) => void;
}

function MevShareHints({ hintLabels, hints, hashOnly, setHint, onSetHashOnly }: MevShareHintsProps) {
  return (
    <div>
      <p className='text-sm font-bold m-2'>MEV-Share Hints</p>
      <div className="grid grid-cols-2">
        {hintLabels.map((label) => (
          <Checkbox
            label={capitalCase(label)}
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
          onChange={onSetHashOnly}
        />
      </div>
      <hr className='my-3 mx-2 opacity-50' />
    </div>
  );
}

export default MevShareHints;
