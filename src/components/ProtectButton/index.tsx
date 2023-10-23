/**
 * Copyright (c) Flashbots Ltd. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {PropsWithChildren} from 'react';
import type {HintPreferences} from '@flashbots/mev-share-client';
import {useSDK} from '@metamask/sdk-react';
import styles from './styles.module.css';

const RPC_GOERLI_FLASHBOTS_NET = 'https://rpc-goerli.flashbots.net';
const RPC_SEPOLIA_FLASHBOTS_NET = 'https://rpc-sepolia.flashbots.net';
const RPC_FLASHBOTS_NET = 'https://rpc.flashbots.net';

export const mungeHintsForRpcUrl = (hints: HintPreferences) => {
  /*
    `hash` is always shared on the backend.
    We only need to specify it if we don't want default hints shared.

    If other hints are specified, `hash` is implied. In that case we
    set hash to undefined so it's removed from the URL.
 */
  const hashImplied = Object.values(hints).some((v) => v);
  return {
    calldata: hints.calldata,
    contract_address: hints.contractAddress,
    function_selector: hints.functionSelector,
    logs: hints.logs,
    default_logs: hints.defaultLogs,
    hash: hashImplied ? false : hints.txHash,
  };
};

export interface ProtectButtonOptions extends PropsWithChildren {
  /** Specify data to share; if undefined, uses default
   * [Stable config](https://docs.flashbots.net/flashbots-protect/rpc/mev-share#stable-configuration) */
  hints: HintPreferences;
  /** Selected builders that are permitted to build blocks using the client's
   *  transactions. */
  builders: Array<string>;
  /** `fast` mode enables all supported builders implicitly. Setting `fast`
   * will override `builders`. */
  fast: boolean;
}

export const generateRpcUrl = ({
  chainId,
  options: {hints, builders, fast},
}: {
  chainId: string;
  options: ProtectButtonOptions;
}) => {
  const protectUrl = (() => {
    switch (chainId) {
      case '0x5':
        return RPC_GOERLI_FLASHBOTS_NET;
      case '0xaa36a7':
        return RPC_SEPOLIA_FLASHBOTS_NET;
      default:
        return RPC_FLASHBOTS_NET;
    }
  })();
  const rpcUrl = new URL(protectUrl);

  if (hints) {
    Object.entries(mungeHintsForRpcUrl(hints)).forEach(
      ([hintName, hintEnabled]) => {
        if (hintEnabled) {
          rpcUrl.searchParams.append('hint', hintName.toLowerCase());
        }
      },
    );
  }

  if (fast) {
    rpcUrl.pathname += 'fast';
  } else if (builders) {
    builders.forEach((builder) => {
      rpcUrl.searchParams.append('builder', builder.toLowerCase());
    });
  }
  return rpcUrl;
};

const chainName = (chainId: string) => {
  switch (chainId) {
    case '0x1':
      return 'Mainnet';
    case '0x5':
      return 'Goerli';
    case '0xaa36a7':
      return 'Sepolia';
    default:
      return `Chain ${chainId}`;
  }
};

/**
 * Button that connects Metamask to Flashbots Protect when it's clicked.
 */
function FlashbotsProtectButton(options: ProtectButtonOptions) {
  const {chainId = '0x1', sdk, provider} = useSDK();
  const {children} = options;
  const rpcUrl = generateRpcUrl({
    chainId,
    options,
  });

  const connectToProtect = async () => {
    if (provider && sdk) {
      const addChainParams = {
        chainId,
        chainName: `Flashbots Protect (${chainName(chainId)})`,
        iconUrls: ['https://docs.flashbots.net/img/logo.png'],
        nativeCurrency: {
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: [rpcUrl.toString()],
      };
      await sdk.connect();
      // delete local storage key "providerType" to allow users pick extension
      // or mobile when connecting
      localStorage.removeItem('providerType');
      // do it manually with window.ethereum
      try {
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [addChainParams],
        });
      } catch (err) {
        // handle "add" error
        console.error('addChain failed');
      }
    } else {
      console.error('ethereum provider not found');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center">
        <button
          type="button"
          className="flashButton"
          onClick={() => connectToProtect()}>
          {children}
        </button>
      </div>
      <div className={styles.rpcUrlContainer}>
        <div className={styles.rpcUrlLabel}>RPC URL:</div>
        <div className={styles.rpcUrl}>{rpcUrl.toString()}</div>
      </div>
    </div>
  );
}

export default FlashbotsProtectButton;
export type {HintPreferences} from '@flashbots/mev-share-client';
