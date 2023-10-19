/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {useState} from 'react';
import FlashbotsProtectButton from '../ProtectButton';
import SimpleDropdown from '../SimpleDropdown';
import Checkbox from '../Checkbox';
import AlignItems from '../AlignItems/AlignItems';
import GridBlock from '../GridBlock/GridBlock';
import {useSupportedBuilders} from '../mev-share/useSupportedBuilders';
import styles from './styles.module.scss';

const hintLabels = [
  'calldata',
  'logs',
  'defaultLogs',
  'contractAddress',
  'functionSelector',
];

function BuilderCheckbox({
  name,
  builders,
  fastMode,
  toggleBuilder,
}: {
  name: string;
  builders: Record<string, boolean>;
  fastMode: boolean;
  toggleBuilder: (name: string) => any;
}) {
  return (
    <Checkbox
      label={name}
      id={`builder_${name}`}
      checked={builders[name] || fastMode}
      disabled={fastMode === true}
      onChange={() => toggleBuilder(name)}
    />
  );
}

export default function ProtectButtonSelector() {
  const [hashOnly, setHashOnly] = useState(false);
  const [advancedOptionsShown, setAdvancedOptionsShown] = useState(false);
  const [fastMode, setFastMode] = useState(true);
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

  const toggleBuilder = (name: string) => {
    setBuildersSelection((prevBuilders) => ({
      ...prevBuilders,
      [name]: !prevBuilders[name],
    }));
  };

  const renderFlashbotsProtectButton = () => (
    <FlashbotsProtectButton
      hints={hintsProcessed}
      builders={selectedBuilders}
      fast={fastMode}>
      Connect Wallet to Protect
    </FlashbotsProtectButton>
  );

  const renderFastOption = () => (
    <div className={styles.fastContainer}>
      <Checkbox
        label="Fast"
        id="fast"
        checked={fastMode === true}
        onChange={setFastMode}
      />
    </div>
  );

  const renderHintCheckbox = (
    label: string,
    checked: boolean,
    onChange: (val: boolean) => void,
  ) => (
    <Checkbox
      label={label}
      id={label.toLowerCase()}
      key={label}
      checked={checked}
      onChange={onChange}
    />
  );

  const renderMevShareHints = () => (
    <div>
      <em>MEV-Share Hints</em>
      <hr style={{padding: 0, margin: 0}} />
      <AlignItems horizontal="left">
        {hintLabels.map((label) =>
          renderHintCheckbox(label, hints[label] || false, (value) =>
            setHint(label, value),
          ),
        )}
        {renderHintCheckbox('Hash Only', hashOnly, onSetNoHints)}
        <div style={{width: 64}} /> {/* spacer */}
      </AlignItems>
    </div>
  );

  const renderBuilders = () => (
    <div>
      <em>Builders</em>
      <hr style={{padding: 0, margin: 0}} />
      {supportedBuilders.map((builder: string) => (
        <BuilderCheckbox
          fastMode={fastMode}
          name={builder}
          key={builder}
          builders={buildersSelection}
          toggleBuilder={toggleBuilder}
        />
      ))}
    </div>
  );

  return (
    <GridBlock>
      <SimpleDropdown
        header="Advanced options"
        onClickHeader={() => {
          setAdvancedOptionsShown(!advancedOptionsShown);
        }}
        isOpen={advancedOptionsShown}>
        <SimpleDropdown.Body>
          {renderFlashbotsProtectButton()}
          {renderFastOption()}
        </SimpleDropdown.Body>
        <SimpleDropdown.HiddenBody>
          {renderMevShareHints()}
          {renderBuilders()}
        </SimpleDropdown.HiddenBody>
      </SimpleDropdown>
    </GridBlock>
  );
}
