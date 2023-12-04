/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useState} from 'react';
import FlashbotsLogo from '@site/static/img/flashbots-logo.svg';
import BrowserOnly from '@docusaurus/BrowserOnly';
import FlashbotsProtectButton, {HintPreferences} from '../ProtectButton';
import SimpleDropdown from '../SimpleDropdown';
import BuilderOptions from './BuilderOptions';
import {useSupportedBuilders} from '../mev-share/useSupportedBuilders';
import FastOptionCheckbox from './FastOptionCheckbox';
import MevShareHints from './MevShareHints';

const defaultHintSelectors = {
  calldata: false,
  logs: false,
  defaultLogs: false,
  contractAddress: false,
  functionSelector: false,
};

export default function ProtectButtonSelector() {
  const [hashOnly, setHashOnly] = useState(false);
  const [advancedOptionsShown, setAdvancedOptionsShown] = useState(false);
  const [fastMode, setFastMode] = useState(false);
  // Initialize the state object with all hints set to false
  const [hints, setHints] = useState(defaultHintSelectors);
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

  const hintsProcessed: HintPreferences = {
    ...hints,
    hash: hashOnly,
  };

  const onSetHashOnly = (val: boolean) => {
    setHashOnly(val);
    if (val === true) {
      // We have to also clear all of the other hints if someone selects  hash
      // only
      setHints(defaultHintSelectors);
    }
  };

  const setBuilder = (name: string) => {
    setBuildersSelection((prevBuilders) => ({
      ...prevBuilders,
      [name]: !prevBuilders[name],
    }));
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-solid border-slate-200 bg-gray-50 p-2 text-gray-950">
      <SimpleDropdown
        header="Advanced options"
        onClickHeader={() => {
          setAdvancedOptionsShown(!advancedOptionsShown);
        }}
        isOpen={advancedOptionsShown}>
        <SimpleDropdown.Body>
          <div className="mb-2 flex flex-col gap-2 rounded-xl border-solid border-slate-200 bg-white p-4">
            <div className="mb-3 flex">
              <p className="m-0 grow text-2xl font-bold">
                Flashbots Protect RPC
              </p>
              <FlashbotsLogo className="mx-1" />
            </div>
            <FastOptionCheckbox fastMode={fastMode} setFastMode={setFastMode} />
            <BrowserOnly>
              {() => (
                <FlashbotsProtectButton
                  hints={hintsProcessed}
                  builders={selectedBuilders}
                  fast={fastMode}>
                  Connect Wallet to Protect
                </FlashbotsProtectButton>
              )}
            </BrowserOnly>
          </div>
        </SimpleDropdown.Body>

        <SimpleDropdown.HiddenBody>
          <MevShareHints
            hintLabels={Object.keys(defaultHintSelectors)}
            hints={hints}
            hashOnly={hashOnly}
            setHint={setHint}
            onSetHashOnly={onSetHashOnly}
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
