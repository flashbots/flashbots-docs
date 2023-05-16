import { useMemo } from "react"
import axios from "axios"

export type Builder = {
    name: string,
    rpc: string,
    "supported-apis": Array<string>, // TODO: can we please change this to camelCase
}

const fetchSupportedBuilders = async (): Promise<Array<Builder>> => {
    const res = await axios.get("https://raw.githubusercontent.com/flashbots/dowg/main/builder-registrations.json")
    return res.data
}

export const useSupportedBuilders = async (): Promise<Array<Builder>> => {
    return useMemo(() => fetchSupportedBuilders(), [])
}
