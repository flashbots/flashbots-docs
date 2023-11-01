/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled: boolean;
}) {
  const elements = [
    <input
      id={label}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      key={label}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    />,
    <label
      htmlFor={label}
      key={label}
      className="px-1 enabled:cursor-pointer enabled:hover:text-blue-600 ">
      {label}
    </label>,
  ];
  return (
    <div className="m-1 flex cursor-pointer items-center disabled:pointer-events-none disabled:opacity-50">
      {elements}
    </div>
  );
}

export default Checkbox;
