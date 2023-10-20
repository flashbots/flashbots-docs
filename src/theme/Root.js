/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import PropTypes from 'prop-types';
import { MetaMaskProvider } from '@metamask/sdk-react';

export default function Root({ children }) {
  return (
    <MetaMaskProvider debug={false} sdkOptions={{
      checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
      dappMetadata: {
        name: "Flashbots Protect",
      }
    }}>
      {children}
    </MetaMaskProvider>
  );
}

Root.propTypes = {
  children: PropTypes.node.isRequired,
};
