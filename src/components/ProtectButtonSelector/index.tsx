import React, { useEffect, useState } from "react"
import SimpleDropdown from '../SimpleDropdown'
import FlashbotsProtectButton from 'protect-button'
import Checkbox from '../Checkbox'
import AlignItems from '../AlignItems/AlignItems'
import GridBlock from '../GridBlock/GridBlock'

type Builder = {
    name: string,
    rpc: string,
}

const ProtectButtonSelector = () => {
    const [selectedBuilders, setSelectedBuilders] = useState<string[]>(["flashbots"])
    const [mevShareDisabled, setMevShareDisabled] = useState(false)
    const [calldata, setCalldata] = useState(false)
    const [logs, setLogs] = useState(false)
    const [contractAddress, setContractAddress] = useState(false)
    const [functionSelector, setFunctionSelector] = useState(false)
    const [curatedBuilders, setCuratedBuilders] = useState<Builder[]>()

    const allHintsFalse = (hints: any) => {
        return Object.values(hints).reduce((acc, curr) => acc && !curr, true)
    }

    const hintState = {
        calldata,
        contractAddress,
        functionSelector,
        logs,
    }

    const hints = mevShareDisabled ? {
        calldata: false,
        contractAddress: false,
        functionSelector: false,
        logs: false,
    } : allHintsFalse(hintState) ? undefined : hintState

    const toggleBuilder = (name: string) => {
        if (selectedBuilders.includes(name)) {
            setSelectedBuilders([...selectedBuilders].filter(b => b !== name))
        } else {
            setSelectedBuilders(selectedBuilders.concat(name))
        }
    }

    const BuilderCheckbox = ({ name }: { name: string }) => <Checkbox label={name} id={`builder_${name}`} checked={selectedBuilders.includes(name.toLowerCase())} onChange={(_) => toggleBuilder(name.toLowerCase())} />

    const getSupportedBuilders = async () => {
        // pending spec release
        // await get(https://raw.github)
        return [
            { name: "flashbots", rpc: "rpc.flashbots.net" }
        ]
    }

    useEffect(() => {
        async function init() {
            if (!curatedBuilders) {
                setCuratedBuilders(await getSupportedBuilders())
            }
        }
        init()
    }, [curatedBuilders])

    return (<GridBlock>
        <SimpleDropdown header={"Advanced options"}>
            <SimpleDropdown.Body>
                <AlignItems horizontal='center'>
                    <><FlashbotsProtectButton auctionHints={hints} targetBuilders={selectedBuilders.length === 1 && selectedBuilders[0] === "flashbots" ? undefined : selectedBuilders}>Connect Wallet to Protect</FlashbotsProtectButton></>
                </AlignItems>
            </SimpleDropdown.Body>
            <SimpleDropdown.HiddenBody>
                <div>
                    <em>MEV-Share Hints</em>
                    <hr style={{ padding: 0, margin: 0 }} />
                    <AlignItems horizontal='left'>
                        <Checkbox label='Calldata' id='calldata' checked={calldata} onChange={setCalldata} disabled={mevShareDisabled} />
                        <Checkbox label='Contract Address' id='contractAddress' checked={contractAddress} onChange={setContractAddress} disabled={mevShareDisabled} />
                        <Checkbox label='Function Selector' id='functionSelector' checked={functionSelector} onChange={setFunctionSelector} disabled={mevShareDisabled} />
                        <Checkbox label='Logs' id='logs' checked={logs} onChange={setLogs} disabled={mevShareDisabled} />
                        <div style={{ width: 64 }} /> {/* spacer */}
                        <Checkbox label='MEV-Share Disabled' id='mevshare_disabled' orientation='last' checked={mevShareDisabled} onChange={setMevShareDisabled} />
                    </AlignItems>
                </div>

                <div>
                    <em>Target Builders</em>
                    <hr style={{ padding: 0, margin: 0 }} />
                    {/* <AlignItems horizontal='left'> */}
                    {curatedBuilders && curatedBuilders.map(builder => <BuilderCheckbox name={builder.name} />)}
                    {/* </AlignItems> */}
                </div>

            </SimpleDropdown.HiddenBody>
        </SimpleDropdown></GridBlock>)
}

export default ProtectButtonSelector
