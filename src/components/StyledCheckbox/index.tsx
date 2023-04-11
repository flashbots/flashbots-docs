import React, { ReactNode, useState } from "react";

interface IStyledCheckbox {
  children: ReactNode | ReactNode[]
  active: boolean
  setActive: (activeState: boolean) => void
}

export const StyledCheckbox = ({ children, active, setActive }: IStyledCheckbox) =>  {
  return (
    <label>
      <input
        type="checkbox"
        onChange={() => {
          setActive(!active);
        }}
      />
      <span
        className={`checkbox ${active ? "checkbox--active" : ""}`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
      />
      <svg
        className={`checkbox ${active ? "checkbox--active" : ""}`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke={active ? "#fff" : "none"} // only show the checkmark when `isCheck` is `true`
        />
      </svg>
      { children }
    </label>
  );
}
