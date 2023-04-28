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
    const [calldata, setCalldata] = useState(false)
    const [logs, setLogs] = useState(false)
    const [contractAddress, setContractAddress] = useState(false)
    const [functionSelector, setFunctionSelector] = useState(false)
    const [curatedBuilders, setCuratedBuilders] = useState<Builder[]>()
    const [advancedOptionsShown, setAdvancedOptionsShown] = useState(false)

    const hints = advancedOptionsShown ? {
        calldata,
        logs,
        contractAddress,
        functionSelector,
    } : undefined

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
        <SimpleDropdown header={"Advanced options"} onClickHeader={() => {
            setAdvancedOptionsShown(!advancedOptionsShown)
        }}>
            <SimpleDropdown.Body>
                <AlignItems horizontal='center'>
                    <><FlashbotsProtectButton hints={advancedOptionsShown ? hints : undefined} builders={advancedOptionsShown ? selectedBuilders : undefined}>Connect Wallet to Protect</FlashbotsProtectButton></>
                </AlignItems>
            </SimpleDropdown.Body>
            <SimpleDropdown.HiddenBody>
                <div>
                    <em>MEV-Share Hints</em>
                    <hr style={{ padding: 0, margin: 0 }} />
                    <AlignItems horizontal='left'>
                        <Checkbox label='Calldata' id='calldata' checked={calldata} onChange={setCalldata} />
                        <Checkbox label='Contract Address' id='contractAddress' checked={contractAddress} onChange={setContractAddress} />
                        <Checkbox label='Function Selector' id='functionSelector' checked={functionSelector} onChange={setFunctionSelector} />
                        <Checkbox label='Logs' id='logs' checked={logs} onChange={setLogs} />
                        <div style={{ width: 64 }} /> {/* spacer */}
                    </AlignItems>
                </div>

                <div>
                    <em>Target Builders</em>
                    <hr style={{ padding: 0, margin: 0 }} />
                    {/* <AlignItems horizontal='left'> */}
                    {curatedBuilders && curatedBuilders.map((builder, idx) => <BuilderCheckbox name={builder.name} key={idx} />)}
                    {/* </AlignItems> */}
                </div>

            </SimpleDropdown.HiddenBody>
        </SimpleDropdown></GridBlock>)
}

export default ProtectButtonSelector
