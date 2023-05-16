import React, { useEffect, useState } from "react"
import SimpleDropdown from '../SimpleDropdown'
import FlashbotsProtectButton from 'protect-button'
import Checkbox from '../Checkbox'
import AlignItems from '../AlignItems/AlignItems'
import GridBlock from '../GridBlock/GridBlock'
import { Builder, useSupportedBuilders } from '../mev-share/useSupportedBuilders'

const ProtectButtonSelector = () => {
    const supportedBuilders = useSupportedBuilders()
    const [selectedBuilders, setSelectedBuilders] = useState<string[]>([])
    const [calldata, setCalldata] = useState(false)
    const [logs, setLogs] = useState(false)
    const [contractAddress, setContractAddress] = useState(false)
    const [functionSelector, setFunctionSelector] = useState(false)
    const [noHints, setNoHints] = useState(false)
    const [curatedBuilders, setCuratedBuilders] = useState<Builder[]>()
    const [advancedOptionsShown, setAdvancedOptionsShown] = useState(false)

    const hints = advancedOptionsShown ? {
        calldata,
        logs,
        contractAddress,
        functionSelector,
        hash: true,
    } : undefined

    const onSetNoHints = (val: boolean) => {
        setNoHints(val);
        if (val === true) {
            // We have to also clear all of the other hints if someone selects no hints.
            setCalldata(false);
            setLogs(false);
            setContractAddress(false);
            setFunctionSelector(false);
        }
    }

    // If the user selects any other hint, the "none" option should be deselected. TODO Is there
    // a more elegant way to handle this than wrapping each hint update in a callback.

    const onSetCalldata = (val: boolean) => {
        setNoHints(false);
        setCalldata(val);
    }

    const onSetLogs = (val: boolean) => {
        setNoHints(false);
        setLogs(val);
    }

    const onSetFunctionSelector = (val: boolean) => {
        setNoHints(false);
        setFunctionSelector(val);
    }

    const onSetContractAddress = (val: boolean) => {
        setNoHints(false);
        setContractAddress(val);
    }

    const toggleBuilder = (name: string) => {
        if (selectedBuilders.includes(name)) {
            setSelectedBuilders([...selectedBuilders].filter(b => b !== name))
        } else {
            setSelectedBuilders(selectedBuilders.concat(name))
        }
    }

    const BuilderCheckbox = ({ name }: { name: string }) => <Checkbox label={name} id={`builder_${name}`} checked={selectedBuilders.includes(name.toLowerCase())} onChange={(_) => toggleBuilder(name.toLowerCase())} />

    useEffect(() => {
        async function init() {
            if (!curatedBuilders) {
                setCuratedBuilders(await supportedBuilders)
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
                        <Checkbox label='Calldata' id='calldata' checked={calldata} onChange={onSetCalldata} />
                        <Checkbox label='Contract Address' id='contractAddress' checked={contractAddress} onChange={onSetContractAddress} />
                        <Checkbox label='Function Selector' id='functionSelector' checked={functionSelector} onChange={onSetFunctionSelector} />
                        <Checkbox label='Logs' id='logs' checked={logs} onChange={onSetLogs} />
                        <Checkbox label='None' id='none' checked={noHints} onChange={onSetNoHints} />
                        <div style={{ width: 64 }} /> {/* spacer */}
                    </AlignItems>
                </div>

                <div>
                    <em>Builders</em>
                    <hr style={{ padding: 0, margin: 0 }} />
                    {/* <AlignItems horizontal='left'> */}
                    {curatedBuilders && curatedBuilders.map((builder, idx) => <BuilderCheckbox name={builder.name} key={idx} />)}
                    {/* </AlignItems> */}
                </div>

            </SimpleDropdown.HiddenBody>
        </SimpleDropdown></GridBlock>)
}

export default ProtectButtonSelector
