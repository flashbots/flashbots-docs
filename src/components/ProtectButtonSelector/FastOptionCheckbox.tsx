/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Checkbox from '../Checkbox';
import styles from './styles.module.css';

interface FastOptionCheckboxProps {
  fastMode: boolean;
  setFastMode: (value: boolean) => void;
}

function FastOptionCheckbox({ fastMode, setFastMode }: FastOptionCheckboxProps) {
  return (
    <div className="p-3 flex items-start gap-2 border-solid rounded-md border-slate-200">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 mt-0.5">
        <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" />
      </svg>
      <div className='max-w-[80%]'>
        <p className='m-0 text-sm font-bold'>Fast mode</p>
        <p className='m-0 text-sm'>Transactions are shared with all registered builders. A larger portion of the bundle value is sent to the validators</p>
      </div>
      <Checkbox
        id="fast"
        checked={fastMode}
        onChange={setFastMode}
      />
    </div>
  );
}

export default FastOptionCheckbox;
