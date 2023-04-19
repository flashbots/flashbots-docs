import React, { ReactNode, useCallback, useEffect, useState } from "react"
import styles from  './styles.module.scss';
import Button from "../Button/Button";
import { useMetaMask } from 'metamask-react'
import { StyledCheckbox } from "../StyledCheckbox";
import clsx from "clsx";

interface IAddRpcConfigurator {
}

const RPCS = {
  1: "https://rpc.flashbots.net",
  5: "https://rpc-goerli.flashbots.net",
  11155111: "https://rpc-sepolia.flashbots.net"
}

interface IHintSettings {
  calldata: boolean
  contractAddress: boolean
  functionSelector: boolean
  logs: boolean
}

const defaults = {
  experimental: {
    calldata: true,
    contractAddress: true,
    functionSelector: true,
    logs: true,
  },
  stable: {
    calldata: false,
    contractAddress: true,
    functionSelector: true,
    logs: true,
  },
  private: {
    calldata: false,
    contractAddress: false,
    functionSelector: false,
    logs: false,
  }
}

const AddRpcConfigurator = ({  }: IAddRpcConfigurator) => {
  const { status, connect, addChain } = useMetaMask()

  const [targetChain, setTargetChain] = useState<1 | 5 | 11155111>(1)

  const [hintSettings, setHints] = useState<IHintSettings>({
    calldata: false,
    contractAddress: true,
    functionSelector: true,
    logs: true,
  })

  const [advanced, setAdvanced] = useState(false)

  const addProtectRpc = useCallback(async () => {
    if (!RPCS[targetChain]) return

    const addChainParams = {
      chainId: `0x${targetChain.toString(16)}`,
      chainName: `Flashbots Protect ${
        targetChain === 1 ? "(Mainnet)" :
        targetChain === 5 ? "(Goerli)" :
        targetChain === 11155111 ? "(Sepolia)" :
        ` on chain ${targetChain}`}`,
      iconUrls: ["https://docs.flashbots.net/img/logo.png"],
      nativeCurrency: {
          name: "Ethereum",
          symbol: "ETH",
          decimals: 18,
      },
      rpcUrls: [RPCS[targetChain]],
    }
    if (addChain) {
      try {
        addChain(addChainParams)
      } catch (err) {
        // handle "add" error
        console.error("addChain failed")
        throw err
      }
    } else if ("ethereum" in window) {
      // do it manually with window.ethereum
      try {
        const ethereum: any = window.ethereum
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [addChainParams],
        })
      } catch (err) {
        // handle "add" error
        console.error("addChain failed")
        throw err
      }
    } else {
      throw new Error("ethereum provider not found")
    }
  }, [])

  return <>
    { status === 'notConnected' && (
      <Button action={connect}>Connect to MetaMask</Button>
    )}
    { status !== 'connected' && status !== "notConnected" && (
        <span>Connecting to MetaMask...</span>
    )}
    { status === 'connected' && (
      <section className={styles.root}>
        <Button action={addProtectRpc}>
          Add RPC
        </Button>
        <section>
          <div>
            <StyledCheckbox active={advanced} setActive={setAdvanced}>
              Open settings
            </StyledCheckbox>
          </div>
          <div className={clsx(
            styles.settings,
            {
              [styles.active]: advanced
            }
          )}>
            <StyledCheckbox active={hintSettings.calldata} setActive={(newHint: boolean) => setHints({
              ...hintSettings,
              calldata: newHint
            })}>
              calldata
            </StyledCheckbox>
            <StyledCheckbox active={hintSettings.contractAddress} setActive={(newHint: boolean) => setHints({
              ...hintSettings,
              contractAddress: newHint
            })}>
              contractAddress
            </StyledCheckbox>
            <StyledCheckbox active={hintSettings.functionSelector} setActive={(newHint: boolean) => setHints({
              ...hintSettings,
              functionSelector: newHint
            })}>
              functionSelector
            </StyledCheckbox>
            <StyledCheckbox active={hintSettings.logs} setActive={(newHint: boolean) => setHints({
              ...hintSettings,
              logs: newHint
            })}>
              logs
            </StyledCheckbox>
          </div>
        </section>
      </section>
    )}
  </>
}

export default AddRpcConfigurator