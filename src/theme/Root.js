import { MetaMaskProvider } from '@metamask/sdk-react';

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <MetaMaskProvider debug={false} sdkOptions={{
      checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
      dappMetadata: {
        name: "Flashbots Protect",
      }
    }}>
      <>{children}</>
    </MetaMaskProvider>
  );
}
