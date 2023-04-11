import React, { ReactNode, useCallback, useState } from "react"
import { useHistory } from "@docusaurus/router";
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

const AddRpcConfigurator = ({  }: IAddRpcConfigurator) => {
  const { status, connect, addChain } = useMetaMask()

  const [targetChain, setTargetChain] = useState<1 | 5 | 11155111>(1)

  const [calldata, setCalldata] = useState(false)
  const [contractAddress, setContractAddress] = useState(true)
  const [functionSelector, setFunctionSelector] = useState(true)
  const [logs, setLogs] = useState(true)

  const [advancedVisible, setAdvancedVisible] = useState(false)

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
      <button onClick={connect}>Connect to MetaMask</button>
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
            <StyledCheckbox active={!advanced} setActive={() => setAdvanced(false)}>
              Stable
            </StyledCheckbox>
            <StyledCheckbox active={advanced} setActive={() => setAdvanced(true)}>
              Experimental
            </StyledCheckbox>
          </div>
          <div className={clsx(styles.settings)}>
            <StyledCheckbox active={calldata} setActive={setCalldata}>
              calldata
            </StyledCheckbox>
            <StyledCheckbox active={contractAddress} setActive={setContractAddress}>
              contractAddress
            </StyledCheckbox>
            <StyledCheckbox active={functionSelector} setActive={setFunctionSelector}>
              functionSelector
            </StyledCheckbox>
            <StyledCheckbox active={logs} setActive={setLogs}>
              logs
            </StyledCheckbox>
          </div>
        </section>
      </section>
    )}
  </>
}

export default AddRpcConfigurator