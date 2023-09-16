import React, {useState, useEffect} from "react"
import CodeBlock, {Props as CodeProps} from "@theme/CodeBlock"

/** Code block that fetches its code from a URL. */
interface IRemoteCodeBlock extends CodeProps {
    /** URL of code to be fetched. Must be a raw file. 
     * [Example](https://raw.githubusercontent.com/flashbots/pm/main/README.md) */
    url?: string
}

const RemoteCodeBlock = (props: IRemoteCodeBlock) => {
    const [content, setContent] = useState<string>()
    useEffect(() => {
        fetch(props.url)
            .then((response) => response.text())
            .then((text) => setContent(text))
    }, [props.url])
    return (<>
        <CodeBlock {...props}>
            {content || `// Loading ${props.url} ...`}
        </CodeBlock>
    </>)
}

export default RemoteCodeBlock
