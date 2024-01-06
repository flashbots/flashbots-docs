/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from 'react';

export default function ProtectButton() {

  // listen for light/dark theme changes
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    const htmlElement = document.documentElement;
    const handleThemeChange = () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      setTheme(currentTheme || 'light');
    };
    handleThemeChange();
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(htmlElement, { attributes: true, attributeFilter: ['data-theme'] });
  }, [])

  return (
    <div className='w-full flex flex-row justify-center'>
      <iframe
        title='Protect Button'
        id="protect-button"
        // TODO: replace Vercel preview link with correct URL after deployment
        src={`https://flashbots-protect-72l.vercel.app/button?theme=${theme}`}
        height="88" width="348"
        className="flex dark:dark border-none rounded-lg hover:outline"
      />
    </div>
  )
}
