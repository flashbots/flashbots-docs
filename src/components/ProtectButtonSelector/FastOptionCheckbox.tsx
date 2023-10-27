/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as Switch from '@radix-ui/react-switch';
import styles from './styles.module.css';

interface FastOptionCheckboxProps {
  fastMode: boolean;
  setFastMode: (value: boolean) => void;
}

function FastOptionCheckbox({ fastMode, setFastMode }: FastOptionCheckboxProps) {
  return (
    <div className="p-3 flex items-start gap-2 border-solid rounded-md border-slate-200">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 mt-0.5 min-w-[16px]">
        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
      </svg>
      <div>
        <p className='m-0 text-sm font-bold grow'>Fast mode</p>
        <p className='m-0 text-sm text-gray-700'>Send to [more builders](/flashbots-protect/mev-share#builders) and give validators a larger tip.</p>
      </div>
      <Switch.Root 
        id="fast" 
        checked={fastMode}
        onCheckedChange={setFastMode}
        className="peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-gray-950 data-[state=unchecked]:bg-gray-300">
        <Switch.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-3.5 data-[state=unchecked]:translate-x-[-5.5px]" />
      </Switch.Root>
    </div>
  );
}

export default FastOptionCheckbox;
