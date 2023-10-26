/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useState} from 'react';
import FlashbotsProtectButton from '../ProtectButton';
import SimpleDropdown from '../SimpleDropdown';
import BuilderOptions from './BuilderOptions';
import {useSupportedBuilders} from '../mev-share/useSupportedBuilders';
import FastOptionCheckbox from './FastOptionCheckbox';
import MevShareHints from './MevShareHints';

const hintLabels = [
  'calldata',
  'logs',
  'defaultLogs',
  'contractAddress',
  'functionSelector',
];

export default function ProtectButtonSelector() {
  const [hashOnly, setHashOnly] = useState(false);
  const [advancedOptionsShown, setAdvancedOptionsShown] = useState(false);
  const [fastMode, setFastMode] = useState(false);
  // Initialize the state object with all hints set to false
  const [hints, setHints] = useState(
    Object.fromEntries(hintLabels.map((label) => [label, false])),
  );
  const supportedBuilders = useSupportedBuilders().map(
    (builder) => builder.name,
  );
  const [buildersSelection, setBuildersSelection] = useState(
    Object.fromEntries(supportedBuilders.map((builder) => [builder, false])),
  );

  const selectedBuilders = Object.keys(buildersSelection).filter(
    (builder) => buildersSelection[builder] === true,
  );

  // Function to update a hint
  const setHint = (label: string, value: boolean) => {
    setHints((prevHints) => ({...prevHints, [label]: value}));

    // If the user selects any other hint, the "none" option should be
    // deselected.
    if (value === true) {
      setHashOnly(false);
    }
  };

  const hintsProcessed = {
    ...hints,
    txHash: hashOnly,
  };

  const onSetNoHints = (val: boolean) => {
    setHashOnly(val);
    if (val === true) {
      // We have to also clear all of the other hints if someone selects no
      // hints.
      setHints(Object.fromEntries(hintLabels.map((label) => [label, false])));
    }
  };

  // If the user selects any other hint, the "none" option should be deselected.

  const setBuilder = (name: string) => {
    setBuildersSelection((prevBuilders) => ({
      ...prevBuilders,
      [name]: !prevBuilders[name],
    }));
  };

  return (
    <div className="bg-gray-50 text-gray-950 p-2 max-w-md mx-auto border border-solid border-slate-200 rounded-2xl">
      <SimpleDropdown
        header="Advanced options"
        onClickHeader={() => {
          setAdvancedOptionsShown(!advancedOptionsShown);
        }}
        isOpen={advancedOptionsShown}>

        <SimpleDropdown.Body>
          <div className="bg-white flex flex-col gap-2 p-4 mb-2 border-solid border-slate-200 rounded-xl">
            <p className='font-bold text-2xl mb-2'>Flashbots Protect RPC</p>
            <FastOptionCheckbox fastMode={fastMode} setFastMode={setFastMode} />
            <FlashbotsProtectButton
              hints={hintsProcessed}
              builders={selectedBuilders}
              fast={fastMode}>
              Connect Wallet to Protect
            </FlashbotsProtectButton>
          </div>
        </SimpleDropdown.Body>

        <SimpleDropdown.HiddenBody>
          <MevShareHints
            hintLabels={hintLabels}
            hints={hints}
            hashOnly={hashOnly}
            setHint={setHint}
            onSetNoHints={onSetNoHints}
          />
          <BuilderOptions
            supportedBuilders={supportedBuilders}
            buildersSelection={buildersSelection}
            fastMode={fastMode}
            setBuilder={setBuilder}
          />
        </SimpleDropdown.HiddenBody>
      </SimpleDropdown>
    </div>
  );
}
