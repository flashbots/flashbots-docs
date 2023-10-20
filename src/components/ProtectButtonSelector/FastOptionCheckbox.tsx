/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Checkbox from '../Checkbox';
import styles from './styles.module.scss';

interface FastOptionCheckboxProps {
  fastMode: boolean;
  setFastMode: (value: boolean) => void;
}

function FastOptionCheckbox({ fastMode, setFastMode }: FastOptionCheckboxProps) {
  return (
    <div className={styles.fastContainer}>
      <Checkbox
        label="Fast"
        id="fast"
        checked={fastMode}
        onChange={setFastMode}
      />
    </div>
  );
}

export default FastOptionCheckbox;
