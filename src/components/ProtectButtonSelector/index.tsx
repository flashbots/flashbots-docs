import React, { useState } from "react"
import SimpleDropdown from '../SimpleDropdown'
import FlashbotsProtectButton from 'protect-button'
import Checkbox from '../Checkbox'
import AlignItems from '../AlignItems/AlignItems'
import GridBlock from '../GridBlock/GridBlock'

const ProtectButtonSelector = () => {
    const [selectedBuilders, setSelectedBuilders] = useState<string[]>()
    const [privateMode, setPrivateMode] = useState(false)
    const [calldata, setCalldata] = useState(false)
    const [logs, setLogs] = useState(false)
    const [contractAddress, setContractAddress] = useState(false)
    const [functionSelector, setFunctionSelector] = useState(false)

    const allHintsFalse = (hints: any) => {
        return Object.values(hints).reduce((acc, curr) => acc && !curr, true)
    }

    const hintState = {
        calldata,
        contractAddress,
        functionSelector,
        logs,
    }

    const hints = privateMode ? {
        calldata: false,
        contractAddress: false,
        functionSelector: false,
        logs: false,
    } : allHintsFalse(hintState) ? undefined : hintState

    return (<GridBlock>
        <SimpleDropdown header={"Advanced options"}>
            <SimpleDropdown.Body>
                <AlignItems horizontal='center'>
                    <><FlashbotsProtectButton auctionHints={hints}>Connect Wallet to Protect</FlashbotsProtectButton></>
                </AlignItems>
            </SimpleDropdown.Body>
            <SimpleDropdown.HiddenBody>
                <em>MEV-Share Hints</em>
                <AlignItems horizontal='left'>
                    <Checkbox label='Calldata' id='calldata' checked={calldata} onChange={setCalldata} disabled={privateMode} />
                    <Checkbox label='Contract Address' id='contractAddress' checked={contractAddress} onChange={setContractAddress} disabled={privateMode} />
                    <Checkbox label='Function Selector' id='functionSelector' checked={functionSelector} onChange={setFunctionSelector} disabled={privateMode} />
                    <Checkbox label='Logs' id='logs' checked={logs} onChange={setLogs} disabled={privateMode} />
                    <div style={{ width: 64 }} /> {/* spacer */}
                    <Checkbox label='All Disabled' id='private_mode' orientation='last' checked={privateMode} onChange={setPrivateMode} />
                </AlignItems>
            </SimpleDropdown.HiddenBody>
        </SimpleDropdown></GridBlock>)
}

export default ProtectButtonSelector
