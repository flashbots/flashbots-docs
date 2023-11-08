/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {Children, PropsWithChildren} from 'react';
import styles from './styles.module.css';

type SimpleDropdownParams = {
  header: string;
  italicHeader?: boolean;
  onClickHeader?: () => void;
  isOpen: boolean;
};

function SimpleDropdown({
  children,
  header,
  italicHeader,
  onClickHeader,
  isOpen,
}: PropsWithChildren<SimpleDropdownParams>) {
  const useItalic = italicHeader !== false; // default to true
  const subComponentList = Object.keys(SimpleDropdown);

  const subComponents = subComponentList.map((key) =>
    Children.map(children, (child: any) =>
      child.type({}).key === key ? child : null,
    ),
  );

  return (
    <div className="dropdown-container">
      {subComponents[0]}
      <details open={isOpen}>
        <summary
          role="button"
          tabIndex={0}
          className="cursor-pointer pl-1 text-gray-600"
          onClick={(event) => {
            event.preventDefault();
            onClickHeader();
          }}
          onKeyDown={(event) => {
            // Enter or Space key
            if (event.keyCode === 13 || event.keyCode === 32) {
              event.preventDefault();
              onClickHeader();
            }
          }}>
          {useItalic ? <em>{header}</em> : header}
        </summary>
        {subComponents[1]}
      </details>
    </div>
  );
}

function Body(props) {
  return (
    <div key="Body" className={styles.dropdownBody}>
      <div>{props.children}</div>
    </div>
  );
}
SimpleDropdown.Body = Body;

function HiddenBody({children}) {
  return (
    <div
      key="HiddenBody"
      className="rounded-xl border-solid border-slate-200/75 p-2">
      {children}
    </div>
  );
}
SimpleDropdown.HiddenBody = HiddenBody;

export default SimpleDropdown;
