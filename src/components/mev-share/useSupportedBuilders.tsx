import { useEffect, useMemo, useState } from "react"
import axios from "axios"

export type Builder = {
    name: string,
    rpc: string,
    "supported-apis": Array<string>, // TODO: can we please change this to camelCase
}


export const useSupportedBuilders = () => {
    const [builders, setBuilders] = useState<Builder[]>([]);
    const source = axios.CancelToken.source();

    useEffect(() => {
        const fetchSupportedBuilders = async () => {
            try {
                const res = await axios.get(
                    "https://raw.githubusercontent.com/flashbots/dowg/main/builder-registrations.json",
                    { cancelToken: source.token }
                )
                setBuilders(res.data);
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    throw error;
                }
            }
        };

        fetchSupportedBuilders();
        return () => {
            source.cancel('Component unmounted');
        };
    }, []);

    return builders;
}